
performPage = function(name) {
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
    LED_WHITE,  LED_YELLOW, LED_ORANGE, LED_OFF,    LED_CYAN,   LED_BLUE,   LED_PURPLE, LED_PINK,
    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_RED,    LED_ORANGE, LED_YELLOW, LED_GREEN,
    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,
    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,    LED_OFF,
    LED_RED,    LED_ORANGE, LED_YELLOW, LED_GREEN,  LED_CYAN,   LED_BLUE,   LED_PURPLE, LED_PINK
  ];
  
  this.color_off_press = [
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED
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

performPage.prototype = Object.create(Page.prototype);
performPage.prototype.constructor = performPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//performPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//performPage.prototype.exit = function() {
//}

//----------

performPage.prototype.select = function() {
  //println("performPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

performPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if ((msg == MIDI_NOTE_ON) || (msg == MIDI_NOTE_OFF)) {
    if (control.id == BUTTON_GRID) {
      var i = control.index;
      var x = controller.gridX(i);
      var y = controller.gridY(i);
      //println("notesPage.onControl/BUTTON_GRID " + x + "," + y + " = " + pressed);
      
      var v = (pressed) ? 0 : 1;

      // top row (8)

      if (y == 0) {
        switch (controller.pansendsuser_mode) {
          case 0:
            if (controller.shift_pressed) { if (pressed) bitwig.resetTrackPan(x); }
            else bitwig.setTrackPan(x,v);
            break;
          case 1:
            if (controller.shift_pressed) { if (pressed) bitwig.resetTrackSend(x,controller.sends_mode); }
            else bitwig.setTrackSend(x,controller.sends_mode,v);
            break;
          case 2:
            var i2 = (controller.user_mode * NUM_TRACKS) + x + USER_CTRL_TRACK;
            if (controller.shift_pressed) { if (pressed) bitwig.resetUserControl(i2); }
            else bitwig.setUserControl(i2, v);
            break;
        }
      }
      
      // bottom right (2*4)
      
      else if ((x >= 4) && (y >= 3)) {
        var idx = (x - 4);
        if (y == 4) idx += 4;
        if (controller.shift_pressed) { if (pressed) bitwig.resetRemoteControl(idx); }
        else bitwig.setRemoteControl(idx,v);
      }
      
      //if ((pressed) && (this.toggle[i])) {
      //  if (this.state[i]) this.state[i] = false;
      //  else this.state[i] = true;
      //}

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

performPage.prototype.onObserver = function(obs,value,x,y) {
  //println("performPage.onObserver " + obs + " " + value + " " + x + "," + y);
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

performPage.prototype.updateClip = function(x,y) {
  var control = null;
  var color = LED_OFF;
  var i = controller.gridIndex(x,y);
  if (this.state[i]) {
    /*if (pressed) color = this.color_on_press[i];
    else*/ color = this.color_on[i];
  }
  else {
    /*if (pressed) color = this.color_off_press[i];
    else*/ color = this.color_off[i];
  }
  var i = controller.gridIndex(x,y);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
  controller.queueControl(control,color);
 //controller.queueControl2(control,color,mode2,color2);
}

//----------

performPage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}

//----------

performPage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

