
Controller = function() {

  this.controls         = []
  this.noteToControl    = initArray(null,128*16);
  this.ccToControl      = initArray(null,128*16);
  this.pages            = [];
  this.page             = null;
  this.globalPage       = null;
  this.updatedControls  = [];
  this.selected_track   = -1;
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

Controller.prototype.init = function() {}
Controller.prototype.exit = function() {}

//----------

Controller.prototype.flush = function() {
  var num = this.updatedControls.length;
  for (var i=0; i<num; i++) {
    var control = this.updatedControls[i];
    control.flush();
  }
  this.updatedControls.length = 0;
}

//----------------------------------------------------------------------
//
// callbacks
//
//----------------------------------------------------------------------

Controller.prototype.onMidi = function(status,data1,data2) {

  var msg = status & 0xf0;
  var chn = status & 0x0f;
  var index = (chn * 128) + data1;
  var control = null;
  
  switch (msg) {
    case MIDI_NOTE_OFF:
      control = controller.noteToControl[index];
      if (control) controller.timestampRelease(control);
      data2 = 0;
      break;
    case MIDI_NOTE_ON:
      control = controller.noteToControl[index];
      if (data2 == 0) {
        msg = MIDI_NODE_OFF;
        if (control) controller.timestampRelease(control);
      }
      else {
        if (control) controller.timestampPress(control,LONGPRESS_TIME);
      }
      break;
    case MIDI_CTRL_CHANGE:
      control = controller.ccToControl[index];    
      if (control) {
        // hack?
        if ((controller.shift_pressed) && (controller.bank_pressed)) {
          control.timestamp = 0;
        }
        else {
          controller.timestamp(control);
        }
      }
      //if (control.type == CTRL_KNOB_REL) {
      //  if (data2 > 63) data2 -= 128;
      //}
      break;
  }
  
  if (control) {
    if (controller.page) controller.page.onControl(control,msg,chn,data1,data2);
    if (controller.global_page) controller.global_page.onControl(control,msg,chn,data1,data2);
  }
  
}

//----------

Controller.prototype.onSysex = function(data) {
  printSysex(data);
}

//----------

Controller.prototype.onObserver = function(obs,value,x,y) {
  if (controller.page) controller.page.onObserver(obs,value,x,y);
  if (controller.global_page) controller.global_page.onObserver(obs,value,x,y);
}

//----------

Controller.prototype.onLongpress = function(control) {
  if (controller.page) controller.page.onLongpress(control);
  if (controller.global_page) controller.global_page.onLongpress(control);
}

//----------------------------------------------------------------------
//
// controls
//
//----------------------------------------------------------------------

Controller.prototype.addControl = function(control) {
  var index = (control.midi_chn * 128) + control.midi_idx
  this.controls.push(control);
  if (control.midi_msg == MIDI_CTRL_CHANGE) this.ccToControl[index] = control;
  else this.noteToControl[index] = control;
  return this.controls.length - 1;
}

//----------

Controller.prototype.getControl = function(midimsg,midichan,midiindex) {
  var index = (midichan * 128) + midiindex;
  if (midimsg == MIDI_CTRL_CHANGE) return this.ccToControl[index];
  else return this.noteToControl[index];
  return null;
}

//----------

Controller.prototype.queueControl = function(control,value) {
  control.pending = value;
  control.pending2 = LED_OFF;
  control.mode2 = LED_PRIMARY;
  this.updatedControls.push(control);
}

//----------

Controller.prototype.queueControl2 = function(control,value,mode2,value2) {
  control.pending   = value;
  control.pending2  = value2;
  control.mode2     = mode2;
  this.updatedControls.push(control);
}

//----------------------------------------------------------------------
//
// lights
//
//----------------------------------------------------------------------

Controller.prototype.setLight         = function(index,color) {}
Controller.prototype.setLight2        = function(index,color,mode,color2) {}
Controller.prototype.setLightChan     = function(index,chan,color) {}
Controller.prototype.setLedring       = function(index,value) {}
Controller.prototype.setLedringMode   = function(index,mode) {}

//----------

Controller.prototype.clearLights = function(control,value) {
  var num = this.controls.length;
  for (var i=0; i<num; i++) {
    var control = this.controls[i];
    if (control) {
      control.value = 0;
      control.pending = 0;
      control.value2 = 0;
      control.pending2 = 0;
      control.mode2 = 0; // LED_PRIMARY;
      switch (control.type) {
        case LED_COLOR:
        case LED_COLOR2:
          controller.setLightChan(control.midi_idx,control.midi_chn,0);
          break;
        case LED_RING:
          controller.setLedring(control.midi_idx,0);
          break;
      }
    }
  }
  host.requestFlush();
}

//----------

Controller.prototype.drawBitwigLogo = function() {
  for (var i=0; i<NUM_CLIPS; i++) {
    var color = LED_OFF;
    if (BITWIG_LOGO[i] == 1) color = LED_ORANGE;
    else color = LED_OFF;
    var control = this.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
    controller.queueControl(control,color);
  }
  host.requestFlush();
}

//----------------------------------------------------------------------
//
// timestamp
//
//----------------------------------------------------------------------

Controller.prototype.timestamp = function(control) {
  if (control) {
    control.timestamp = new Date().getTime();
  }
}

//----------

Controller.prototype.timestampElapsed = function(control,ms) {
  if (control) {
    var elapsed = new Date().getTime() - control.timestamp;
    if (elapsed >= ms) return true;
    else return false;
  }
  return true;
}

//----------

Controller.prototype.timestampPress = function(control,ms) {
  if (control) {
    control.timestamp = new Date().getTime();
    control.state = BUTTON_PRESSED;
    // this will cause a flush when timed out?
    host.scheduleTask(this.timestampCallback,[control],ms);
  }
}

//----------

Controller.prototype.timestampRelease = function(control) {
  if (control) {
    control.timestamp = 0;
    control.state = BUTTON_OFF;
  }
}

//----------

Controller.prototype.timestampCallback = function(control) {
  if (control.state == BUTTON_PRESSED) {
    control.state = BUTTON_LONGPRESS;
    controller.onLongpress(control);
  }
}

//----------------------------------------------------------------------
//
// pages
//
//----------------------------------------------------------------------

Controller.prototype.addPage = function(page) {
  this.pages.push(page);
}

//----------

Controller.prototype.selectPage = function(index) {
  if (index < this.pages.length) {
    this.page = this.pages[index];
    this.page.select();
  }
}

//----------------------------------------------------------------------
//
// utils (grid)
//
//----------------------------------------------------------------------

Controller.prototype.gridX = function(index) {
  var x = index % NUM_TRACKS;
  return x;
}

//----------

Controller.prototype.gridY = function(index) {
  var y = index >> 3;
  y = (NUM_SCENES - 1) - y;
  return y;
}

//----------

Controller.prototype.gridIndex = function(x,y) {
  var yy = (NUM_SCENES - 1) - y;
  var index = (yy * NUM_TRACKS) + x;
  return index;
}


