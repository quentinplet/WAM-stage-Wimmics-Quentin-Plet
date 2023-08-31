// https://github.com/g200kg/webaudio-controls/blob/master/webaudio-controls.js
import '../utils/webaudio-controls.js';


let style = `
:host {
    background: linear-gradient(rgb(37,37,37), rgb(0,0,0));
    box-shadow: 4px 5px 6px rgba(0, 0, 0, 0.7), inset -2px -2px 5px 0px rgba(0, 0, 0, 0.2), inset 3px 1px 1px 4px rgba(255, 255, 255, 0.2), 1px 0px 1px 0px rgba(0, 0, 0, 0.9), 0 2px 1px 0 rgba(0, 0, 0, 0.9), 1px 1px 1px 0px rgba(0, 0, 0, 0.9);
    font: 'clock';

    width: 200px;
    height: 280px;
    display: block;
    user-select: none;
    cursor: move;
    z-index: 9;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.pedalLabel, .div_buttons {
    border-radius: 8px;
}

.div_menuPanel {
    /* border-top-left-radius: 8px;
border-top-right-radius: 8px; */
}

webaudio-switch {
    left: -6px;
}

.pedalLabel {
    /* background: rgba(0, 0, 0, 0.4); */
    box-shadow: inset 0px 1px 5px #111;
    border: 1px solid #ccc;
    color: rgb(204, 204, 204);
    padding: 4px 10px;

    font-size: 10px;
    text-align: center;
    user-select: none;
    font-family: helvetica;
    text-transform: uppercase;
    margin-top: 5px;
}

.knob-label {
    color: rgb(255, 255, 255);
    text-shadow: 0px 1px 1px #000;

    font-size: 9px;
    margin-top: -2px;

    text-align: center;
    text-transform: uppercase;
    overflow: hidden;
    user-select: none;
    font-family: helvetica;
    margin-top: 5px;

}

.elements {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 10px;

}

.column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    margin: 3px;
    border-radius: 5px;
}

.column2 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    margin: 3px;
    margin-top: 5px;
    border-radius: 5px;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;

}

#note {
    display: inline-block;
    height: 20px;
    text-align: left;
}

#detector {
    width: 180px;
    height: 210px;
    border: 1.5px solid rgb(35, 53, 49);
    border-radius: 10px;
    text-align: center;
    color: black;
    background-color: rgb(201, 201, 201);
    padding-top: 3.3px;
    margin: auto;
    font-family: 'clock';
    margin-top: 10px;
}

#flat {
    display: none;
}

#sharp {
    display: none;
}

.flat #flat {
    display: inline;
}

.sharp #sharp {
    display: inline;
}

#button {
    display: inline;
    font-size: 12px;
}

#toneMode {
    background-color: rgb(204, 204, 204);
    padding-left: 4px;
    padding-right: 4px;
}

#gain {
    background-color: red;
    height: 60px;
    width: 7px;
    margin: initial;
}

#detune{
    margin-bottom: 5px;
}`;

let template = `
<div id="wc-tuner" class="wrapper">
    <div class="column">
        <div id="detector" class="vague">
            <div class="diode">
                <canvas id="diode" width="300" height="30"></canvas>
            </div>
            <div class="pitch">
                <span id="pitch">--</span>Hz
            </div>
            <div class="note">
                <span id="note">--</span>
                <span id="lessArrow"></span>
                <span id="moreArrow"></span>
            </div>
            <div class="output">
                <canvas id="output" width=180 height=90></canvas>
            </div>
            <div id="detune">
                <span id="detune_amt">--</span>
                <span id="flat">CENTS &#9837;</span>
                <span id="sharp">CENTS &#9839;</span>
            </div>
        </div>
        <div class="column2">
            <webaudio-switch id="switch1" class="switch" midilearn="true"
                src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/img/switch_1.png" width="32" height="20">
            </webaudio-switch>

            
            <span class="pedalLabel">Tuner</span>
        </div>
    </div>
    <input type="range" id="freqslider" min=100 max=2000 value=440 step=1>
</div>
`;

