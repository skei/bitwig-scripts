
devicePage = function(name) {
  Page.call(this,name);
}

//----------

devicePage.prototype = Object.create(Page.prototype);
devicePage.prototype.constructor = devicePage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//devicePage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//devicePage.prototype.exit = function() {
//}

//----------

devicePage.prototype.select = function() {
  //println("devicePage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

devicePage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if (msg == MIDI_NOTE_ON) {
    if (control.id == BUTTON_GRID) {
      var i = control.index;
      var x = controller.gridX(i);
      var y = controller.gridY(i);
      //println("devicePage.onControl/BUTTON_GRID " + x + "," + y + " = " + pressed);
      //..
    }
  }
}

//----------

devicePage.prototype.onObserver = function(obs,value,x,y) {
  //println("devicePage.onObserver " + obs + " " + value + " " + x + "," + y);
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

devicePage.prototype.updateClip = function(x,y) {
  var control = null;
  var color = LED_OFF;
  var i = controller.gridIndex(x,y);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
  controller.queueControl(control,color);
 //controller.queueControl2(control,color,mode2,color2);
}

//----------

devicePage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}

//----------

devicePage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

