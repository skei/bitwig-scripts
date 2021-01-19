
var page2_button_states = [
  false,false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,false
];

var page2_colors_off = [
    R,Y,Y,O,O,O,G,G,
    G,O,O,O,O,O,Y,Y,
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,R,R,
    Y,Y,O,O,O,O,O,O
];

var page2_colors_off_press = [
    G,G,G,O,O,O,R,R,
    R,O,O,O,O,O,R,R,
    R,O,O,O,O,O,O,O,
    O,O,O,O,O,O,G,G,
    R,R,O,O,O,O,O,O
];

var page2_colors_on = [
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O
];


var page2_colors_on_press = [
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O,
    O,O,O,O,O,O,O,O
];


//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page2_select() {
  //for (var x=0; x<8; x++) {
  //  for (var y=0; y<5; y++) {
  //    apckey25_draw_grid_light(x,y,page2_colors_off[y*8+x]);
  //  }
  //}
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

/*
  called from observers
  mode = which observer
*/


function page2_update(type) {
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page2_draw(type,index) {
  switch(type) {
    case DRAW_GRID:
      for (var x=0; x<8; x++) {
        for (var y=0; y<5; y++) {
          var c = COLOR_OFF;
          var i = y*8+x;
          if (page2_button_states[i]) c = page2_colors_on[i];
          else c = page2_colors_off[i]; 
          apckey25_draw_grid_light(x,y,c);
        }
      }
      break;
  }
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page2_button(type,x,y,value) {
  switch(type) {
    case BUTTON_GRID:
      // action
      // button color
      var c = COLOR_OFF;
      var i = y*8+x;
      if (press) {
        if (page2_button_states[i]) c = page2_colors_on_press[i];
        else c = page2_colors_off_press[i]; 
      }
      else {
        if (page2_button_states[i]) c = page2_colors_on[i];
        else c = page2_colors_off[i]; 
      }
      apckey25_draw_grid_light(x,y,c);
      break;
  }
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page2_knob(index,value) {
  //println("knob " + index + " = " + value);
}