const getAssetUrl = (asset) => {
    const base = new URL('.', import.meta.url);
    return `${base}${asset}`;
};

//let tunertemp = document.currentScript.ownerDocument.querySelector("#wc-tuner");
export default class TunerHTMLElement extends HTMLElement {

    constructor(plug) {
        super();

        this.plugin = plug;

        this._plug = plug;
        this._plug.gui = this;
        this._root = this.attachShadow({ mode: 'open' });
        this._root.innerHTML = `<style>${style}</style>${template}`;
        //this._root.appendChild(tunertemp.content.cloneNode(true));
        this.state = new Object();
        this.isOn;
        this.setSwitchListener();
    }

    get properties() {
        this.boundingRect = {
            dataWidth: {
                type: Number,
                value: 200
            },
            dataHeight: {
                type: Number,
                value: 280
            }
        };
        return this.boundingRect;
    }

    static get observedAttributes() { return ['state']; }

    attributeChangedCallback() {
        this.state = JSON.parse(this.getAttribute('state'));
        console.log(this.state);
        try {
            if (this.state.status == "enable") {
                this._root.querySelector("#switch1").value = 1;
                this.isOn = true;
            }
        } catch (error) {
            console.log(error);
        }
    }

    connectedCallback() {
        this.canvasElem = this.shadowRoot.getElementById("output");
        this.detectorElem = this.shadowRoot.getElementById("detector");
        this.DEBUGCANVAS = this.shadowRoot.getElementById("waveform");
        
        this.freqslider = this.shadowRoot.getElementById("freqslider");
        this.freqslider.oninput = evt => {
            this.plugin.audioNode.osc.frequency.value = evt.target.value;
        }

        this.wA = this.shadowRoot.getElementById("output").offsetWidth;
        this.hA = this.shadowRoot.getElementById("output").offsetHeight;

        this.outputACtx = this.canvasElem.getContext('2d');


        //canvas diode
        this.canvasdio = this.shadowRoot.getElementById("diode");
        this.outputDCtx = this.canvasdio.getContext('2d');

        //Tuner canvas
        this.pitchElem = this.shadowRoot.getElementById("pitch");
        this.noteElem = this.shadowRoot.getElementById("note");
        this.detuneElem = this.shadowRoot.getElementById("detune");
        this.detuneAmount = this.shadowRoot.getElementById("detune_amt");

        // for analysing frequencies
        this.buflen = 2048;
        this.buf = new Float32Array(this.buflen);
        this.noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.MIN_SAMPLES = 0;
        this.GOOD_ENOUGH_CORRELATION = 0.9;

        //for function about mode choice
        this.toneLevel = 0;
        this.frequencyString = [0, 0, 0, 0, 0, 0]
        this.valueSaved = 0;

    }


    measurePitch() {
        this.rafID = requestAnimationFrame(this.updatePitch.bind(this));
    }

    stopMeasuringPitch() {
        cancelAnimationFrame(this.rafID);
    }

    setSwitchListener() {
        console.log("setSwitch");
        const { plugin } = this;
        console.log(this);
        //by default, plugin is disabled
        plugin.audioNode.setParamsValues({ enabled: 0 });

        this._root
            .querySelector('#switch1')
            .addEventListener('change', (evt) => {
                console.log(this.plugin);
                let tunerEnabled = this.plugin.audioNode.getParamValue('enabled');
                if (!tunerEnabled) {
                    // For starting the audio context in case it was stopped
                    this.plugin.audioNode.context.resume();

                    this.plugin.audioNode.setParamValue('enabled', 1)
                    this.measurePitch();
                    console.log("Tuner is on");
                } else {
                    this.plugin.audioNode.setParamValue('enabled', 0)

                    this.stopMeasuringPitch();

                    console.log("Tuner is off");
                }

            });
    }

