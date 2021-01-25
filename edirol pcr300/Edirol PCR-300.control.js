
/*
  there's some weird things going on with macro indicators (ring around knobs)..
  sometimes they're not drawn corectly, as if they 'lose connection' or something..
*/

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

// http://www.famkruithof.net/uuid/uuidgen

loadAPI(1);
host.defineController("Edirol", "PCR-300", "1.0", "feea3880-f14f-11e3-ac10-0800200c9a66");
host.addDeviceNameBasedDiscoveryPair(["PCR MIDI","PCR 1","PCR 2"], ["PCR MIDI","PCR 1"]);
host.defineMidiPorts(3,2); // num inputs, outputs

load("pcr300_process.js");

//----------------------------------------------------------------------
// constants
//----------------------------------------------------------------------

var KNOBS         = 0;  // + 0..7
var SLIDERS       = 8;  // + 0..7
var BUTTONS_A     = 16; // + 0..7
var BUTTONS_B     = 24; // + 0..7
var KNOB9         = 32;
var SLIDER9       = 33;
var BUTTON_A9     = 34;
var BUTTON_B9     = 35;
var SLIDER_XFADER = 36;
var BUTTON_C1     = 37;
var BUTTON_C2     = 38;
var BUTTON_C3     = 39;
var BUTTON_REWIND = 40;
var BUTTON_STOP   = 41;
var BUTTON_PLAY   = 42;
var BUTTON_RECORD = 43;
var KNOB_VLINK    = 44;
var BUTTON_V1     = 45;
var BUTTON_V2     = 46;
var BUTTON_V3     = 47;
var BUTTON_V4     = 48;
var NUM_CTRL      = 49;

//----------

var MAX_VALUE     = 128;//65536;
var MAX_MIDI      = 128;
var HALF_MIDI     = 64;

var NUM_TRACKS    = 8;
var NUM_MACROS    = 8;
var NUM_SENDS     = 3;
var NUM_SCENES    = 0;

var MODE_NORMAL   = 0;
var MODE_C1       = 1;
var MODE_C2       = 2;
var MODE_C3       = 3;
var MODE_A9       = 4;
var MODE_B9       = 5;

//----------------------------------------------------------------------
// variables
//----------------------------------------------------------------------

// objects
var application;
var transport;
var tracks;
var master;
var cursorDevice;
var cursorTrack;
var userControls;
var primaryDevice;

//----------

// observers
var macro_values      = []; // 8
var ctrl_values       = []; // NUM_CTRL
var chan_vol_values   = []; // 8
var chan_pan_values   = []; // 8
var chan_s1_values    = []; // 8
var chan_s2_values    = []; // 8
var chan_s3_values    = []; // 8
var master_vol_value  = []; // 1

//----------

// 'internal' control values
var knob_positions    = []; // 8
var slider_positions  = []; // 8
var knob9_position    = []; // 1
var slider9_position  = []; // 1
var xfade_position    = []; // 1

//----------

// state
var shift_c1 = false;
var shift_c2 = false;
var shift_c3 = false;
var shift_a9 = false;
var shift_b9  = false;
var selected_track = 0; // 0-7 = 'regular' tracks, 8 = master

//----------------------------------------------------------------------
// utils
//----------------------------------------------------------------------

function get_observer_value(index,buffer) {
  return function(value) {
    buffer[index] = value;
  }
}

//----------

function find_control(ctrl,chan) {
  switch (ctrl) {
    case 16:
      return KNOBS;
    case 17:
      return SLIDERS;
    case 18:
      if (chan==0) return KNOB9;
      if (chan==1) return SLIDER9;
      return -1;
    case 19:
      if (chan==0) return SLIDER_XFADER;
      return -1;
    case 80:
      return BUTTONS_A;
    case 81:
      return BUTTONS_B;
    case 82:
      if (chan==8)  return BUTTON_REWIND;
      if (chan==13) return BUTTON_STOP;
      if (chan==14) return BUTTON_PLAY;
      if (chan==10) return BUTTON_RECORD;
      if (chan==0)  return BUTTON_C1;
      if (chan==1)  return BUTTON_C2;
      if (chan==2)  return BUTTON_C3;
      return -1;
    case 83:
      if (chan==0)  return BUTTON_A9;
      if (chan==1)  return BUTTON_B9;
      if (chan==8)  return KNOB_VLINK;
      if (chan==12) return BUTTON_V1;
      if (chan==13) return BUTTON_V2;
      if (chan==14) return BUTTON_V3;
      if (chan==15) return BUTTON_V4;
      return -1;
    //default:
    //  return -1;
  }
  return -1;
}

