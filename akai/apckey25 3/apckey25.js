/*
  apc key 25 sends notes on midi channel 2 (0x01), cc on channel 1 (0x00)
*/


/*
_page_clips.prototype = new _page();
_page_clips.prototype.constructor = _page_clips;
Page.prototype.init.call(this);
*/

load("apckey25_lights.js");
load("widget.js");

load("page.js");
load("page_base.js");


//----------------------------------------------------------------------

/*
const BUTTON_NONE     = 0;
const BUTTON_GRID     = 1;
const BUTTON_PAGE     = 2;
const BUTTON_ARROW    = 3;
const BUTTON_MODE     = 4;
const BUTTON_STOP     = 5;
const BUTTON_SHIFT    = 6;
const BUTTON_SUSTAIN  = 7;
const BUTTON_PLAY     = 8;
const BUTTON_REC      = 9;
*/

//----------------------------------------------------------------------

function Controller() {
  apckey25_clear_lights();
  apckey25_flush_lights();
  this.midiinput = null;
  //this.noteinput0 = null;
  this.noteinput1 = null;
  this.noteinput2 = null;
  this.pages = initArray(null,5);
  this.page = null;
};

//----------------------------------------------------------------------

Controller.prototype.init = function() {
  //println("Controller.init");
  
  this.midiinput = host.getMidiInPort(0);
  this.midiinput.setMidiCallback(this.on_midi);
  //this.noteinput0 = this.midiinput.createNoteInput( "0 buttons", "80????", "90????" );  // buttons
  this.noteinput1 = this.midiinput.createNoteInput( "1 notes",   "81????", "91????" );  // notes
  this.noteinput2 = this.midiinput.createNoteInput( "2 user",    "8f????", "9f????" );  // xtra
  this.noteinput1.setShouldConsumeEvents(true);
  
  //bitwig.addObserver( OBS_TRACKNAME,  this.track_names, x );
  //bitwig.addObserver( OBS_SCENENAME,  this.scene_names, y );
  //bitwig.addObserver( OBS_CLIPNAME,   this.clip_names,  x, y );
  
  this.pages[0] = new Page_Base("default",PAGE_MODE_SWITCH);
  this.page = this.pages[0];
  this.page.select();
  this.flush();
}

//----------

Controller.prototype.exit = function() {
  apckey25_clear_lights();
  apckey25_flush_lights();
}

//----------

Controller.prototype.flush = function() {
  apckey25_flush_lights();
}

//----------------------------------------------------------------------

Controller.prototype.on_midi = function(status,data1,data2) {
  //printMidi(status,data1,data2);
  var self    = this;
  var event   = status >> 4;
  var channel = status & 0x0f;
  var index   = data1; // & 0x7f;
  var value   = data2; // & 0x7f;
  //println("midi event " + event + " channel " + channel + " index " + index + " value " + value);
  switch(event) {
    case 8: // note off
      //Controller.prototype.handleButton.call(self,index,false);
      controller.handleButton(index,false); // this. = cannot find .handleButton
      break;
    case 9: // note on
      controller.handleButton(index,true);
      break;
    case 11: // ctrl change
      // sustain button
      if (index==64) controller.handleButton(128,(value>63)?true:false);
      
      // knob
      else controller.handleKnob(index,value);
      break;
  }
}

//----------------------------------------------------------------------

Controller.prototype.handleKnob = function(/*self,*/index,value) {
  var i = index - 48;
  controller.page.handleKnob(i,value);
}

//----------

Controller.prototype.handleButton = function(/*self,*/index,press) {
  if ((index>=0) && (index<=39)) {
    var x = index & 7;
    var y = 4 - (index >> 3);
    controller.page.handleGridButton(x,y,press);
    return;
  }
  if ((index>=64) && (index<=67)) {
    var x = index - 64;
    controller.page.handleArrowButton(x,press);
    return;
  }
  if ((index>=68) && (index<=71)) {
    var x = index - 68;
    controller.page.handleModeButton(x,press);
    return;
  }
  if ((index>=82) && (index<=86)) {
    var y = index - 82;
    controller.page.handlePageButton(y,press);
    return;
  }
  if (index==81) {
    controller.page.handleStopAllButton(press);
    return;
  }
  if (index==98) {
    controller.page.handleShiftButton(press);
    return;
  }
  if (index==91) {
    controller.page.handlePlayButton(press);
    return;
  }
  if (index==93) {
    controller.page.handleRecButton(press);
    return;
  }
  if (index==128) {
    controller.page.handleSustainButton(press);
    return;
  }
}

//----------------------------------------------------------------------


