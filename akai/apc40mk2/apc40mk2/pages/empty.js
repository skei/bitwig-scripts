
emptyPage = function(name) {
  Page.call(this,name);
}

//----------

emptyPage.prototype = Object.create(Page.prototype);
emptyPage.prototype.constructor = emptyPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//emptyPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//emptyPage.prototype.exit = function() {
//}

//----------

emptyPage.prototype.select = function() {
  //println("emptyPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

emptyPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if (msg == MIDI_NOTE_ON) {
    if (control.id == BUTTON_GRID) {
      var i = control.index;
      var x = controller.gridX(i);
      var y = controller.gridY(i);
      //println("emptyPage.onControl/BUTTON_GRID " + x + "," + y + " = " + pressed);
      //..
    }
  }
}

//----------

emptyPage.prototype.onObserver = function(obs,value,x,y) {
  //println("emptyPage.onObserver " + obs + " " + value + " " + x + "," + y);
  /*
  switch (obs & 0xff00) {
    case OBS_CLIP:
      this.updateClip(x,y);
      break;
  }
  */
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

emptyPage.prototype.updateClip = function(x,y) {
  var control = null;
  var color = LED_OFF;
  var i = controller.gridIndex(x,y);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
  controller.queueControl(control,color);
 //controller.queueControl2(control,color,mode2,color2);
}

//----------

emptyPage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}

//----------

emptyPage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

