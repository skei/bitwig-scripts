
userctrlPage = function(name) {
  Page.call(this,name);
  
  this.state = [
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false
  ];
  
  this.toggle = [
    true,  true,  true,  true,  true,  true,  true,  true,
    true,  true,  true,  true,  true,  true,  true,  true,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false
  ];
  
  this.color_off = [
    LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,
    LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,   LED_CYAN,
    LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE,
    LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE,
    LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE, LED_PURPLE
  ];
  
  /*
  this.color_off_press = [
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED
  ];
  */
  
  this.color_on = [
    LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW,
    LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW,
    LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW,
    LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW,
    LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW, LED_YELLOW
  ];
  
  /*
  this.color_on_press = [
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,
    LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN,  LED_GREEN
  ];
  */
  
}

//----------

userctrlPage.prototype = Object.create(Page.prototype);
userctrlPage.prototype.constructor = userctrlPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//userctrlPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//userctrlPage.prototype.exit = function() {
//}

//----------

userctrlPage.prototype.select = function() {
  //println("userctrlPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

userctrlPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if ((msg == MIDI_NOTE_ON) || (msg == MIDI_NOTE_OFF)) {
    if (control.id == BUTTON_GRID) {
      var i = control.index;
      var x = controller.gridX(i);
      var y = controller.gridY(i);
      if (this.toggle[i]) {
        if (pressed) {
          if (this.state[i]) this.state[i] = false;
          else this.state[i] = true;
        }
      }
      else {
        this.state[i] = pressed;
      }
      var v = (this.state[i]) ? 1 : 0;
      bitwig.setUserControl( USER_CTRL_PAGE + i, v );
      this.updateClip(x,y);
    }
  }
}

//----------

userctrlPage.prototype.onObserver = function(obs,value,x,y) {
  //println("userctrlPage.onObserver " + obs + " " + value + " " + x + "," + y);
  switch (obs) {
    case OBS_USER_CONTROL:
      //var i = controller.gridIndex(x,y);
      var i = x - USER_CTRL_PAGE;
      var xx = controller.gridX(i);
      var yy = controller.gridY(i);
      //println("i " + i + " xx " + xx + " yy " + yy);
      if (value >= 0.5) this.state[i] = true;
      else this.state[i] = false;
      this.updateClip(xx,yy);
      break;
  }
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

userctrlPage.prototype.updateClip = function(x,y) {
  var control = null;
  var color = LED_OFF;
  var i = controller.gridIndex(x,y);
  if (this.state[i]) color = this.color_on[i];
  else color = this.color_off[i];
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
  //println("control id " + control.id + " i " + i + " color " + color);
  controller.queueControl(control,color);
 //controller.queueControl2(control,color,mode2,color2);
}

//----------

userctrlPage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}

//----------

userctrlPage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

