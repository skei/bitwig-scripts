
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

const MIDI_NOTE_OFF         = 0x80;
const MIDI_NOTE_ON          = 0x90;
const MIDI_CTRL_CHANGE      = 0xb0;

const UP                    = 0;
const DOWN                  = 1;
const LEFT                  = 2;
const RIGHT                 = 3;

const BUTTON_OFF            = 0;
const BUTTON_PRESSED        = 1;
const BUTTON_LONGPRESS      = 2;

const LONGPRESS_TIME        = 1000; // ms
const BLOCK_UPDATE_TIME     = 250;
const SLIDER_VALUE_SCALE    = 0.7937;
const METRONOME_LEVEL_SCALE = 0.003;
//const TEMPO_SHIFT_SCALE     = 0.01;

const BITWIG_COLORS = [
  1,    // LED_GREY
  2,    // LED_GREY2
  3,    // LED_GREY3
  114,  // LED_WHITE
  10,   // LED_BROWN
  11,   // LED_BROWN2
  45,   // LED_LILAC
  46,   // LED_LILAC2
  49,   // LED_PURPLE
  57,   // LED_PINK
  5,    // LED_RED
  9,    // LED_ORANGE
  13,   // LED_YELLOW
  17,   // LED_LIME
  21,   // LED_GREEN
  29,   // LED_CYAN
  41,   // LED_BLUE
  50,   // LED_PURPLE2
  58,   // LED_PINK2
  6,    // LED_RED2
  10,   // LED_ORANGE2
  14,   // LED_YELLOW2
  18,   // LED_LIME2
  22,   // LED_GREEN2
  30,   // LED_CYAN2
  42    // LED_BLUE2
];

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

const NUM_TRACKS            = 8;
const NUM_SCENES            = 5;
const NUM_CLIPS             = (NUM_TRACKS * NUM_SCENES);
const NUM_SENDS             = 5;
const NUM_REMOTE_CONTROLS   = 8;
const NUM_USER_CONTROLS     = 128;
const NUM_TRACK_ENCODERS    = 8;
const NUM_DEVICE_ENCODERS   = 8;
const NUM_VOLUME_SLIDERS    = 8;
const NUM_PAGES             = (NUM_SCENES * 2);

const USER_CTRL_TRACK       = 0;  // 8*5, track encoders
const USER_CTRL_PAGE        = 40; // 40,  userctrl page grid buttons
const USER_CTRL_TRACKPAGE   = 80; // 5

//----------

// note on/off

const BUTTON_GRID           = 0;    // * 40 (0..39), rgb
const BUTTON_ARM            = 48;   // * 8, ch 0..7, orange
const BUTTON_SOLO           = 49;   // * 8, ch 0..7, blue
const BUTTON_MUTE           = 50;   // * 8, ch 0..7, orange
const BUTTON_TRACK_SELECT   = 51;   // * 8, ch 0..7, orange
const BUTTON_CLIP_STOP      = 52;   // * 8, ch 0..7, orange (0=off, 1=on, 2=blink)
const BUTTON_DEVICE_MINUS   = 58;   // orange
const BUTTON_DEVICE_PLUS    = 59;   //
const BUTTON_BANK_MINUS     = 60;   // orange
const BUTTON_BANK_PLUS      = 61;   //
const BUTTON_DEVICE_ON_OFF  = 62;   // orange
const BUTTON_DEVICE_LOCK    = 63;   // orange
const BUTTON_CLIP_DEV_VIEW  = 64;   // orange
const BUTTON_DETAIL_VIEW    = 65;   // orange
const BUTTON_AB             = 66;   // * 8, ch 0..7, orange/yellow (0=off, 1=yellow, 2=orange)
const BUTTON_MASTER         = 80;   // orange
const BUTTON_STOP_ALL       = 81;   //
const BUTTON_SCENE_LAUNCH   = 82;   // * 5 (82..86), rgb
const BUTTON_PAN            = 87;   // orange
const BUTTON_SENDS          = 88;   // orange
const BUTTON_USER           = 89;   // orange
const BUTTON_METRONOME      = 90;   // orange
const BUTTON_PLAY           = 91;   // green
const BUTTON_RECORD         = 93;   // red
const BUTTON_ARROW_UP       = 94;   //
const BUTTON_ARROW_DOWN     = 95;   //
const BUTTON_ARROW_RIGHT    = 96;   //
const BUTTON_ARROW_LEFT     = 97;   //
const BUTTON_SHIFT          = 98;   //
const BUTTON_TAP_TEMPO      = 99;   //
const BUTTON_NUDGE_MINUS    = 100;  //
const BUTTON_NUDGE_PLUS     = 101;  //
const BUTTON_SESSION        = 102;  // red
const BUTTON_BANK           = 103;  // orange

