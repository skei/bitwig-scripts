
/*
  apckey25_draw_grid_light(x,y,c)
  apckey25_draw_scenelaunch_light(y,c)
  apckey25_draw_arrow_light(x,c)
  apckey25_draw_knobctrl_light(x,c)

  apckey25_flush()
  apckey25_clear_lights()
  apckey25_clear_grid()
  apckey25_draw_logo()
*/

const COLOR_OFF           = 0;
const COLOR_GREEN         = 1;
const COLOR_GREEN_BLINK   = 2;
const COLOR_RED           = 3;
const COLOR_RED_BLINK     = 4;
const COLOR_YELLOW        = 5;
const COLOR_YELLOW_BLINK  = 6;

const O   = COLOR_OFF;
const G   = COLOR_GREEN;
const R   = COLOR_RED;
const Y   = COLOR_YELLOW;
const Gb  = COLOR_GREEN_BLINK;
const Rb  = COLOR_RED_BLINK;
const Yb  = COLOR_YELLOW_BLINK;

var bitwig_logo = [
  O,O,O,O,O,O,O,O,
  O,O,Y,Y,Y,Y,O,O,
  O,Y,Y,Y,Y,Y,Y,O,
  O,Y,Y,O,O,Y,Y,O,
  O,O,O,O,O,O,O,O
];

//----------------------------------------------------------------------

var grid_lights                 = initArray(COLOR_OFF,8*5);
var scenelaunch_lights          = initArray(COLOR_OFF,5);
var arrow_lights                = initArray(COLOR_OFF,4);
var knobctrl_lights             = initArray(COLOR_OFF,4);

var grid_lights_pending         = initArray(COLOR_OFF,8*5);
var scenelaunch_lights_pending  = initArray(COLOR_OFF,5);
var arrow_lights_pending        = initArray(COLOR_OFF,4);
var knobctrl_lights_pending     = initArray(COLOR_OFF,4);

//----------------------------------------------------------------------

function apckey25_draw_grid_light(x,y,c) {
  var i = (y*8)+x;
  grid_lights_pending[i] = c;
}

//----------

function apckey25_draw_scenelaunch_light(y,c) {
  scenelaunch_lights_pending[y] = c;
}

//----------

function apckey25_draw_arrow_light(x,c) {
  arrow_lights_pending[x] = c;
}

//----------

function apckey25_draw_knobctrl_light(x,c) {
  knobctrl_lights_pending[x] = c;
}

//----------------------------------------------------------------------

function apckey25_flush_lights() {
  var num_changed = 0;
  for (var y=0; y<5; y++) {
    for (var x=0; x<8; x++) {
      var i = (y*8)+x;
      var c = grid_lights_pending[i]; 
      if (c != grid_lights[i]) {
        grid_lights[i] = c;
        var index = ((4-y) * 8) + x;
        //println("index " + index + " c + " + c);
        sendMidi(144,index,c);
        num_changed++;
      }
    }
  }
  
  for (var y=0; y<5; y++) {
    var c = scenelaunch_lights_pending[y]; 
    if (c != scenelaunch_lights[y]) {
      scenelaunch_lights[y] = c;
      sendMidi(144,y+82,c);
      num_changed++;
    }
  }
  for (var x=0; x<4; x++) {
    var c = arrow_lights_pending[x]; 
    if (c != arrow_lights[x]) {
      arrow_lights[x] = c;
      sendMidi(144,x+64,c);
      num_changed++;
    }
  }
  for (var x=0; x<4; x++) {
    var c = knobctrl_lights_pending[x]; 
    if (c != knobctrl_lights[x]) {
      knobctrl_lights[x] = c;
      sendMidi(144,x+68,c);
      num_changed++;
    }
  }
}

//----------------------------------------------------------------------

function apckey25_clear_grid_lights() {
  for (var y=0; y<5; y++) {
    for (var x=0; x<8; x++) {
      apckey25_draw_grid_light(x,y,COLOR_OFF);
    }
  }
}

function apckey25_clear_scenelaunch_lights() {
  for (var y=0; y<5; y++) {
    apckey25_draw_scenelaunch_light(y,COLOR_OFF);
  }
}

function apckey25_clear_arrow_lights() {
  for (var x=0; x<4; x++) {
    apckey25_draw_arrow_light(x,COLOR_OFF);
  }
}

function apckey25_clear_knobctrl_lights() {
  for (var x=0; x<4; x++) {
    apckey25_draw_knobctrl_light(x,COLOR_OFF);
  }
}

//----------------------------------------------------------------------

function apckey25_clear_lights() {
  //for (var y=0; y<5; y++) {
  //  for (var x=0; x<8; x++) {
  //    apckey25_draw_grid_light(x,y,COLOR_OFF);
  //  }
  //}
  //for (var y=0; y<5; y++) {
  //  apckey25_draw_scenelaunch_light(y,COLOR_OFF);
  //}
  //for (var x=0; x<4; x++) {
  //  apckey25_draw_arrow_light(x,COLOR_OFF);
  //}
  //for (var x=0; x<4; x++) {
  //  apckey25_draw_knobctrl_light(x,COLOR_OFF);
  //}
  apckey25_clear_grid_lights();
  apckey25_clear_scenelaunch_lights();
  apckey25_clear_arrow_lights();
  apckey25_clear_knobctrl_lights();
}

//----------------------------------------------------------------------

function apckey25_draw_logo() {
  for (var y=0; y<5; y++) {
    for (var x=0; x<8; x++) {
      var p = y * 8 + x;
      apckey25_draw_grid_light(x,y,bitwig_logo[p]);
    }
  }
}

//----------------------------------------------------------------------

