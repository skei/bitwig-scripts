
//----------------------------------------------------------------------
// bitwig objects
//----------------------------------------------------------------------

//---------- host ----------

var application     = null;
var cliplauncher    = null;
var cursordevice    = null;
var cursortrack     = null;
var mastertrack     = null;
var midiinput       = null;
var midioutput      = null;
var mixer           = null;
var project         = null;
//var roottrack       = null;
var scenebank       = null;
var track           = null;
var trackbank       = null;
var transport       = null;
var usercontrols    = null;

var actions         = null;
var primarydevice   = null;

var noteinput1      = null;
var noteinput2      = null;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

var mode            = 0;
var page            = 0;
var selected_track  = 0;

//var knobmode2               = false;
//var pagemode                = 0;
//var pagemode2               = false;
//var pages                   = initArray(null,NUM_PAGES);
//var param_mode              = -1;
//var param_page              = 0;
//var device_preset_category  = 0;
//var device_preset_creator   = 0;
//var device_preset           = 0;
//var device_preset_name      = "-";

//----------------------------------------------------------------------
// apckey25
//----------------------------------------------------------------------

var shift_pressed   = false;
var stopall_pressed = false;
var knob_positions  = initArray(0,9/*NUM_KNOBS*/);

//var grid_lights                 = initArray(COLOR_OFF,NUM_GRID_BUTTONS);
//var arrow_lights                = initArray(COLOR_OFF,NUM_ARROW_BUTTONS);
//var knobctrl_lights             = initArray(COLOR_OFF,NUM_KNOBCTRL_BUTTONS);
//var scenelaunch_lights          = initArray(COLOR_OFF,NUM_SCENELAUNCH_BUTTONS);
//var grid_lights_pending         = initArray(COLOR_OFF,NUM_GRID_BUTTONS);
//var arrow_lights_pending        = initArray(COLOR_OFF,NUM_ARROW_BUTTONS);
//var knobctrl_lights_pending     = initArray(COLOR_OFF,NUM_KNOBCTRL_BUTTONS);
//var scenelaunch_lights_pending  = initArray(COLOR_OFF,NUM_SCENELAUNCH_BUTTONS);

//----------------------------------------------------------------------
// observed values
//----------------------------------------------------------------------

// ----- trackbank -----

var trackbank_canscrollscenesup     = false;
var trackbank_canscrollscenesdown   = false;
var trackbank_canscrolltracksup     = false;
var trackbank_canscrolltracksdown   = false;
var trackbank_scenecount            = 0;
var trackbank_scenescrollposition   = 0;
var trackbank_sendcount             = 0;
var trackbank_trackcount            = 0;
var trackbank_trackscrollposition   = 0;

//----- sub trackbank -----

//var subtrackbanks                   = initArray(null,NUM_TRACKS);

// ----- scenes -----

var scene_name                      = initArray("",NUM_SCENES);
var scene_position                  = initArray(0,NUM_SCENES);

// ----- tracks -----

var track_activated                 = initArray(false,NUM_TRACKS);
var track_arm                       = initArray(false,NUM_TRACKS);
var track_automonitor               = initArray(false,NUM_TRACKS);
var track_color                     = initArray(0,NUM_TRACKS*3);
var track_exist                     = initArray(false,NUM_TRACKS);
var track_isgroup                   = initArray(false,NUM_TRACKS);
var track_monitor                   = initArray(false,NUM_TRACKS);
var track_mute                      = initArray(false,NUM_TRACKS);
var track_name                      = initArray("",NUM_TRACKS);
var track_pan                       = initArray(0,NUM_TRACKS);
var track_position                  = initArray(false,NUM_TRACKS);
var track_queued_stop               = initArray(false,NUM_TRACKS);
var track_selected                  = initArray(false,NUM_TRACKS);
var track_send                      = initArray(0,NUM_TRACKS*NUM_SENDS);
var track_solo                      = initArray(false,NUM_TRACKS);
var track_stopped                   = initArray(false,NUM_TRACKS);
var track_type                      = initArray(false,NUM_TRACKS);
var track_volume                    = initArray(false,NUM_TRACKS);
var track_vumeter                   = initArray(0,NUM_TRACKS);

//----- subtracks -----

//var strack_exist                    = initArray(false,NUM_TRACKS);
//var strack_stopped                  = initArray(false,NUM_TRACKS);
//var strack_queued_stop              = initArray(false,NUM_TRACKS);

// ----- cliplauncher -----

//println("NUM_CLIPS " + NUM_CLIPS); // prints '40'

var clip_color                      = initArray(0,NUM_CLIPS*3);
var clip_hascontent                 = initArray(false,NUM_CLIPS); 
var clip_name                       = initArray("",NUM_CLIPS); 
var clip_playing                    = initArray(false,NUM_CLIPS);
var clip_queued_play                = initArray(false,NUM_CLIPS);
var clip_queued_rec                 = initArray(false,NUM_CLIPS);
var clip_queued_stop                = initArray(false,NUM_CLIPS);
var clip_recording                  = initArray(false,NUM_CLIPS);
var clip_selected                   = initArray(false,NUM_CLIPS);
var clip_stopped                    = initArray(false,NUM_CLIPS);

// ----- sub/group cliplauncher -----

//var sclip_hascontent                = initArray(false,NUM_CLIPS*NUM_TRACKS);
//var sclip_playing                   = initArray(false,NUM_CLIPS*NUM_TRACKS);
//var sclip_queued_play               = initArray(false,NUM_CLIPS*NUM_TRACKS);
//var sclip_queued_rec                = initArray(false,NUM_CLIPS*NUM_TRACKS);
//var sclip_queued_stop               = initArray(false,NUM_CLIPS*NUM_TRACKS);
//var sclip_recording                 = initArray(false,NUM_CLIPS*NUM_TRACKS);
//var sclip_stopped                   = initArray(false,NUM_CLIPS*NUM_TRACKS);

// ----- device -----

var device_canscrollup              = false;
var device_canscrolldown            = false;

var device_canscrollleft            = false;
var device_canscrollright           = false;

var device_param_common_values      = initArray(0,NUM_PARAM);
var device_param_envelope_values    = initArray(0,NUM_PARAM);
var device_param_modulation_values  = initArray(0,NUM_PARAM);
var device_param_values             = initArray(0,NUM_PARAM);

var device_param_page_names         = [];
var device_param_page               = 0;
var device_num_param_pages          = 0;

var device_preset_categories        = [];
var device_preset_creators          = [];
var device_preset_names             = [];

var device_num_preset_categories    = 0;
var device_num_preset_creators      = 0;
var device_num_presets              = 0;

var device_macro_values             = initArray(0,NUM_MACRO);

// ----- -----

var ctrl_values                     = initArray(0,NUM_CTRL);
var cc_values                       = initArray(0,NUM_CC);
var master_volume                   = 0;

//var send_count                      = 0;


