// ctrl change

const SLIDER_TRACK          = 7;    // * 8, ch 0..7
const ENCODER_TEMPO         = 13;   //
const SLIDER_MASTER         = 14;   //
const SLIDER_CROSSFADE      = 15;   //
const ENCODER_DEVICE        = 16;   // * 8 cc (16..23)
const ENCODER_CUE_LEVEL     = 47;   //
const ENCODER_TRACK         = 48;   // * 8 cc (48..55)

//----------

const LED_GREY              = 1;
const LED_GREY2             = 2;
const LED_GREY3             = 3;
const LED_WHITE             = 114;
const LED_BROWN             = 10;
const LED_BROWN2            = 11;
const LED_LILAC             = 45;
const LED_LILAC2            = 46;
const LED_PURPLE            = 49;
const LED_PINK              = 57;
const LED_RED               = 5;
const LED_ORANGE            = 9;
const LED_YELLOW            = 13;
const LED_LIME              = 17;
const LED_GREEN             = 21;
const LED_CYAN              = 29;
const LED_BLUE              = 41;
const LED_PURPLE2           = 50;
const LED_PINK2             = 58;
const LED_RED2              = 6;
const LED_ORANGE2           = 10;
const LED_YELLOW2           = 14;
const LED_LIME2             = 18;
const LED_GREEN2            = 22;
const LED_CYAN2             = 30;
const LED_BLUE2             = 42;

// secondary color (channel)
// value = 2nd color

const LED_PRIMARY           = 0; // primary color
const LED_ONESHOT24         = 1; // 1/24
const LED_ONESHOT16         = 2; // 1/16
const LED_ONESHOT8          = 3; // 1/8
const LED_ONESHOT4          = 4; // 1/4
const LED_ONESHOT2          = 5; // 1/2
const LED_PULSING24         = 6; // 1/24
const LED_PULSING16         = 7; // 1/16
const LED_PULSING8          = 8; // 1/8
const LED_PULSING4          = 9; // 1/4
const LED_PULSING2          = 10; // 1/2
const LED_BLINKING24        = 11; // 1/24
const LED_BLINKING16        = 12; // 1/16
const LED_BLINKING8         = 13; // 1/8
const LED_BLINKING4         = 14; // 1/4
const LED_BLINKING2         = 15; // 1/2

const LED_OFF               = 0;
const LED_ON                = 1;
const LED_BLINK             = 2;  // 1/8
const LED_A                 = 1;
const LED_B                 = 2;

const LEDRING_OFF           = 0;
const LEDRING_SINGLE        = 1;
const LEDRING_VOLUME        = 2;
const LEDRING_PAN           = 3;

const LED_NONE              = 0;
const LED_COLOR             = 1;
const LED_COLOR2            = 2;
const LED_RING              = 3;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

load("../bitwig/bitwig.js");

load("../common/control.js");
load("../common/selector.js");
load("../common/controller.js");
load("../common/page.js");

load("pages/global.js");
load("pages/empty.js");
load("pages/clips.js");
load("pages/scenes.js");
load("pages/track.js");
//load("pages/device.js");
load("pages/notes.js");
load("pages/drums.js");
load("pages/perform.js");
load("pages/userctrl.js");
load("pages/system.js");

