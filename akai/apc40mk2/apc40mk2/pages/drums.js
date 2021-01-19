
drumsPage = function(name) {
  Page.call(this,name);
  
  this.state = [
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false
  ];
  
  this.color_off = [
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,
    LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,
    LED_YELLOW, LED_YELLOW, LED_OFF,    LED_OFF,    LED_YELLOW, LED_YELLOW, LED_OFF,    LED_OFF
  ];
  
  this.color_off_press = [
    LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  
    LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  
    LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  
    LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_BLUE,   LED_WHITE,  LED_WHITE,  LED_WHITE,  LED_WHITE,  
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
    36, 37, 38, 39, 36, 37, 38, 39,
    40, 41, 42, 43, 40, 41, 42, 43,
    44, 45, 46, 47, 44, 45, 46, 47,
    48, 49, 50, 51, 48, 49, 50, 51,
    0,  0,  0,  0,  0,  0,  0,  0
  ];

}

//----------

drumsPage.prototype = Object.create(Page.prototype);
drumsPage.prototype.constructor = drumsPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//drumsPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//drumsPage.prototype.exit = function() {
//}

//----------

drumsPage.prototype.select = function() {
  //println("drumsPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

drumsPage.prototype.onControl = function(control,msg,chn,data1,data2) {
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
          if (x >= 4) note += (this.octave2*16); // right
          else note += (this.octave1*16);        // left
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

drumsPage.prototype.onObserver = function(obs,value,x,y) {
  //println("drumsPage.onObserver " + obs + " " + value + " " + x + "," + y);
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

drumsPage.prototype.updateClip = function(x,y) {
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

drumsPage.prototype.updateTrack = function(track) {
  //if (bitwig.obs_track_exists[track]) {
    for (var i=0; i<NUM_SCENES; i++) {
      this.updateClip(track,i);
    }
  //}
}

//----------

drumsPage.prototype.updateGrid = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

