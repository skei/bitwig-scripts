/*
  todo:
    investigat initial jump.. macri vs user_ctrl..
    user_ctrl = are not written (ala macro callbacks) before used.. ?
    so they jump when changed for the first time
*/

loadAPI(1);

host.defineController("Edirol", "PCR-300", "1.1", "fb2e8c80-ee90-11e3-ac10-0800200c9a66");
host.addDeviceNameBasedDiscoveryPair(["PCR MIDI","PCR 1","PCR 2"], ["PCR MIDI","PCR 1"]);
host.defineMidiPorts(3,2);

//----------

var _knobs    = 0;  // + 0..7
var _sliders  = 8;  // + 0..7
var _but_top  = 16; // + 0..7
var _but_bot  = 24; // + 0..7
var _knob9    = 32;
var _slider9  = 33;
var _a9       = 34;
var _b9       = 35;
var _xfade    = 36;
var _c1       = 37;
var _c2       = 38;
var _c3       = 39;
var _rewind   = 40;
var _stop     = 41;
var _play     = 42;
var _record   = 43;
var _vlink    = 44;
var _v1       = 45;
var _v2       = 46;
var _v3       = 47;
var _v4       = 48;
var _user     = 49;

var _user_ctrl = _user;

//----------------------------------------------------------------------
// helpers
//----------------------------------------------------------------------

var c1_is_pressed = false;
var c2_is_pressed = false;
var c3_is_pressed = false;

var knob_values  = [];
var macro_values = [];
var ctrl_values  = [];

//----------

function getValueFunc(index,variable) {
  return function(value) {
    variable[index] = value;
  }
}

//----------

function find_control(ctrl,chan) {
  switch (ctrl) {
    case 16:
      return _knobs;
    case 17:
      return _sliders;
    case 18:
      if (chan==0) return _knob9;
      if (chan==1) return _slider9;
      return -1;
    case 19:
      if (chan==0) return _xfade;
      return -1;
    case 80:
      return _but_top;
    case 81:
      return _but_bot;
    case 82:
      if (chan==8)  return _rewind;
      if (chan==13) return _stop;
      if (chan==14) return _play;
      if (chan==10) return _record;
      if (chan==0)  return _c1;
      if (chan==1)  return _c2;
      if (chan==2)  return _c3;
      return -1;
    case 83:
      if (chan==0)  return _a9;
      if (chan==1)  return _b9;
      if (chan==8)  return _vlink;
      if (chan==12) return _v1;
      if (chan==13) return _v2;
      if (chan==14) return _v3;
      if (chan==15) return _v4;
      return -1;
    //default:
    //  return -1;
  }
  return -1;
}

//----------

/*
  index = 0..7
  value = 0..127
  buffer = [0..7]
*/

function scale_knob(index,value,buffer,offset) {
  var io = index + offset;
  var param         = 0;
  var v100          = value * 100;
  var vmax          = 12700; // 12799?
  var knob_prev     = knob_values[index];
  var knob_cur      = v100;
  knob_values[index] = knob_cur;
  if (knob_cur > knob_prev) {
    // up
    var range     = vmax - knob_prev;       // how much we CAN turn up (0..127)
    var diff      = knob_cur - knob_prev;   // how much we DID turn up (0..127)
    var scale     = diff / range;           // % of range we DID turned up (0..1)
    var prange    = vmax - buffer[io];   // how much parameter CAN increase (0..127)
    var change    = (prange*scale);         // how much to DO change (0..127)
    param         = buffer[io] + change; // increase parameter
  } else {
    // down
    var range     = knob_prev;
    var diff      = knob_prev - knob_cur;
    var scale     = diff / range;
    var prange    = buffer[io];
    var change    = (prange*scale);
    param         = buffer[io] - change;
  }
  param = Math.floor(param);
  param = Math.min( Math.max(param,0) ,vmax);
  return param;
}

//----------------------------------------------------------------------
// init
//----------------------------------------------------------------------

function init() {

  for (var i=0; i<8; i++)   macro_values[i] = 0;
  for (var i=0; i<8; i++)   knob_values[i]  = 0;
  for (var i=0; i<128; i++) ctrl_values[i]  = 0;
  
  // 'classes'
  
  application   = host.createApplication();
  //arranger      = host.createArranger();
  transport     = host.createTransport();
  cursorDevice  = host.createCursorDevice();
  cursorTrack   = host.createCursorTrack(0,0);        // num sends,scenes
  tracks        = host.createMainTrackBank(8,0,0);    // num tracks,sends,scenes
  master        = host.createMasterTrack(0);          // num scenes
  primaryDevice = cursorTrack.getPrimaryDevice();

  // midi inputs/outputs
  
  input_0_pcrmidi = host.getMidiInPort(0);
  input_0_pcrmidi.setMidiCallback(onMidi_0);
  input_0_pcrmidi.setSysexCallback(onSysex_0);
  
  input_1_pcr1 = host.getMidiInPort(1);
  input_1_pcr1.createNoteInput("PCR-300");
  //input_1_pcr1.setShouldConsumeEvents(false);
  //input_1_pcr1.assignPolyphonicAftertouchToExpression(0,NoteExpression.TIMBRE_UP,5); // 0=chan
  input_1_pcr1.setMidiCallback(onMidi_1);
  input_1_pcr1.setSysexCallback(onSysex_1);
  
  input_2_pcr2 = host.getMidiInPort(2);
  input_2_pcr2.setMidiCallback(onMidi_2);
  input_2_pcr2.setSysexCallback(onSysex_2);
  
  output_0_pcrmidi = host.getMidiOutPort(0);
  
  output_1_pcr1 = host.getMidiOutPort(1);
	//output_1_pcr1.setShouldSendMidiBeatClock;
	
  // 8 macro knobs
  
  for (var i=0; i<8; i++) {
    macro = primaryDevice.getMacro(i);
    macro.getAmount().setIndication(true);
    macro.getAmount().addValueObserver(12700,getValueFunc(i,macro_values)); // 12800 ??
  }
  
  // 128 user controls
  
  userControls = host.createUserControls(128);
  for (var i=0; i<128; i++) {
  var c = userControls.getControl(i);
    c.setLabel("ctrl"+i);
    c.addValueObserver(12700,getValueFunc(i,ctrl_values)); // 12800 ??
  }

}