load("selectors/options.js");
load("selectors/pages.js");
load("selectors/pan.js");
load("selectors/sends.js");
load("selectors/user.js");

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Apc40mk2 = function(name) {
  Controller.call(this,name);
  
  this.global_page        = null;
  
  this.shift_selector     = null;
  this.bank_selector      = null;
  this.bankshift_selector = null;
  this.shiftbank_selector = null;
  this.pan_selector       = null;
  this.sends_selector     = null;
  this.user_selector      = null;
  this.global_selector    = null;

  this.shift_pressed      = false;
  this.bank_pressed       = false;
  this.shiftbank_pressed  = false;
  this.pan_pressed        = false;
  this.sends_pressed      = false;
  this.user_pressed       = false;
  this.metronome_pressed  = false;

  this.global_mode        = 0;
  this.shift_mode         = 0;
  this.bank_mode          = 0;
  this.shiftbank_mode     = 0;
  this.pan_mode           = 0;
  this.sends_mode         = 0;
  this.user_mode          = 0;
  this.pansendsuser_mode  = 0;

  this.global_mode_alt    = initArray(false,NUM_SCENES);
  this.shift_mode_alt     = initArray(false,NUM_SCENES);
  this.bank_mode_alt      = initArray(false,NUM_SCENES);
  this.shiftbank_mode_alt = initArray(false,NUM_SCENES);
  this.pan_mode_alt       = initArray(false,NUM_SCENES);
  this.sends_mode_alt     = initArray(false,NUM_SCENES);
  this.user_mode_alt      = initArray(false,NUM_SCENES);
  
}

//----------

Apc40mk2.prototype = Object.create(Controller.prototype);
Apc40mk2.prototype.constructor = Apc40mk2;

//----------------------------------------------------------------------
//
// initialization
//
//----------------------------------------------------------------------

Apc40mk2.prototype.init = function() {
  //Controller.prototype.init.call(this);
  
  // device inquiry
  //sendSysex("f0 7e 7f 06 01 f7");
  
//  // introduction message
//  sendSysex("f0 47 7f 29 60 00 04 00 02 01 00 f7");
  
  //var mode = "40";  // generic mode
  var mode = "41";    // ableton live mode
  //var mode = "42";  // alternate ableton live mode
  sendSysex("f0 47 7f 29 60 00 04 " + mode + " 02 01 00 f7");
  
  for (var i=0; i<8; i++) {
    this.setLedring(ENCODER_TRACK +i,LEDRING_SINGLE);
    this.setLedring(ENCODER_DEVICE+i,LEDRING_SINGLE);
  }

  this.initControls();
  this.clearLights();
  //this.drawBitwigLogo();
  //----------
  //bitwig.init();
  bitwig.initMidi(0,0,controller.onMidi,controller.onSysex,"apc");
  bitwig.initApplication();
  bitwig.initTransport();
  bitwig.initTracks();
  bitwig.initClips();
  bitwig.initScenes();
  bitwig.initDevices();
  bitwig.initUserControls();
  bitwig.initActions();
  bitwig.initMaster();
  //----------
  this.global_selector     = new pagesSelector(   LED_WHITE,  LED_GREY,     false );
  this.bank_selector       = new Selector(        LED_LIME,   LED_BLUE,     false );
  this.shiftbank_selector  = new optionsSelector( LED_GREEN,  LED_LILAC2,   true  );
  this.shift_selector      = new Selector(        LED_PINK,   LED_CYAN2,    false );
  this.pan_selector        = new panSelector(     LED_RED,    LED_ORANGE2,  false );
  this.sends_selector      = new sendsSelector(   LED_ORANGE, LED_YELLOW2,  false );
  this.user_selector       = new userSelector(    LED_YELLOW, LED_RED2,     false );
  //----------
  this.global_page = new globalPage();
  this.global_page.select();

  controller.addPage( new clipsPage(    "Clips"     ) );
  controller.addPage( new performPage(  "Perform"   ) );
  controller.addPage( new notesPage(    "Notes"     ) );
  controller.addPage( new emptyPage(    "empty"     ) );
  controller.addPage( new systemPage(   "System"    ) );

  controller.addPage( new scenesPage(   "Scenes"    ) );
  controller.addPage( new userctrlPage( "UserCtrl"  ) );
  controller.addPage( new drumsPage(    "Drums"     ) );
  controller.addPage( new emptyPage(    "empty"     ) );
  controller.addPage( new emptyPage(    "empty"     ) );

//controller.addPage( new trackPage(    "Track"     ) );
//controller.addPage( new devicePage(   "Device"    ) );
  controller.selectPage(0);
  //----------
}