//----------

/*
  knobs & sliders
  knob_index    : knob index
  value_index   : index into value_buffer
  knob_pos      : position of knob
  knob_buffer   : 'current knob position' buffer
  value_buffer  : 'current value' buffer
*/

function scale_value(knob_index,value_index,knob_pos,knob_buffer,value_buffer) {
  var knob_old  = knob_buffer[knob_index];
  var knob_new  = knob_pos;
  var value_old = value_buffer[value_index];
  var value_new = 0;
  if (knob_new > knob_old) {
    // up
    var range   = MAX_VALUE - knob_old;   // how much we CAN turn up
    var diff    = knob_new - knob_old;    // how much we DID turn up
    var scale   = diff / range;           // fraction of range we DID turned up
    var prange  = MAX_VALUE - value_old;  // how much parameter CAN increase
    var change  = (prange*scale);         // how much we WILL change
    value_new   = value_old + change;     // increase parameter
  } else {
    // down
    var range   = knob_old;
    var diff    = knob_old - knob_new;
    var scale   = diff / range;
    var prange  = value_old;
    var change  = (prange*scale);
    value_new   = value_old - change;
  }
  //value_new = Math.floor(value_new);
  value_new = Math.max(value_new,0)
  value_new = Math.min(value_new,MAX_VALUE);
  knob_buffer[knob_index] = knob_new;
  value_buffer[value_index] = value_new;
  return value_new;
}

//----------------------------------------------------------------------
// init
//----------------------------------------------------------------------

/*
  A view is an object which provides a view onto an object in the document of that type.
  It doesn't equate to a single object, instead it will change the object it is assigned to at
  the applications whim, typically because the user changed the selection (cursorTrack),
  or because the script told it to. There are a multitude of views available for various areas
  like transport, application shortcuts, track, track-banks, groove, clip launcher, clip
  content editing.
*/

function init_objects() {
  application   = host.createApplication();
  transport     = host.createTransport();
  userControls  = host.createUserControls(NUM_CTRL);
  tracks        = host.createMainTrackBank(NUM_TRACKS,NUM_SENDS,NUM_SCENES);
  master        = host.createMasterTrack(NUM_SCENES);
  cursorDevice  = host.createCursorDevice();
  cursorTrack   = host.createCursorTrack(NUM_SENDS,NUM_SCENES);
  primaryDevice = cursorTrack.getPrimaryDevice();
}

//----------

/*
  The host interface doesn't provide a means of reading any values from the object it
  provides directly, Instead it provides an asynchronous model where you add an observer
  on values which you are interested in. When adding an observer you supply a callback
  function that you pass as an argument along with other parameters for how the
  observer should work. The callback function will be called with the initial state of the
  value you are observing but also be called whenever the observer value changes.
*/

function init_controls() {
  for (var i=0; i<NUM_MACROS; i++) {
    macro_values[i] = 0;
    var macro = primaryDevice.getMacro(i);
    macro.getAmount().addValueObserver(MAX_VALUE,get_observer_value(i,macro_values));
    macro.getAmount().setIndication(true);    
  }
  for (var i=0; i<NUM_TRACKS; i++) {
    knob_positions[i] = 0;
    slider_positions[i] = 0;
    chan_vol_values[i] = 0;
    chan_pan_values[i] = 0;
    chan_s1_values[i] = 0;
    chan_s2_values[i] = 0;
    chan_s3_values[i] = 0;
    var track = tracks.getTrack(i);
    track.getVolume().addValueObserver(MAX_VALUE,get_observer_value(i,chan_vol_values));
    track.getPan().addValueObserver(MAX_VALUE,get_observer_value(i,chan_pan_values));
    track.getSend(0).addValueObserver(MAX_VALUE,get_observer_value(i,chan_s1_values));
    track.getSend(1).addValueObserver(MAX_VALUE,get_observer_value(i,chan_s2_values));
    track.getSend(2).addValueObserver(MAX_VALUE,get_observer_value(i,chan_s3_values));
  }
  for (var i=0; i<NUM_CTRL; i++) {
    var control = userControls.getControl(i);
    ctrl_values[i] = 0;
    control.addValueObserver(MAX_VALUE,get_observer_value(i,ctrl_values));
    control.setLabel("ctrl"+i);
  }
  master.getVolume().addValueObserver(MAX_VALUE,get_observer_value(i,master_vol_value));  
  master_vol_value[0] = 0;
  knob9_position[0] = 0;
  slider9_position[0] = 0;
  xfade_position[0] = 0;
}

