
systemPage = function(name) {
  Page.call(this,name);
  
  this.state = [
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false
  ];
  
  this.toggle = [
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false
  ];
  
  this.color_off = [
    LED_ORANGE2,LED_ORANGE2,LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,
    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,
    LED_BLUE,   LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,
    LED_YELLOW, LED_YELLOW, LED_OFF,    LED_OFF,    LED_OFF,    LED_PURPLE, LED_CYAN,   LED_PURPLE,
    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_PURPLE, LED_CYAN,   LED_PURPLE
  ];
  
  this.color_off_press = [
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE
  ];
  
  this.color_on = [
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE
  ];
  
  this.color_on_press = [
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN
  ];
  
}

//----------

systemPage.prototype = Object.create(Page.prototype);
systemPage.prototype.constructor = systemPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//systemPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//systemPage.prototype.exit = function() {
//}

//----------

systemPage.prototype.select = function() {
  //println("systemPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

systemPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if ((msg == MIDI_NOTE_ON) || (msg == MIDI_NOTE_OFF)) {
    if (control.id == BUTTON_GRID) {
      var i = control.index;
      var x = controller.gridX(i);
      var y = controller.gridY(i);
      //println("notesPage.onControl/BUTTON_GRID " + x + "," + y + " = " + pressed);
      //..
      
      if ((pressed) && (this.toggle[i])) {
        if (this.state[i]) this.state[i] = false;
        else this.state[i] = true;
      }
      
      //
      
      if (pressed) {
      
        if (x == 0) {
          if (y == 0) {
            if (bitwig.obs_application_active_engine) bitwig.deactivateEngine();
            else bitwig.activateEngine();
          }            // deactivate engine
          else if (y == 1)  { bitwig.selectPreviousProject(); }
          else if (y == 2)  { bitwig.stop(); }
          else if (y == 4)  { bitwig.undo(); }
        }
        
        else if (x == 1) {
          if (y == 1)  { bitwig.selectNextProject(); }
          else if (y == 4)  { bitwig.redo(); }
        }
        
        if ((y == 0) && (x > 4)) {
          var num = 4;
          switch(x) {
            case 5: num = 3; break;
            case 6: num = 4; break;
            case 7: num = 5; break;
          }
          bitwig.setTimeSigNum(num);
        }
        
        if ((y == 1) && (x > 4)) {
          var denom = 4;
          switch(x) {
            case 5: denom = 2; break;
            case 6: denom = 4; break;
            case 7: denom = 8; break;
          }
          bitwig.setTimeSigDenom(denom); //TODO (needs observer?)
        }
        
      } // pressed
      
      var color = LED_OFF;
      if (this.state[i]) {
        if (pressed) color = this.color_on_press[i];
        else color = this.color_on[i];
      }
      else {
        if (pressed) color = this.color_off_press[i];
        else color = this.color_off[i];
      }
      control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
      controller.queueControl(control,color);
      
      //..
    }
  }
}

//----------

systemPage.prototype.onObserver = function(obs,value,x,y) {
  //println("systemPage.onObserver " + obs + " " + value + " " + x + "," + y);
  switch (obs) {
    case OBS_APPLICATION_ACTIVE_ENGINE:
      this.updateClip(0,0);
      break;
  }
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

systemPage.prototype.updateClip = function(x,y) {
  var control = null;
  var color = LED_OFF;
  var i = controller.gridIndex(x,y);
  
  if ((x == 0) && (y == 0)) {
    //println("controller.obs_application_active_engine = ",controller.obs_application_active_engine);
    if (bitwig.obs_application_active_engine) color = LED_GREEN;
    else color = LED_RED;
    //control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
    //controller.queueControl(control,color);
  }
  else {
  
    if (this.state[i]) {
      /*if (pressed) color = this.color_on_press[i];
      else*/ color = this.color_on[i];
    }
    else {
      /*if (pressed) color = this.color_off_press[i];
      else*/ color = this.color_off[i];
    }
  }
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
  controller.queueControl(control,color);
  //controller.queueControl2(control,color,mode2,color2);

 
}

//----------

systemPage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}

//----------

systemPage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

