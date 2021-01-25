
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

const MAX_VALUE   = 128;

const NUM_TRACKS  = 8;
const NUM_SCENES  = 4;
const NUM_CLIPS   = (NUM_TRACKS*NUM_SCENES);
const NUM_SENDS   = 2;
const NUM_PARAM   = 8;
const NUM_MACRO   = 8;
const NUM_CTRL    = 128;
const NUM_CC      = 128;

const NUM_ARROWS  = 4;
const NUM_KNOBS   = 8;

//const NUM_MODES   = 4;
//const NUM_PAGES   = 5;

//----------------------------------------------------------------------

const UPDATE_NONE           = 0;
const UPDATE_GRID           = 1;
const UPDATE_ARROWS         = 2;
const UPDATE_TRACK          = 3;
const UPDATE_TRACK_VALUE    = 4;
const UPDATE_CLIP           = 5;
const UPDATE_CLIP_VALUE     = 6;
const UPDATE_DEVICE         = 7;
const UPDATE_DEVICE_VALUE   = 8;
const UPDATE_DEVICE_PRESET  = 9;
const UPDATE_CTRL           = 10;
const UPDATE_MASTER         = 11;
const UPDATE_OTHER          = 12;
const UPDATE_USER           = 100;

const BUTTON_GRID         = 0;
const BUTTON_ARROW        = 1;
const BUTTON_KNOBCTRL     = 2;
const BUTTON_SCENELAUNCH  = 3;
const BUTTON_STOPALL      = 4;
const BUTTON_SHIFT        = 5;
const BUTTON_PLAY         = 6;
const BUTTON_REC          = 7;

const DRAW_GRID         = 0;
//const DRAW_COLUMN       = 1;
//const DRAW_ROW          = 2;
const DRAW_ARROWS       = 3;
const DRAW_KNOBCTRL     = 4;
const DRAW_SCENELAUNCH  = 5;