//----------------------------------------------------------------------
//
// controls
//
//----------------------------------------------------------------------

Apc40mk2.prototype.initControls = function() {
  var i;
  for (i=0; i<NUM_TRACK_ENCODERS; i++)  this.addControl( new Control( ENCODER_TRACK,        i,  LED_RING,   MIDI_CTRL_CHANGE, 0,  ENCODER_TRACK + i       ));
  for (i=0; i<NUM_CLIPS; i++)           this.addControl( new Control( BUTTON_GRID,          i,  LED_COLOR2, MIDI_NOTE_ON,     0,  BUTTON_GRID + i         ));
  for (i=0; i<NUM_TRACKS; i++)          this.addControl( new Control( BUTTON_CLIP_STOP,     i,  LED_COLOR,  MIDI_NOTE_ON,     i,  BUTTON_CLIP_STOP        )); 
  for (i=0; i<NUM_TRACKS; i++)          this.addControl( new Control( BUTTON_TRACK_SELECT,  i,  LED_COLOR,  MIDI_NOTE_ON,     i,  BUTTON_TRACK_SELECT     )); 
  for (i=0; i<NUM_TRACKS; i++)          this.addControl( new Control( BUTTON_ARM,           i,  LED_COLOR,  MIDI_NOTE_ON,     i,  BUTTON_ARM              )); 
  for (i=0; i<NUM_TRACKS; i++)          this.addControl( new Control( BUTTON_SOLO,          i,  LED_COLOR,  MIDI_NOTE_ON,     i,  BUTTON_SOLO             )); 
  for (i=0; i<NUM_TRACKS; i++)          this.addControl( new Control( BUTTON_AB,            i,  LED_COLOR,  MIDI_NOTE_ON,     i,  BUTTON_AB               )); 
  for (i=0; i<NUM_TRACKS; i++)          this.addControl( new Control( BUTTON_MUTE,          i,  LED_COLOR,  MIDI_NOTE_ON,     i,  BUTTON_MUTE             )); 
  for (i=0; i<NUM_TRACKS; i++)          this.addControl( new Control( SLIDER_TRACK,         i,  LED_NONE,   MIDI_CTRL_CHANGE, i,  SLIDER_TRACK            ));
  for (i=0; i<NUM_SCENES; i++)          this.addControl( new Control( BUTTON_SCENE_LAUNCH,  i,  LED_COLOR2, MIDI_NOTE_ON,     0,  BUTTON_SCENE_LAUNCH + i ));
                                        this.addControl( new Control( BUTTON_STOP_ALL,      0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_STOP_ALL         ));
                                        this.addControl( new Control( BUTTON_MASTER,        0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_MASTER           ));
                                        this.addControl( new Control( ENCODER_CUE_LEVEL,    0,  LED_NONE,   MIDI_CTRL_CHANGE, 0,  ENCODER_CUE_LEVEL       ));
                                        this.addControl( new Control( SLIDER_MASTER,        0,  LED_NONE,   MIDI_CTRL_CHANGE, 0,  SLIDER_MASTER           ));
                                        this.addControl( new Control( BUTTON_PAN,           0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_PAN              ));
                                        this.addControl( new Control( BUTTON_SENDS,         0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_SENDS            ));
                                        this.addControl( new Control( BUTTON_USER,          0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_USER             ));
                                        this.addControl( new Control( BUTTON_PLAY,          0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_PLAY             ));
                                        this.addControl( new Control( BUTTON_RECORD,        0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_RECORD           ));
                                        this.addControl( new Control( BUTTON_SESSION,       0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_SESSION          ));
                                        this.addControl( new Control( BUTTON_METRONOME,     0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_METRONOME        ));
                                        this.addControl( new Control( BUTTON_TAP_TEMPO,     0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_TAP_TEMPO        ));
                                        this.addControl( new Control( BUTTON_NUDGE_MINUS,   0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_NUDGE_MINUS      ));
                                        this.addControl( new Control( BUTTON_NUDGE_PLUS,    0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_NUDGE_PLUS       ));
                                        this.addControl( new Control( ENCODER_TEMPO,        0,  LED_NONE,   MIDI_CTRL_CHANGE, 0,  ENCODER_TEMPO           ));
  for (i=0; i<NUM_DEVICE_ENCODERS; i++) this.addControl( new Control( ENCODER_DEVICE,       i,  LED_RING,   MIDI_CTRL_CHANGE, 0,  ENCODER_DEVICE + i      ));
                                        this.addControl( new Control( BUTTON_DEVICE_MINUS,  0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_DEVICE_MINUS     ));
                                        this.addControl( new Control( BUTTON_DEVICE_PLUS,   0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_DEVICE_PLUS      ));
                                        this.addControl( new Control( BUTTON_BANK_MINUS,    0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_BANK_MINUS       ));
                                        this.addControl( new Control( BUTTON_BANK_PLUS,     0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_BANK_PLUS        ));
                                        this.addControl( new Control( BUTTON_DEVICE_ON_OFF, 0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_DEVICE_ON_OFF    ));
                                        this.addControl( new Control( BUTTON_DEVICE_LOCK,   0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_DEVICE_LOCK      ));
                                        this.addControl( new Control( BUTTON_CLIP_DEV_VIEW, 0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_CLIP_DEV_VIEW    ));
                                        this.addControl( new Control( BUTTON_DETAIL_VIEW,   0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_DETAIL_VIEW      ));
                                        this.addControl( new Control( BUTTON_ARROW_UP,      0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_ARROW_UP         ));
                                        this.addControl( new Control( BUTTON_ARROW_DOWN,    0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_ARROW_DOWN       ));
                                        this.addControl( new Control( BUTTON_ARROW_RIGHT,   0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_ARROW_RIGHT      ));
                                        this.addControl( new Control( BUTTON_ARROW_LEFT,    0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_ARROW_LEFT       ));
                                        this.addControl( new Control( BUTTON_SHIFT,         0,  LED_NONE,   MIDI_NOTE_ON,     0,  BUTTON_SHIFT            ));
                                        this.addControl( new Control( BUTTON_BANK,          0,  LED_COLOR,  MIDI_NOTE_ON,     0,  BUTTON_BANK             ));
                                        this.addControl( new Control( SLIDER_CROSSFADE,     0,  LED_NONE,   MIDI_CTRL_CHANGE, 0,  SLIDER_CROSSFADE        ));
}

//----------------------------------------------------------------------
//
// lights
//
//----------------------------------------------------------------------

Apc40mk2.prototype.setLight = function(index,color) {
  sendMidi(MIDI_NOTE_ON,index,color);
}

//----------

Apc40mk2.prototype.setLight2 = function(index,color,mode,color2) {
  sendMidi(MIDI_NOTE_ON+LED_PRIMARY,index,color2);
  sendMidi(MIDI_NOTE_ON+mode,       index,color);
}

//----------

Apc40mk2.prototype.setLightChan = function(index,chan,color) {
  sendMidi(MIDI_NOTE_ON+chan,index,color);
}

//----------

Apc40mk2.prototype.setLedring = function(index,value) {
  sendMidi(MIDI_CTRL_CHANGE,index,value);
}

//----------

Apc40mk2.prototype.setLedringMode = function(index,mode) {
  sendMidi(MIDI_CTRL_CHANGE,index+8,mode);
}

