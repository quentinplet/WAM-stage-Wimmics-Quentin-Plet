// WARNING: This a "legacy example based on a deprecated library". Check misceffects.lib
// for more accurate examples of echo functions

declare name 		"quadEcho";
declare version 	"1.0";
declare author 		"Grame";
declare license 	"BSD";
declare copyright 	"(c)GRAME 2007";

//-----------------------------------------------
// 				A 1 second quadriphonic Echo
//-----------------------------------------------

import("stdfaust.lib");

// DRY WET MIXER
linear_interp = _<:(mem,_):+:*(0.5):_;
wetSlider = hslider("Mix[style:knob]",1.0,0.0,1.0,0.01):linear_interp;

// fxctrl : add an input gain and a wet-dry control to a stereo FX
//----------------------------------------------------------------

fxctrl(g,w,Fx) =  _,_ <: (*(g),*(g) : Fx : *(w),*(w)), *(1-w), *(1-w) :> _,_;

process_normal = (_,_) <: multi(ef.echo1s, 4) :> (_,_)
	with{ 
		multi(f,1) = f;
		multi(f,n) = f,multi(f,n-1);
	};

quadEcho = hgroup("quad Echo", fxctrl(1, wetSlider, process_normal));
//process = ba.bypass_fade(ma.SR/10, checkbox("bypass"), );
process = ba.bypass_fade(ma.SR/10, checkbox("bypass"), quadEcho);