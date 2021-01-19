
//----------------------------------------------------------------------
// bitwig objects
//----------------------------------------------------------------------

var application   = null;
var cursordevice  = null;
var cursortrack   = null;
var mastertrack   = null;
var midiinput   = null;
var midioutput   = null;
var mixer = null;
var noteinput = null;
var primarydevice = null;
var project = null;
var roottrack = null;
var trackbank = null;
var transport = null;
var usercontrols  = null;

//----------------------------------------------------------------------
// observer values
//----------------------------------------------------------------------

var track_arm           = initArray(false,NUM_TRACKS);
var track_exist         = initArray(false,NUM_TRACKS);
var track_mute          = initArray(false,NUM_TRACKS);
var track_pan           = initArray(0,NUM_TRACKS);
var track_selected      = initArray(false,NUM_TRACKS);
var track_send          = initArray(0,NUM_SENDS*NUM_TRACKS);
var track_solo          = initArray(false,NUM_TRACKS);
var track_volume        = initArray(0,NUM_TRACKS);
var track_vumeter       = initArray(0,NUM_TRACKS);

var device_macro        = initArray(0,NUM_MACRO);
var device_param        = initArray(0,NUM_PARAM);
var device_param_common = initArray(0,NUM_PARAM);
var device_param_env    = initArray(0,NUM_PARAM);

var user_controls       = initArray(0,NUM_CTRL);
var master_volume       = 0;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

var page                    = 1;
//var mode                  = 0;
var mixer_mode              = 0;
var device_mode             = 0;
var user_mode               = 0;
var knob_positions          = initArray(0,NUM_KNOBS);
var button1_pressed         = initArray(false,NUM_TRACKS);
var button2_pressed         = initArray(false,NUM_TRACKS);
var bankleft_pressed        = false;
var bankright_pressed       = false;
var bank_pressed            = false;
var solo_pressed            = false;
var sololeft_pressed        = false;
var soloright_pressed       = false;
//var selected_track          = 0;
var device_num_param_pages  = 0;
var device_param_page_names = [];

var param_page      = 0;

