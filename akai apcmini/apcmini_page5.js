
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page5_select() {
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

/*
  called from observers
  mode = which observer
*/


function page5_update(type) {
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page5_draw(type,index) {
  switch(type) {
    case DRAW_GRID:
      for (var x=0; x<8; x++) {
        for (var y=0; y<8; y++) {
          apcmini_draw_grid_light(x,y,COLOR_OFF);
        }
      }
      break;
  }
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page5_button(type,x,y,value) {
  switch(type) {
    case BUTTON_GRID:
      //println("grid " + x + "," + y + " = " + press);
      break;
  }
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page5_knob(index,value) {
  //println("knob " + index + " = " + value);
}
