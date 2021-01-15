
scenesPage = function(name) {
  Page.call(this,name);
  this.lastTriggeredScene = -1;
}

//----------

scenesPage.prototype = Object.create(Page.prototype);
scenesPage.prototype.constructor = scenesPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//scenesPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//scenesPage.prototype.exit = function() {
//}

//----------

scenesPage.prototype.select = function() {
  //println("scenesPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

scenesPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if (pressed) {
    if (msg == MIDI_NOTE_ON) {
      //if (control.id == BUTTON_GRID) {
      switch (control.id) {
        case BUTTON_GRID:
          var i = control.index;
          var x = controller.gridX(i);
          var y = controller.gridY(i);
          //println("scenesPage.onControl/BUTTON_GRID " + x + "," + y + " = " + pressed);
          var scene = (x * NUM_SCENES) + y;      
          this.lastTriggeredScene = scene;
          bitwig.launchScene2(scene);
          this.updateGrid();
          break;
        case BUTTON_ARROW_UP:
          bitwig.scrollScenes(UP,controller.shift_pressed);
          break;
        case BUTTON_ARROW_DOWN:
          bitwig.scrollScenes(DOWN,controller.shift_pressed);
          break;
        case BUTTON_ARROW_LEFT:
          for (var j=0; j<NUM_SCENES; j++) bitwig.scrollScenes(UP,false);
          break;
        case BUTTON_ARROW_RIGHT:
          for (var j=0; j<NUM_SCENES; j++) bitwig.scrollScenes(DOWN,false);
          break;
      }
      
    }
  }
}

//----------

scenesPage.prototype.onObserver = function(obs,value,x,y) {
  //println("scenesPage.onObserver " + obs + " " + value + " " + x + "," + y);
  switch (obs & 0xff00) {
    case OBS_SCENE:
      this.updateGrid();
      break;
  }
  
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

/*
scenesPage.prototype.updateClip = function(x,y) {
  var control = null;
  var color = LED_OFF;
  var i = controller.gridIndex(x,y);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
  controller.queueControl(control,color);
 //controller.queueControl2(control,color,mode2,color2);
}
*/

//----------

/*
scenesPage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}
*/

//----------

scenesPage.prototype.updateGrid = function() {
  //println("scenesPage.updateGrid");
  for (var x=0; x<NUM_TRACKS; x++) {
    for (var y=0; y<NUM_SCENES; y++) {
      var i = (x * NUM_SCENES) + y;
      
      var index = controller.gridIndex(x,y);
      control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+index);

      var color = bitwig.obs_scene_color[i];
      var color2 = LED_OFF;
      var mode2 = LED_PULSING4;
      
      if (i == this.lastTriggeredScene) {
        controller.queueControl2(control,color2,mode2,color);
      }
      else {
        controller.queueControl(control,color);
      }
      
      
    }
  }
}