    // name of the custom HTML element associated
    // with the plugin. Will appear in the DOM if
    // the plugin is visible
    static is() {
        return 'wasabi-tuner';
    }








    noteFromPitch(frequency) {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    }

    centsOffFromPitch(frequency, note) {
        return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
    }

    frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    getAverageFrequency(arrayFrequencies) {
        let values = 0;
        let average;

        let length = arrayFrequencies.length;

        for (let i = 0; i < length; i++) {
            values += arrayFrequencies[i];
        }

        average = values / length;
        return average;
    }

    updatePitch() {
        // get frequency data from analyser
        this.plugin.audioNode.analyser.getByteFrequencyData(this.plugin.audioNode.dataArray);

        // calculate an average frequency for the data
        const averageFrequency = this.getAverageFrequency(this.plugin.audioNode.dataArray);
        var coordinateY = (averageFrequency);

        if (coordinateY < 0)
            coordinateY = 0;
        this.hRect = coordinateY;

        if (this.DEBUGCANVAS) {
            let waveCanvas = this.DEBUGCANVAS.getContext("2d");
            waveCanvas.strokeStyle = "black";
            waveCanvas.lineWidth = 1;
        }



        //canvas aiguille
        //le canvas de l'aiguille a été envelé pour le mettre dans le canvas principale


        this.plugin.audioNode.analyser.getFloatTimeDomainData(this.buf);
        let ac = this.autoCorrelate(this.buf, this.plugin.audioNode.context.sampleRate);

        let newAngle = this.angle_frequence(ac); //angle modifié en fonction de la freq

        this.outputACtx.clearRect(0, 0, this.wA, this.hA); //pour effacer aiguille quand elle bouge(animation)

        this.background(this.outputACtx);
        this.inittrait(this.outputACtx, newAngle);


        this.initdiiode(this.outputDCtx, ac);

        this.drawGain(this.outputACtx);


        /* if (this.shadowRoot.getElementById("waveform")) {  // This draws the current waveform, useful for debugging
             this.shadowRoot.waveCanvas.clearRect(0, 0, 512, 256);
             waveCanvas.strokeStyle = "red";
             waveCanvas.beginPath();
             waveCanvas.moveTo(0, 0);
             waveCanvas.lineTo(0, 256);
             waveCanvas.moveTo(128, 0);
             waveCanvas.lineTo(128, 256);
             waveCanvas.moveTo(256, 0);
             waveCanvas.lineTo(256, 256);
             waveCanvas.moveTo(384, 0);
             waveCanvas.lineTo(384, 256);
             waveCanvas.moveTo(512, 0);
             waveCanvas.lineTo(512, 256);
             waveCanvas.stroke();
             waveCanvas.strokeStyle = "black";
             waveCanvas.beginPath();
             waveCanvas.moveTo(0, buf[0]);
             for (var i = 1; i < 512; i++) {
                 waveCanvas.lineTo(i, 128 + (buf[i] * 128));
             }
             waveCanvas.stroke();
         }*/

        if (ac == -1) {
            this.detectorElem.className = "vague";
            this.pitchElem.innerText = "--";
            this.noteElem.innerText = "-";
            this.detuneElem.className = "";
            this.detuneAmount.innerText = "--";
        } else {
            this.detectorElem.className = "confident";
            let pitch = ac;
            this.pitchElem.innerText = Math.round(pitch);
            let note = this.noteFromPitch(pitch);
            this.noteElem.innerHTML = this.noteStrings[note % 12];
            let detune = this.centsOffFromPitch(pitch, note);
            if (detune == 0) {
                this.detuneElem.className = "";
                this.detuneAmount.innerHTML = "--";
            } else {
                if (detune < 0)
                    this.detuneElem.className = "flat";
                else
                    this.detuneElem.className = "sharp";
                this.detuneAmount.innerHTML = Math.abs(detune);
            }
            this.Modifdio(this.outputDCtx, detune, this.detuneElem.className);
        }
        /* let freq = Math.round(ac);
         if (this.valueSaved != freq) {
             this.indicateTone(this.toneLevel);
         }*/

        // Se rappelle lui-même 60 fois par seconde
        this.rafID = requestAnimationFrame(this.updatePitch.bind(this));


    }