//----------

/*
  In order to use a MIDI controller as a note input device, a note input must be specified. It
  is given a name and a list of MIDI message filters (in hex, with ?? as wildcard). Any MIDI
  messages which match any of the filter strings will be sent directly to the application as
  note input and be excluded from the events being sent to the MIDI callback functions.
  
  If no MIDI filters are provided, a set of defaults will be used for MIDI Channel 1 (0).
  
  noteIn = host.getMidiInPort(0).createNoteInput("ACME Keyboard", "80????", "90????",
  "B001??", "B040??", "D0????", "E0????");  
*/

function init_midi() {
  // input 'PCR MIDI'
  input_0_pcrmidi = host.getMidiInPort(0);
  input_0_pcrmidi.setMidiCallback(onMidi0);
  input_0_pcrmidi.setSysexCallback(onSysex0);
  // input 'PCR 1'
  input_1_pcr1 = host.getMidiInPort(1);
  input_1_pcr1.createNoteInput("PCR-300");
  input_1_pcr1.setMidiCallback(onMidi1);
  input_1_pcr1.setSysexCallback(onSysex1);
  // input 'PCR 2'
  input_2_pcr2 = host.getMidiInPort(2);
  input_2_pcr2.setMidiCallback(onMidi2);
  input_2_pcr2.setSysexCallback(onSysex2);
  // output 'PCR MIDI'
  output_0_pcrmidi = host.getMidiOutPort(0);
  // output 'PCR 1'
  output_1_pcr1 = host.getMidiOutPort(1);
}

//----------------------------------------------------------------------
// midi callbacks
//----------------------------------------------------------------------

function onMidi0(status,data1,data2) {
}

//----------

function onMidi1(status,data1,data2) {
}

//----------

function onMidi2(status,data1,data2) {
  var ctrl    = data1;
  var value   = data2;
  var chan    = MIDIChannel(status);
  var ch8     = chan & 0x07;
  //var pressed = (value>=HALF_MIDI);
  var mode    = MODE_NORMAL;
  if (shift_c1) mode = MODE_C1;
  if (shift_c2) mode = MODE_C2;
  if (shift_c3) mode = MODE_C3;
  if (shift_a9) mode = MODE_A9;
  if (shift_b9) mode = MODE_B9;
  if (isChannelController(status)) {
    var control = find_control(ctrl,chan);
    switch (control) {
      case KNOBS          : process_knobs(mode,ch8,value);     break;
      case KNOB9          : process_knob9(mode,value);         break;
      case BUTTONS_A      : process_buttons_a(mode,ch8,value); break;
      case BUTTON_A9      : process_button_a9(mode,value);     break;
      case BUTTONS_B      : process_buttons_b(mode,ch8,value); break;
      case BUTTON_B9      : process_button_b9(mode,value);     break;
      case SLIDER_XFADER  : process_slider_xfader(mode,value); break;
      case BUTTON_C1      : process_button_c1(mode,value);     break;
      case BUTTON_C2      : process_button_c2(mode,value);     break;
      case BUTTON_C3      : process_button_c3(mode,value);     break;
      case SLIDERS        : process_sliders(mode,ch8,value);   break;
      case SLIDER9        : process_slider9(mode,value);       break;
      case KNOB_VLINK     : process_knob_vlink(mode,value);    break;
      case BUTTON_V1      : process_button_v1(mode,value);     break;
      case BUTTON_V2      : process_button_v2(mode,value);     break;
      case BUTTON_V3      : process_button_v3(mode,value);     break;
      case BUTTON_V4      : process_button_v4(mode,value);     break;
      case BUTTON_REWIND  : process_button_rewind(mode,value); break;
      case BUTTON_STOP    : process_button_stop(mode,value);   break;
      case BUTTON_PLAY    : process_button_play(mode,value);   break;
      case BUTTON_RECORD  : process_button_record(mode,value); break;
    }
  }
}

//----------

function onSysex0(data) {
}

//----------

function onSysex1(data) {
}

//----------

function onSysex2(data) {
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function init() {
  init_objects();
  init_controls();
  init_midi();
}

//----------

function exit() {
}

