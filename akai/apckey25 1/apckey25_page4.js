
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page4_select() {
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

/*
  called from observers
  mode = which observer
*/


function page4_update(type) {
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page4_draw(type,index) {
  switch(type) {
    case DRAW_GRID:
      for (var x=0; x<8; x++) {
        for (var y=0; y<5; y++) {
          apckey25_draw_grid_light(x,y,COLOR_OFF);
        }
      }
      break;
  }
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page4_button(type,x,y,value) {
  switch(type) {
    case BUTTON_GRID:
      //println("grid " + x + "," + y + " = " + press);
      break;
  }
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page4_knob(index,value) {
  //println("knob " + index + " = " + value);
}