    background(ctx) {
        ctx.save();
        /*Modification afin de mettre une partie de l'arc de cercle à sa place*/
        ctx.translate(this.wA / 2, this.hA - 10);

        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -this.hA / 3 - 15);
        ctx.lineTo(0, -this.hA / 3 - 30);
        ctx.stroke();

        var mesure = -50;
        var cnorm;
        this.Angle = 0;
        while (mesure < 40) {

            //	ctx.rotate(Angle);
            cnorm = this.map(mesure, -50, 0, 1, 0.1);
            cnorm = this.mapLinearToLog(cnorm, -0.1, -1, 0.1, 1);
            this.Angle = this.map(cnorm, -1, -0.1, -Math.PI / 4, 0); //angle

            ctx.rotate(this.Angle);

            // Graduation qui suit les cents de façon logarithmique
            ctx.strokeStyle = "rgb(255, 0, 0)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -this.hA / 3 - 15);
            ctx.lineTo(0, -this.hA / 3 - 30);
            ctx.stroke();

            mesure += 10;
        }
        ctx.restore();


        ctx.save();
        /*Modification afin de mettre une l'autre de l'arc de cercle à sa place*/
        ctx.translate(this.wA / 2, this.hA - 10);

        var mesure2 = -50;
        var cnorm2;
        var Angle2 = 0;
        while (mesure2 < 40) {

            //	ctx.rotate(Angle);
            cnorm2 = this.map(mesure2, -50, 0, 1, 0.1);
            cnorm2 = this.mapLinearToLog(cnorm2, -0.1, -1, 0.1, 1);
            Angle2 = this.map(cnorm2, -1, -0.1, Math.PI / 4, 0); //angle

            ctx.rotate(Angle2);

            // Graduation qui suit les cents de façon logarithmique
            ctx.strokeStyle = "rgb(255, 0, 0)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -this.hA / 3 - 15);
            ctx.lineTo(0, -this.hA / 3 - 30);
            ctx.stroke();

            mesure2 += 10;
        }
        ctx.restore();
    }

    // maps a value from [istart, istop] into [ostart, ostop]
    map(value, istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }

    // passage echelle linéaire -> echelle logarithmique
    mapLinearToLog(x, istart, istop, ostart, ostop) {
        // sliderValue is in [0, 10] range, adjust to [0, 1500] range  
        var value = x;
        var minp = istart;
        var maxp = istop;

        // The result should be between 10 an 1500
        var minv = Math.log(ostart);
        var maxv = Math.log(ostop);

        // calculate adjustment factor
        var scale = (maxv - minv) / (maxp - minp);

        value = Math.exp(minv + scale * (value - minp));
        // end of logarithmic adjustment
        return value;
    }

    /**************** AIGUILLE Canvas ****************/
    inittrait(ctx, A) // A l'angle défini par angle_fréquence(f)
    {
        ctx.save();
        /*Modification afin de mettre l'aiguille a sa place*/
        ctx.translate(this.wA / 2, this.hA - 10);
        ctx.rotate(A);

        ctx.strokeStyle = "rgb(70, 70, 70)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        /*Modification de la taille de l'aiguille*/
        ctx.lineTo(0, -60);
        ctx.stroke();
        ctx.restore();
    }

    initdiiode(ctx) // ctx context du canvas des diiode
    {
        ctx.fillStyle = "rgb(70, 70, 70)";
        ctx.beginPath();

        ctx.arc(20, 20, 10, 0, 2 * Math.PI);
        ctx.arc(90, 20, 10, 0, 2 * Math.PI);
        ctx.arc(160, 20, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    /**************** GAIN Canvas ****************/
    // Fonction qui initialisera le rectangle qui representera le volume du son
    initGain(ctx) {
        ctx.save();
        ctx.fillStyle = "rgb(70, 70, 70)";
        ctx.fillRect(this.wA - 15, 0, 10, this.hA);
        this.hRect = this.hA;
        ctx.restore();
    }
    // Fonction qui dessine le rectangle representant le volume du sons
    drawGain(ctx) {
        ctx.save();
        ctx.clearRect(this.wA - 15, 0, 10, this.hA);
        ctx.fillStyle = "rgb(70, 70, 70)";
        ctx.fillRect(this.wA - 15, 0, 10, this.hA);
        ctx.fillStyle = "rgb(0, 179, 0)";
        ctx.fillRect(this.wA - 15, this.hA, 10, -this.hRect);
        ctx.restore();
    }

    angle_frequence(f) { // variation de l'angle en fonction de la fréquence émise
        var note = this.noteFromPitch(f);
        var cents = this.centsOffFromPitch(f, note);
        var ref_freq = this.frequencyFromNoteNumber(note);
        var cnorm;
        if (f < ref_freq) {
            cnorm = this.map(cents, -50, 0, 1, 0.1);
            cnorm = this.mapLinearToLog(cnorm, 0.1, 1, 0.1, 1);
            this.Angle = this.map(cnorm, 1, 0.1, -Math.PI / 2 + 0.2, 0); //angle
            return this.Angle;
        } else {
            cnorm = this.map(cents, 0, 50, 0.1, 1);
            cnorm = this.mapLinearToLog(cnorm, 0.1, 1, 0.1, 1);
            this.Angle = this.map(cnorm, 0.1, 1, 0, Math.PI / 2 - 0.2); //angle
            return this.Angle;
        }
    }

    Modifdio(ctx, ecart, side) //ecart = l'ecart entre la frequence du son et celle de la note reconnu 
    //et side contient une chaine de caractère qui va nous servir à savoir de quel côté allumé la diiode
    //flat: à gauche  sharp:à gauhche  "": au centre  
    {
        ctx.save();
        ctx.clearRect(0, 0, 300, 200);
        if (side == "flat" && ecart <= -5) {
            if (ecart >= -15) {
                ctx.fillStyle = "rgb(0, 150, 0)";
            }
            else if (ecart >= -35) {
                ctx.fillStyle = "rgb(255, 102, 0)";
            }
            else if (ecart <= -35) {
                ctx.fillStyle = "rgb(200,0,0)";
            }

        }
        else {
            ctx.fillStyle = "rgb(70, 70, 70)";
        }
        ctx.beginPath();

        ctx.arc(20, 20, 10, 0, 2 * Math.PI);
        ctx.fill();

        if (side == "sharp" && ecart >= 5) {
            if (ecart <= 15) {
                ctx.fillStyle = "rgb(0, 150, 0)";
            }
            else if (ecart <= 35) {
                ctx.fillStyle = "rgb(255, 102, 0)";
            }
            else if (ecart >= 35) {
                ctx.fillStyle = "rgb(200,0,0)";
            }
        }
        else {
            ctx.fillStyle = "rgb(70, 70, 70)";
        }
        ctx.beginPath();
        ctx.arc(160, 20, 10, 0, 2 * Math.PI);
        ctx.fill();

        if (ecart <= 5 && ecart >= -5) {
            ctx.fillStyle = "rgb(0, 230, 0)"
        }
        else {
            ctx.fillStyle = "rgb(70, 70, 70)";
        }
        ctx.beginPath();
        ctx.arc(90, 20, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }



    /*autoCorrelate(buf, sampleRate) {
         var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
         var GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be
         var SIZE = buf.length;
         var MAX_SAMPLES = Math.floor(SIZE / 2);
         var best_offset = -1;
         var best_correlation = 0;
         var rms = 0;
         var foundGoodCorrelation = false;
         var correlations = new Array(MAX_SAMPLES);
 
         for (var i = 0; i < SIZE; i++) {
             var val = buf[i];
             rms += val * val;
         }
         rms = Math.sqrt(rms / SIZE);
         if (rms < 0.01) // not enough signal
             return -1;
 
         var lastCorrelation = 1;
         for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
             var correlation = 0;
 
             for (var i = 0; i < MAX_SAMPLES; i++) {
                 correlation += Math.abs((buf[i]) - (buf[i + offset]));
             }
             correlation = 1 - (correlation / MAX_SAMPLES);
             correlations[offset] = correlation; // store it, for the tweaking we need to do below.
             if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
                 foundGoodCorrelation = true;
                 if (correlation > best_correlation) {
                     best_correlation = correlation;
                     best_offset = offset;
                 }
             } else if (foundGoodCorrelation) {
                 // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
                 // Now we need to tweak the offset - by interpolating between the values to the left and right of the
                 // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
                 // we need to do a curve fit on correlations[] around best_offset in order to better determine precise
                 // (anti-aliased) offset.
 
                 // we know best_offset >=1, 
                 // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
                 // we can't drop into this clause until the following pass (else if).
                 var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
                 return sampleRate / (best_offset + (8 * shift));
             }
             lastCorrelation = correlation;
         }
         if (best_correlation > 0.01) {
             // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
             return sampleRate / best_offset;
         }
         return -1;
         //	var best_frequency = sampleRate/best_offset;
     }*/

    /*
     * Autocorrelation purposed by dalatant, at this link: 
     * https://github.com/cwilso/PitchDetect/pull/23/commits/b0d5d28d2803d852dd85d2a1e53c22bcedba4cbf
     */
    autoCorrelate(buf, sampleRate) {
        // Implements the ACF2+ algorithm
        var SIZE = buf.length;
        var rms = 0;
        for (var i = 0; i < SIZE; i++) {
            var val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) // not enough signal
            return -1;
        var r1 = 0, r2 = SIZE - 1, thres = 0.2;
        for (var i = 0; i < SIZE / 2; i++)
            if (Math.abs(buf[i]) < thres) { r1 = i; break; }
        for (var i = 1; i < SIZE / 2; i++)
            if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
        buf = buf.slice(r1, r2);
        SIZE = buf.length;
        var c = new Array(SIZE).fill(0);
        for (var i = 0; i < SIZE; i++)
            for (var j = 0; j < SIZE - i; j++)
                c[i] = c[i] + buf[j] * buf[j + i];
        var d = 0; while (c[d] > c[d + 1]) d++;
        var maxval = -1, maxpos = -1;
        for (var i = d; i < SIZE; i++) {
            if (c[i] > maxval) {
                maxval = c[i];
                maxpos = i;
            }
        }
        var T0 = maxpos;
        var x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        var a = (x1 + x3 - 2 * x2) / 2;
        var b = (x3 - x1) / 2;
        if (a) T0 = T0 - b / (2 * a);
        return sampleRate / T0;
    }

    /* increaseSemiTone() {
         if (this.toneLevel < 2) {
             this.toneLevel++;
             this.indicateTone(this.toneLevel);
         }
         console.log("increase semitone level : toneLevel =" + this.toneLevel)
     }
 
     decreaseSemiTone() {
         if (this.toneLevel > -2) {
             this.toneLevel--;
             this.indicateTone(this.toneLevel);
         }
         console.log("decrease semitone level : toneLevel =" + this.toneLevel);
     }
 
     //Function about indicating the correct note depending of tuning mode
     indicateTone(toneLevel) {
         let freq = this.autoCorrelate(this.buf, this.context.sampleRate);
         toneLevel = this.toneLevel;
         let freqTest = Math.round(freq);
         let intMin = 0;
         let intMax = 0;
         let freqMin = freqTest;
         let freqMax = freqTest;
         var detuneLessMode = this.shadowRoot.getElementById("lessArrow");
         var detuneMoreMode = this.shadowRoot.getElementById("moreArrow");
 
 
         switch (toneLevel) {
             //Chord Mode, 0 is the standard tuning
             case -2:
                 this.frequencyString = [73, 98, 131, 175, 220, 294];
                 break;
             case -1:
                 this.frequencyString = [78, 104, 139, 185, 233, 311];
                 break;
             case 0:
                 this.frequencyString = [82, 110, 147, 196, 247, 330];
                 break;
             case 1:
                 this.frequencyString = [87, 117, 156, 208, 262, 349];
                 break;
             case 2:
                 this.frequencyString = [92, 123, 165, 220, 277, 370];
                 break;
         }
 
         /*
          *  The goal here is while the frequency isn't close to one of frequency
          *  present in the table, we must to catch on which interval the frequency is present
          *  and after to indicate if the user must to tune more or less depending of the position
          *  in the interval
          *
 
         //If the frequency catched not corresponding to a frequency in the table and the value between the frequency of the first string and last string
         if (this.frequencyString.indexOf(freqMin) == -1 && freqTest > this.frequencyString[0] && freqTest < this.frequencyString[5]) {
             while (this.frequencyString.indexOf(freqMin) == -1 && freqMin > 0) {
 
                 //We decrease freqMin to find the first value of the interval
                 freqMin--;
                 //Until we find the first value of the interval
                 if (this.frequencyString.indexOf(freqMin) != -1) {
                     intMin = this.frequencyString[this.frequencyString.indexOf(freqMin)];
                 }
 
             }
             //Same test but to find the second value for the interval
             while (this.frequencyString.indexOf(freqMax) == -1) {
                 freqMax++;
                 if (this.frequencyString.indexOf(freqMax) != -1) {
                     intMax = this.frequencyString[this.frequencyString.indexOf(freqMax)];
                 }
             }
 
             //If the frequency catched is not closed of the exact frequency
             if (freqTest > intMin + 2 || freqTest < intMax - 2) {
                 let middle = (intMin + intMax) / 2;
                 //if the frequency catched is above of the middle of the interval or under the frequency of the first string
                 if (freqTest > middle || freqTest < this.frequencyString[0]) {
                     //If it's closed to the max interval
                     if (freqTest > intMax - 2 && freqTest < intMax + 2) {
                         detuneLessMode.innerHTML = "";
                         detuneMoreMode.innerHTML = "";
                     } else {
                         //Otherwise We told to increase the tuning
                         detuneLessMode.innerHTML = "↑";
                         detuneMoreMode.innerHTML = "";
                     }
                 }
                 else if (freqTest < middle || freqTest > this.frequencyString[5]) {
                     //Inversing test
                     if (freqTest > intMin - 2 && freqTest < intMin + 2) {
                         detuneLessMode.innerHTML = "";
                         detuneMoreMode.innerHTML = "";
                     } else {
                         detuneMoreMode.innerHTML = "";
                         detuneLessMode.innerHTML = "↓";
                     }
                 }
             }
         } else {
             if (freqTest < this.frequencyString[0] - 2 && freqTest > 0) {
                 detuneLessMode.innerHTML = "↑";
                 detuneMoreMode.innerHTML = "";
             }
             else if (freqTest > this.frequencyString[5] + 2) {
                 detuneMoreMode.innerHTML = "";
                 detuneLessMode.innerHTML = "↓";
             }
             else {
                 detuneMoreMode.innerHTML = "";
                 detuneLessMode.innerHTML = "";
             }
         }
         this.valueSaved = freqTest;
     }
     */
}

if (!customElements.get(TunerHTMLElement.is())) {
    customElements.define(TunerHTMLElement.is(), TunerHTMLElement);
}
