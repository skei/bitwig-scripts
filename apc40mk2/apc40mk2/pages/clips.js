
clipsPage = function(name) {
  Page.call(this,name);
}

//----------

clipsPage.prototype = Object.create(Page.prototype);
clipsPage.prototype.constructor = clipsPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//clipsPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//clipsPage.prototype.exit = function() {
//}

//----------

clipsPage.prototype.select = function() {
  //println("clipsPage.select");
  this.updateGrid();
  //this.updateSceneLaunch();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

clipsPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if (msg == MIDI_NOTE_ON) {
    if (pressed) {
      switch (control.id) {
        case BUTTON_GRID:
          var i = control.index;
          var x = controller.gridX(i);
          var y = controller.gridY(i);
          if (controller.shiftbank_pressed) {
            bitwig.deleteClip(x,y);
          }
          else if (controller.shift_pressed) {
            bitwig.selectClip(x,y);
            bitwig.copy();
          }
          else if (controller.bank_pressed) {
            bitwig.selectClip(x,y);
            bitwig.paste();
          }
          else {
            bitwig.launchClip(x,y);
          }
        case BUTTON_ARROW_UP:
          if (pressed) {
            bitwig.scrollGrid(UP,controller.shift_pressed);
          }
          break;
        case BUTTON_ARROW_DOWN:
          if (pressed) {
            bitwig.scrollGrid(DOWN,controller.shift_pressed);
          }
          break;
        case BUTTON_ARROW_LEFT:
          if (pressed) {
            bitwig.scrollGrid(LEFT,controller.shift_pressed);
          }
          break;
        case BUTTON_ARROW_RIGHT:
          if (pressed) {
            bitwig.scrollGrid(RIGHT,controller.shift_pressed);
          }
          break;
      }
    }
  }
}

//----------

clipsPage.prototype.onObserver = function(obs,value,x,y) {
  switch (obs & 0xff00) {
    case OBS_CLIP:
      this.updateClip(x,y);
      break;
    //case OBS_SCENE:
    //  this.updateSceneLaunch();
    //  break;
  }
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

// see Page
clipsPage.prototype.updateClip = function(x,y) {
  this.updateClipColor(x,y,x,y);
}

//----------

clipsPage.prototype.updateTrack = function(track) {
  if (bitwig.obs_track_exists[track]) {
    //println("track exists " + track);
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  }
  else {
    for (var i=0; i<NUM_SCENES; i++) {
      var index = controller.gridIndex(track,i);
      control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+index);
      controller.queueControl(control,LED_OFF);
    }
  }
}

//----------

clipsPage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

//----------

/*
clipsPage.prototype.updateSceneLaunch = function() {
  if (use_global_selector) return;
  var control = null;
  var color = LED_OFF;
  for (var i=0; i<NUM_SCENES; i++) {
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_SCENE_LAUNCH+i);
    color = bitwig.obs_scene_color[i];
    controller.queueControl(control,color);
  }
}
*/

