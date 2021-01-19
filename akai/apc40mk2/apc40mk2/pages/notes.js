
notesPage = function(name) {
  Page.call(this,name);
  
  this.state = [
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false
  ];
  
  this.color_off = [
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_OFF,    LED_BLUE,   LED_BLUE,   LED_OFF,    LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_OFF,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,
    LED_OFF,    LED_BLUE,   LED_BLUE,   LED_OFF,    LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_OFF,
    LED_YELLOW, LED_YELLOW, LED_OFF,    LED_OFF,    LED_YELLOW, LED_YELLOW, LED_OFF,    LED_OFF
  ];
  
  this.color_off_press = [
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,  LED_RED,
    LED_OFF,    LED_RED,    LED_RED,    LED_OFF,    LED_RED,    LED_RED,    LED_RED,  LED_OFF,
    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,    LED_RED,  LED_RED,
    LED_OFF,    LED_RED,    LED_RED,    LED_OFF,    LED_RED,    LED_RED,    LED_RED,  LED_OFF,
    LED_GREEN,  LED_GREEN,  LED_OFF,    LED_OFF,    LED_GREEN,  LED_GREEN,  LED_OFF,  LED_OFF
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
  
  this.octave1 = 0;
  this.octave2 = 0;
  
  this.notes = [
    36, 38, 40, 41, 43, 45, 47, 48,
    0,  37, 39, 0,  42, 44, 46, 0,  
    36, 38, 40, 41, 43, 45, 47, 48,
    0,  37, 39, 0,  42, 44, 46, 0,  
    0,  0,  0,  0,  0,  0,  0,  0
  ];

}

//----------

notesPage.prototype = Object.create(Page.prototype);
notesPage.prototype.constructor = notesPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//notesPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//notesPage.prototype.exit = function() {
//}

//----------

notesPage.prototype.select = function() {
  //println("notesPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

notesPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if ((msg == MIDI_NOTE_ON) || (msg == MIDI_NOTE_OFF)) {
    if (control.id == BUTTON_GRID) {
      var i = control.index;
      var x = controller.gridX(i);
      var y = controller.gridY(i);
      
      if (y == 0) {
        if (pressed) {
          switch (x) {
            case 0: if (this.octave1 > -4) this.octave1 -= 1; break;
            case 1: if (this.octave1 <  4) this.octave1 += 1; break;
            case 4: if (this.octave2 > -4) this.octave2 -= 1; break;
            case 5: if (this.octave2 <  4) this.octave2 += 1; break;
          }
        }
      }
      else {
        var note = this.notes[i];
        //println("notesPage.onControl/BUTTON_GRID " + x + "," + y + " = " + note);
        if (note != 0) {
          var msg;
          if (pressed) msg = MIDI_NOTE_ON;
          else msg = MIDI_NOTE_OFF;
          if (y >= 3) note += (this.octave1*12); // bottom row
          else note += (this.octave2*12);        // top row
          if ((note >= 0) && (note <= 127)) {
            bitwig.sendMidiEvent(msg,0,note,127);
          }
        }
      }
      
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

    }
  }
}

//----------

notesPage.prototype.onObserver = function(obs,value,x,y) {
  //println("notesPage.onObserver " + obs + " " + value + " " + x + "," + y);
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

notesPage.prototype.updateClip = function(x,y) {
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

notesPage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}

//----------

notesPage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

