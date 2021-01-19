

//_page_clips.prototype = new _page();
//_page_clips.prototype.constructor = _page_clips;
//Page.prototype.init.call(this);

/*
load("bitwig_observers.js");
load("bitwig_track.js");
load("bitwig_trackbank.js");
load("bitwig_scene.js");
load("bitwig_scenebank.js");
load("bitwig_cliplauncher.js");
load("bitwig_usercontrol.js");
load("bitwig_device.js");
load("bitwig_device_macros.js");
load("bitwig_device_parameters.js");
*/

//----------------------------------------------------------------------

function Bitwig() {



  this.ctrlname     = "";
  this.numtracks    = 0;
  this.numscenes    = 0;
  this.numsends     = 0;
  this.application  = null;
  this.project      = null;
  this.transport    = null;
  this.mixer        = null;
  this.actions      = null;
  this.noteinput1   = null;
  
};

//----------------------------------------------------------------------

Bitwig.prototype.init = function(ctrlname,numtracks,numscenes,numsends) {
  this.ctrlname     = ctrlname;
  this.numtracks    = numtracks;
  this.numscenes    = numscenes;
  this.numsends     = numsends;
  //
  this.application  = host.createApplication();
  this.project      = host.getProject();
  this.transport    = host.createTransport();
  this.mixer        = host.createMixer();
  //
  this.actions = this.application.getActions();
  //
//  this.noteinput1 = host.getMidiInPort(0).createNoteInput(this.ctrlname,"80????","90????");
//  this.noteinput1.setShouldConsumeEvents(false);

}

//----------------------------------------------------------------------

Bitwig.prototype.exit = function() {
}

//----------------------------------------------------------------------

Bitwig.prototype.addObserver = function(type,buffer,x,y,z) {
  switch(type) {
    case OBS_TRACKNAME: break;
    case OBS_SCENENAME: break;
    case OBS_CLIPNAME: break;
  }
}


