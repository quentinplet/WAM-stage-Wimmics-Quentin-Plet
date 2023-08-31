import '../utils/webaudio-controls.js'

      const getBaseURL = () => {
        const base = new URL('.', import.meta.url);
        return `${base}`;
      };
      export default class quadEchoGui extends HTMLElement {
              constructor(plug) {
                 
        super();
            this._plug = plug;
            this._plug.gui = this;
        console.log(this._plug);
          
        this._root = this.attachShadow({ mode: 'open' });
        this._root.innerHTML = `<style>.my-pedal {animation:none 0s ease 0s 1 normal none running;appearance:none;background:linear-gradient(to top, rgba(44, 136, 175, 0.63), rgba(60, 52, 178, 0.63)) repeat scroll 0% 0% / auto padding-box border-box, rgba(0, 0, 0, 0) url("https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/commonAssets/img/background/metal11.jpg") repeat scroll 0% 0% / 100% 100% padding-box border-box;border:0px dashed rgb(0, 0, 0);bottom:240.203px;clear:none;clip:auto;color:rgb(33, 37, 41);columns:auto auto;contain:none;container:none;content:normal;cursor:auto;cx:0px;cy:0px;d:none;direction:ltr;display:block;fill:rgb(0, 0, 0);filter:none;flex:0 1 auto;float:none;font:16px / 24px -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";gap:normal;grid:none / none / none / row / auto / auto;height:301.016px;hyphens:manual;inset:57.7812px 616.156px 240.203px 212px;isolation:auto;left:212px;margin:2px;marker:none;mask:none;offset:none 0px auto 0deg;opacity:1;order:0;orphans:2;outline:rgb(33, 37, 41) none 0px;overflow:visible;padding:1px;page:auto;perspective:none;position:unset;quotes:auto;r:0px;resize:none;right:616.156px;rotate:none;rx:auto;ry:auto;scale:none;speak:normal;stroke:none;top:57.7812px;transform:matrix(1, 0, 0, 1, -0.504791, 177.707);transition:all 0s ease 0s;translate:none;visibility:visible;widows:2;width:199.844px;x:0px;y:0px;zoom:1;};</style>
<div id="quadEcho" class="resize-drag my-pedal target-style-container gradiant-target" style="border: 0px dashed rgb(0, 0, 0); text-align: center; display: inline-block; vertical-align: baseline; padding: 1px; margin: 2px; box-sizing: border-box; background: linear-gradient(to top, rgba(44, 136, 175, 0.63), rgba(60, 52, 178, 0.63)), url(&quot;https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/commonAssets/img/background/metal11.jpg&quot;) 0% 0% / 100% 100%; box-shadow: rgba(0, 0, 0, 0.7) 4px 5px 6px, rgba(0, 0, 0, 0.2) -2px -2px 5px 0px inset, rgba(255, 255, 255, 0.2) 3px 1px 1px 4px inset, rgba(0, 0, 0, 0.9) 1px 0px 1px 0px, rgba(0, 0, 0, 0.9) 0px 2px 1px 0px, rgba(0, 0, 0, 0.9) 1px 1px 1px 0px; border-radius: 15px; touch-action: none; width: 199.852px; position: relative; top: 0px; left: 0px; height: 301.031px; transform: translate(-0.504791px, 177.707px);" data-x="-0.504791259765625" data-y="177.70730590820312"><div id="quadEcho" class="resize-drag" style="border: 1px solid rgb(73, 73, 73); text-align: center; vertical-align: baseline; padding: 1px; margin: 2px; box-sizing: border-box; background-size: contain; border-radius: 15px; background-color: transparent; touch-action: none; position: absolute; top: 33px; left: 101px; width: 180px; height: 239px; display: none;"></div><div id="quadEcho" class="resize-drag" style="border: 1px solid rgb(73, 73, 73); text-align: center; vertical-align: baseline; padding: 1px; margin: 2px; box-sizing: border-box; background-size: contain; border-radius: 15px; background-color: transparent; touch-action: none; width: 34.0771px; position: absolute; top: 69px; left: 149px; height: 199.906px; transform: translate(81.0757px, -66.2303px); display: none;" data-x="81.07568359375" data-y="-66.2303466796875"></div><div class="drag" style="padding: 1px; margin: 1px; text-align: center; display: inline-block; box-sizing: border-box; touch-action: none; position: absolute; top: 186px; left: 33px; transform: translate(36.6016px, 60.2228px);" data-x="36.60162353515625" data-y="60.22283935546875"><webaudio-switch id="/quadEcho/bypass" src="./img/switches/switch_1.png" sprites="100" width="60" height="35" style="touch-action: none;"><style>

.webaudioctrl-tooltip{
  display:inline-block;
  position:absolute;
  margin:0 -1000px;
  z-index: 999;
  background:#eee;
  color:#000;
  border:1px solid #666;
  border-radius:4px;
  padding:5px 10px;
  text-align:center;
  left:0; top:0;
  font-size:11px;
  opacity:0;
  visibility:hidden;
}
.webaudioctrl-tooltip:before{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -8px;
	border: 8px solid transparent;
	border-top: 8px solid #666;
}
.webaudioctrl-tooltip:after{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -6px;
	border: 6px solid transparent;
	border-top: 6px solid #eee;
}

webaudio-switch{
  display:inline-block;
  margin:0;
  padding:0;
  font-family: sans-serif;
  font-size: 11px;
  cursor:pointer;
}
.webaudio-switch-body{
  display:inline-block;
  margin:0;
  padding:0;
}
</style>
<div class="webaudio-switch-body" tabindex="1" touch-action="none" style="background-image: url(&quot;./img/switches/switch_1.png&quot;); background-size: 100% 200%; width: 60px; height: 35px; outline: none; background-position: 0px -100%;"><div class="webaudioctrl-tooltip" style="transition: opacity 0.1s ease 0s, visibility 0.1s ease 0s; opacity: 0; visibility: hidden;"></div></div>
</webaudio-switch></div><div class="drag" style="padding: 1px; margin: 1px; text-align: center; display: inline-block; box-sizing: border-box; touch-action: none; position: absolute; top: 186.5px; left: 105px; width: 50px; height: 79.5px; transform: translate(-29.7598px, -57.3974px);" data-x="-29.75982666015625" data-y="-57.39739990234375"><webaudio-knob id="/quadEcho/quad_Echo/Mix" src="./img/knobs/knob2.png" sprites="100" min="0" max="1" step="0.01" width="50" height="50" style="touch-action: none; display: block;"><style>

.webaudioctrl-tooltip{
  display:inline-block;
  position:absolute;
  margin:0 -1000px;
  z-index: 999;
  background:#eee;
  color:#000;
  border:1px solid #666;
  border-radius:4px;
  padding:5px 10px;
  text-align:center;
  left:0; top:0;
  font-size:11px;
  opacity:0;
  visibility:hidden;
}
.webaudioctrl-tooltip:before{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -8px;
	border: 8px solid transparent;
	border-top: 8px solid #666;
}
.webaudioctrl-tooltip:after{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -6px;
	border: 6px solid transparent;
	border-top: 6px solid #eee;
}

webaudio-knob{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  cursor:pointer;
  font-family: sans-serif;
  font-size: 11px;
}
.webaudio-knob-body{
  display:inline-block;
  position:relative;
  z-index:1;
  margin:0;
  padding:0;
}
</style>
<div class="webaudio-knob-body" tabindex="1" touch-action="none" style="background-image: url(&quot;./img/knobs/knob2.png&quot;); background-size: 50px 5050px; outline: none; width: 50px; height: 50px; background-position: 0px -2800px; transform: rotate(0deg);"></div><div class="webaudioctrl-tooltip" style="display: inline-block; width: auto; height: auto; transition: opacity 0.1s ease 0s, visibility 0.1s ease 0s; opacity: 0; visibility: hidden; left: 1002.29px; top: -36.5px;">0.56</div>
</webaudio-knob></div><div class="drag" style="padding: 1px; margin: 1px; text-align: center; display: inline-block; box-sizing: border-box; touch-action: none; position: absolute; top: 105px; left: 153px; width: 50px; transform: translate(-123.547px, -60.6327px);" data-x="-123.54672241210938" data-y="-60.632659912109375"><webaudio-knob id="/quadEcho/quad_Echo/echo_1000/feedback" src="./img/knobs/knob2.png" sprites="100" min="0" max="100" step="0.1" width="50" height="50" style="touch-action: none; display: block;"><style>

.webaudioctrl-tooltip{
  display:inline-block;
  position:absolute;
  margin:0 -1000px;
  z-index: 999;
  background:#eee;
  color:#000;
  border:1px solid #666;
  border-radius:4px;
  padding:5px 10px;
  text-align:center;
  left:0; top:0;
  font-size:11px;
  opacity:0;
  visibility:hidden;
}
.webaudioctrl-tooltip:before{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -8px;
	border: 8px solid transparent;
	border-top: 8px solid #666;
}
.webaudioctrl-tooltip:after{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -6px;
	border: 6px solid transparent;
	border-top: 6px solid #eee;
}

webaudio-knob{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  cursor:pointer;
  font-family: sans-serif;
  font-size: 11px;
}
.webaudio-knob-body{
  display:inline-block;
  position:relative;
  z-index:1;
  margin:0;
  padding:0;
}
</style>
<div class="webaudio-knob-body" tabindex="1" touch-action="none" style="background-image: url(&quot;./img/knobs/knob2.png&quot;); outline: none; width: 50px; height: 50px; background-position: 0px -1000px; background-size: 50px 5050px; transform: rotate(0deg);"></div><div class="webaudioctrl-tooltip" style="display: inline-block; width: auto; height: auto; transition: opacity 0.1s ease 0s, visibility 0.1s ease 0s; opacity: 0; visibility: hidden; left: 1002.29px; top: -36.5px;">20.3</div>
</webaudio-knob></div><div class="drag" style="padding: 1px; margin: 1px; text-align: center; display: inline-block; box-sizing: border-box; touch-action: none; position: absolute; top: 186.5px; left: 153px; width: 50px; height: 79.5px; transform: translate(-26.5021px, -139.577px); z-index: 0;" data-x="-26.5020751953125" data-y="-139.5772705078125"><webaudio-knob id="/quadEcho/quad_Echo/echo_1000/millisecond" src="./img/knobs/knob2.png" sprites="100" min="0" max="1000" step="0.1" width="50" height="50" style="touch-action: none; display: block;" zindex="0"><style>

.webaudioctrl-tooltip{
  display:inline-block;
  position:absolute;
  margin:0 -1000px;
  z-index: 999;
  background:#eee;
  color:#000;
  border:1px solid #666;
  border-radius:4px;
  padding:5px 10px;
  text-align:center;
  left:0; top:0;
  font-size:11px;
  opacity:0;
  visibility:hidden;
}
.webaudioctrl-tooltip:before{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -8px;
	border: 8px solid transparent;
	border-top: 8px solid #666;
}
.webaudioctrl-tooltip:after{
  content: "";
	position: absolute;
	top: 100%;
	left: 50%;
 	margin-left: -6px;
	border: 6px solid transparent;
	border-top: 6px solid #eee;
}

webaudio-knob{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  cursor:pointer;
  font-family: sans-serif;
  font-size: 11px;
}
.webaudio-knob-body{
  display:inline-block;
  position:relative;
  z-index:1;
  margin:0;
  padding:0;
}
</style>
<div class="webaudio-knob-body" tabindex="1" touch-action="none" style="background-image: url(&quot;./img/knobs/knob2.png&quot;); outline: none; width: 50px; height: 50px; background-position: 0px -3950px; background-size: 50px 5050px; transform: rotate(0deg);"></div><div class="webaudioctrl-tooltip" style="display: inline-block; width: auto; height: auto; transition: opacity 0.1s ease 0s, visibility 0.1s ease 0s; opacity: 0; visibility: hidden; left: 999.234px; top: -36.5px;">796.3</div>
</webaudio-knob></div><label for="quadEcho" style="display: none; touch-action: none; position: absolute; z-index: 1; width: 316px; left: 2px; top: 3.78125px; border: none; transform: translate(2.41083px, -42.3414px); font-family: Butcherman;" class="drag" contenteditable="false" data-x="2.41082763671875" data-y="-42.34136962890625" font="Butcherman">quadEho</label><label for="quad Echo" style="display: block; touch-action: none; position: absolute; z-index: 1; width: 176px; left: 106px; top: 39.7812px; border: none; transform: translate(-90.5854px, 174.222px); font-family: &quot;Trade Winds&quot;; font-size: 22px; color: rgb(20, 28, 255); -webkit-text-stroke-width: 0px;" class="drag" contenteditable="false" data-x="-90.58541870117188" data-y="174.22189331054688" font="Trade Winds">Quad Echo</label><label for="echo 1000" style="display: none; touch-action: none; position: absolute; z-index: 1; width: 124px; left: 154px; top: 75.7812px; border: none; transform: translate(53.9528px, -179.124px); font-family: Butcherman;" class="drag" contenteditable="false" data-x="53.95281982421875" data-y="-179.12432861328125" font="Butcherman">echo 1000</label><label for="bypass" style="text-align: center; display: none; touch-action: none; position: absolute; z-index: 1; width: 64px; left: 36px; top: 236.781px; transform: translate(2.03986px, 16.8008px); border: none; font-family: Butcherman;" class="drag" contenteditable="false" data-x="2.03985595703125" data-y="16.80078125" font="Butcherman">bypass</label><label for="Mix" style="text-align: center; display: block; touch-action: none; position: absolute; z-index: 1; width: 40px; left: 108px; top: 236.781px; border: none; transform: translate(-25.9777px, -52.9803px); font-family: &quot;Freckle Face&quot;; color: rgb(0, 0, 0);" class="drag" contenteditable="false" data-x="-25.977691650390625" data-y="-52.98028564453125" font="Freckle Face">Mix</label><label for="feedback" style="text-align: center; display: block; touch-action: none; position: absolute; z-index: 1; width: 80px; left: 156px; top: 155.281px; border: none; transform: translate(-138.848px, -58.1837px); font-family: &quot;Freckle Face&quot;; color: rgb(0, 0, 0);" class="drag" contenteditable="false" data-x="-138.84786987304688" data-y="-58.1837158203125" font="Freckle Face">Feedback</label><label for="millisecond" style="text-align: center; display: block; touch-action: none; position: absolute; z-index: 1; width: 60px; left: 156px; top: 236.781px; border: none; transform: translate(-32.8603px, -137.064px); font-family: &quot;Freckle Face&quot;; -webkit-text-stroke: 0px rgb(0, 0, 0); color: rgb(0, 0, 0);" class="drag" contenteditable="false" data-x="-32.86029052734375" data-y="-137.064453125" font="Freckle Face">Delay</label></div>`;
  
        this.isOn;
            this.state = new Object();
            this.setKnobs();
            this.setSliders();
            this.setSwitches();
            //this.setSwitchListener();
            this.setInactive();
            // Change #pedal to .my-pedal for use the new builder
            this._root.querySelector('.my-pedal').style.transform = 'none';
            //this._root.querySelector("#test").style.fontFamily = window.getComputedStyle(this._root.querySelector("#test")).getPropertyValue('font-family');
  
            // Compute base URI of this main.html file. This is needed in order
            // to fix all relative paths in CSS, as they are relative to
            // the main document, not the plugin's main.html
            this.basePath = getBaseURL();
            console.log("basePath = " + this.basePath)
  
            // Fix relative path in WebAudio Controls elements
            this.fixRelativeImagePathsInCSS();
  
            // optionnal : set image background using a relative URI (relative
            // to this file)
        //this.setImageBackground("/img/BigMuffBackground.png");
          
        // Monitor param changes in order to update the gui
        window.requestAnimationFrame(this.handleAnimationFrame);
      
              }
          
              fixRelativeImagePathsInCSS() {
                 
      // change webaudiocontrols relative paths for spritesheets to absolute
          let webaudioControls = this._root.querySelectorAll(
              'webaudio-knob, webaudio-slider, webaudio-switch, img'
          );
          webaudioControls.forEach((e) => {
              let currentImagePath = e.getAttribute('src');
              if (currentImagePath !== undefined) {
                  //console.log("Got wc src as " + e.getAttribute("src"));
                  let imagePath = e.getAttribute('src');
                  e.setAttribute('src', this.basePath + '/' + imagePath);
                  //console.log("After fix : wc src as " + e.getAttribute("src"));
              }
          });
  
          let sliders = this._root.querySelectorAll('webaudio-slider');
          sliders.forEach((e) => {
              let currentImagePath = e.getAttribute('knobsrc');
              if (currentImagePath !== undefined) {
                  let imagePath = e.getAttribute('knobsrc');
                  e.setAttribute('knobsrc', this.basePath + '/' + imagePath);
              }
          });

          // BMT Get all fonts
          // Need to get the attr font
          let usedFonts = "";
          let fonts = this._root.querySelectorAll('label[font]');
          fonts.forEach((e) => {
              if(!usedFonts.includes(e.getAttribute("font"))) usedFonts += "family=" + e.getAttribute("font") + "&";
          });
          let link = document.createElement('link');
          link.rel = "stylesheet";
          if(usedFonts.slice(0, -1)) link.href = "https://fonts.googleapis.com/css2?"+usedFonts.slice(0, -1)+"&display=swap";
          document.querySelector('head').appendChild(link);
          
          // BMT Adapt for background-image
          let divs = this._root.querySelectorAll('div');
          divs.forEach((e) => {
              if('background-image' in e.style){
                let currentImagePath = e.style.backgroundImage.slice(4, -1);
                if (currentImagePath !== undefined) {
                    let imagePath = e.style.backgroundImage.slice(5, -2);
                    if(imagePath != "") e.style.backgroundImage = 'url(' + this.basePath + '/' + imagePath + ')';
                }
              }
          });
          
              }
          
              setImageBackground() {
                 
      // check if the shadowroot host has a background image
          let mainDiv = this._root.querySelector('#main');
          mainDiv.style.backgroundImage =
              'url(' + this.basePath + '/' + imageRelativeURI + ')';
  
          //console.log("background =" + mainDiv.style.backgroundImage);
          //this._root.style.backgroundImage = "toto.png";
      
              }
          
              attributeChangedCallback() {
                 
            console.log('Custom element attributes changed.');
            this.state = JSON.parse(this.getAttribute('state'));
        let tmp = '/PingPongDelayFaust/bypass';
        
        if (this.state[tmp] == 1) {
          this._root.querySelector('#switch1').value = 0;
          this.isOn = false;
        } else if (this.state[tmp] == 0) {
          this._root.querySelector('#switch1').value = 1;
          this.isOn = true;
        }
  
        this.knobs = this._root.querySelectorAll('.knob');
        console.log(this.state);
  
        for (var i = 0; i < this.knobs.length; i++) {
          this.knobs[i].setValue(this.state[this.knobs[i].id], false);
          console.log(this.knobs[i].value);
        }
      
              }
          handleAnimationFrame = () => {
        this._root.getElementById('/quadEcho/quad_Echo/Mix').value = this._plug.audioNode.getParamValue('/quadEcho/quad_Echo/Mix');
        

        this._root.getElementById('/quadEcho/quad_Echo/echo_1000/feedback').value = this._plug.audioNode.getParamValue('/quadEcho/quad_Echo/echo_1000/feedback');
        

        this._root.getElementById('/quadEcho/quad_Echo/echo_1000/millisecond').value = this._plug.audioNode.getParamValue('/quadEcho/quad_Echo/echo_1000/millisecond');
        

          this._root.getElementById('/quadEcho/bypass').value = 1 - this._plug.audioNode.getParamValue('/quadEcho/bypass');
         
window.requestAnimationFrame(this.handleAnimationFrame);
         }
      
              get properties() {
                 
        this.boundingRect = {
            dataWidth: {
              type: Number,
              value: null
            },
            dataHeight: {
              type: Number,
              value: null
            }
        };
        return this.boundingRect;
      
              }
          
              static get observedAttributes() {
                 
        return ['state'];
      
              }
          
              setKnobs() {
                 this._root.getElementById("/quadEcho/quad_Echo/Mix").addEventListener("input", (e) =>this._plug.audioNode.setParamValue("/quadEcho/quad_Echo/Mix", e.target.value));
this._root.getElementById("/quadEcho/quad_Echo/echo_1000/feedback").addEventListener("input", (e) =>this._plug.audioNode.setParamValue("/quadEcho/quad_Echo/echo_1000/feedback", e.target.value));
this._root.getElementById("/quadEcho/quad_Echo/echo_1000/millisecond").addEventListener("input", (e) =>this._plug.audioNode.setParamValue("/quadEcho/quad_Echo/echo_1000/millisecond", e.target.value));

              }
          
              setSliders() {
                 
              }
          
              setSwitches() {
                 this._root.getElementById("/quadEcho/bypass").addEventListener("change", (e) =>this._plug.audioNode.setParamValue("/quadEcho/bypass", 1 - e.target.value));

              }
          
              setInactive() {
                 
        let switches = this._root.querySelectorAll(".switch webaudio-switch");
  
        switches.forEach(s => {
          console.log("### SWITCH ID = " + s.id);
          this._plug.audioNode.setParamValue(s.id, 0);
        });
      
              }
          }
      try {
          customElements.define('wap-quadecho', 
                                quadEchoGui);
          console.log("Element defined");
      } catch(error){
          console.log(error);
          console.log("Element already defined");      
      }
      