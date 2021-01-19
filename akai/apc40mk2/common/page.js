
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Page = function(name) {
  this.name = name;
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//Page.prototype.init = function() {
//}

//----------

//Page.prototype.exit = function() {
//}

//----------

Page.prototype.select = function() {
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Page.prototype.onControl = function(control,msg,chn,data1,data2) {
  //println("page.onControl " + control.id + " " + control.index + " " + data2);
}

//----------

Page.prototype.onObserver = function(obs,val,x,y) {
  //println("page.onObserver " + obs + " " + val + " " + x + " " + y);
}

Page.prototype.onLongpress = function(control) {
  //println("Page.onLongpress " + control.id + "," + control.index);
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Page.prototype.clearGrid = function() {
  for (var y=0; y<NUM_SCENES; y++) {
    for (var x=0; x<NUM_TRACKS; x++) {
      var i = controller.gridIndex(x,y);
      var control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
      var color = LED_OFF;
      controller.queueControl(control,color);
    }
  }
}

//----------

Page.prototype.clearTrack = function(x) {
  for (var y=0; y<NUM_SCENES; y++) {
    var i = controller.gridIndex(x,y);
    var control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
    var color = LED_OFF;
    controller.queueControl(control,color);
  }
}

//----------

//Page.prototype.clearSceneLaunch = function() {
//  for (var y=0; y<NUM_SCENES; y++) {
//    var control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_SCENE_LAUNCH+y);
//    var color = LED_OFF;
//    controller.queueControl(control,color);
//  }
//}

//----------

Page.prototype.updateClipColor = function(x,y,dx,dy) {
  var control = null;
  var color = LED_OFF;
  var color2 = LED_OFF;
  var mode2 = LED_PRIMARY;
  var i = controller.gridIndex(x,y);
  if (bitwig.obs_clip_has_content[i]) {
    color = bitwig.obs_clip_color[i];
    if (bitwig.obs_clip_playing[i]) {
      mode2 = LED_PULSING4;
      color2 = LED_GREEN;
      if (bitwig.obs_clip_queued_record[i]) color2 = LED_RED;
      if (bitwig.obs_clip_queued_stop[i])   color2 = LED_OFF;
    }
    if (bitwig.obs_clip_recording[i]) {
      mode2 = LED_PULSING4;
      color2 = LED_RED;
      if (bitwig.obs_clip_queued_play[i])   color = LED_GREEN;
      if (bitwig.obs_clip_queued_stop[i])   color = LED_OFF;
    }
  }
  else {
    color = LED_OFF;
  }
  var di = controller.gridIndex(dx,dy);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+di);
  //controller.queueControl(control,color);
  controller.queueControl2(control,color,mode2,color2);
  
}


//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//Page.prototype.updateSceneLaunch = function() {
//  if (!use_global_selector) this.clearSceneLaunch();
//}

//----------

Page.prototype.updateGrid = function() {
  this.clearGrid();
}