//----------------------------------------------------------------------
// exit
//----------------------------------------------------------------------

function exit() {
}

//----------------------------------------------------------------------
// onMidi
//----------------------------------------------------------------------

// PCR MIDI

function onMidi_0(status, data1, data2) {
}

//----------

// PCR 1

function onMidi_1(status, data1, data2) {
}

//----------

// PCR 2 (hardcoded to pcr-300 control map #0)

function onMidi_2(status,data1,data2) {
  var chan    = MIDIChannel(status); // status & 0xF
  var ch8 = chan & 0x07;
  var ctrl    = data1;
  var value   = data2;
  var pressed = (value>=64);
  if (isChannelController(status)) {
    var control = find_control(ctrl,chan);
    switch (control) {
    
      case _knobs:
        if (c1_is_pressed) {
          var param = scale_knob(ch8,value,ctrl_values,0);
          ctrl_values[ch8] = param;
          userControls.getControl(_user_ctrl+ch8).set(param,12700);
        }
        else if (c2_is_pressed) {
          var param = scale_knob(ch8,value,ctrl_values,8);
          ctrl_values[ch8+8] = param;
          userControls.getControl(_user_ctrl+8+ch8).set(param,12700);
        }
        else if (c3_is_pressed) {
          var param = scale_knob(ch8,value,ctrl_values,16);
          ctrl_values[ch8+16] = param;
          userControls.getControl(_user_ctrl+16+ch8).set(param,12700);
        }
        else {
          var param = scale_knob(ch8,value,macro_values,0);
          primaryDevice.getMacro(ch8).getAmount().set(param,12700); // 12799?
        }
        break;
        
      case _knob9:
        userControls.getControl(_knob9).set(value,128);
        break;
        
      case _but_top:
        if (c1_is_pressed) {
          ctrl_values[ch8+24] = param;
          userControls.getControl(_user_ctrl+24+ch8).set(value,127);
        }
        else if (c2_is_pressed) {
          ctrl_values[ch8+32] = param;
          userControls.getControl(_user_ctrl+32+ch8).set(value,127);
        }
        else if (c3_is_pressed) {
          ctrl_values[ch8+40] = param;
          userControls.getControl(_user_ctrl+40+ch8).set(value,127);
        }
        else {
          if (pressed) tracks.getTrack(ch8).select();
        }
        break;
        
      case _a9:
        if (pressed) master.select();
        break;

      case _but_bot:
      
        if (c1_is_pressed) {
          ctrl_values[ch8+48] = param;
          userControls.getControl(_user_ctrl+48+ch8).set(value,127);
        }
        else if (c2_is_pressed) {
          ctrl_values[ch8+56] = param;
          userControls.getControl(_user_ctrl+56+ch8).set(value,127);
        }
        else if (c3_is_pressed) {
          ctrl_values[ch8+64] = param;
          userControls.getControl(_user_ctrl+64+ch8).set(value,127);
        }
        else {
          switch (ch8) {
            case 0:
              if (pressed) cursorTrack.getMute().toggle();
              break;
            case 1:
              if (pressed) cursorTrack.getSolo().toggle();
              break;
            case 2:
              if (pressed) cursorTrack.getArm().toggle();
              break;
            case 3:
              if (pressed) cursorTrack.stop();
              break;
            case 4:
              if (pressed) cursorTrack.returnToArrangement();
              break;
            default:
              userControls.getControl(_but_bot+ch8).set(value,128);
              break;
          }
        }
        break;
        
      case _b9:
        if (pressed) application.nextPerspective();
        break;
        
      case _xfade:
        userControls.getControl(_xfade).set(value,128);
        break;
        
      case _c1:
        c1_is_pressed = pressed;
        break;
        
      case _c2:
        c2_is_pressed = pressed;
        break;
        
      case _c3:
        c3_is_pressed = pressed;
        break;
        
      case _sliders:
        tracks.getTrack(ch8).getVolume().set(value,128);
        break;
        
      case _slider9:
        master.getVolume().set(value,128);
        break;
        
      case _vlink:
        if (value>=64) primaryDevice.switchToPreviousPreset();
        else  primaryDevice.switchToNextPreset();
        break;
        
      case _v1:
        userControls.getControl(_v1).set(value,128);
        break;
        
      case _v2:
        userControls.getControl(_v2).set(value,128);
        break;
        
      case _v3:
        userControls.getControl(_v3).set(value,128);
        break;
        
      case _v4:
        userControls.getControl(_v4).set(value,128);
        break;
        
      case _rewind:
        if (pressed) transport.rewind();
        break;
        
      case _stop:
        if (pressed) transport.stop();
        break;
        
      case _play:
        if (pressed) transport.play();
        break;
        
      case _record:
        if (pressed) transport.record();
        break;
        
      default:
        break;        

    }
  } // isChannelController
}

//----------------------------------------------------------------------
// onSysex
//----------------------------------------------------------------------

function onSysex_0(data) {
}

//----------

function onSysex_1(data) {
}

//----------

function onSysex_2(data) {
}

//----------------------------------------------------------------------

// http://www.famkruithof.net/uuid/uuidgen

