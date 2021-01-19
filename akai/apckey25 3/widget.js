
/*
  todo:
  - apckey25 drawLight -> controller.drawLight
*/


//_widget_clips.prototype = new _widget();
//_widget_clips.prototype.constructor = _widget_clips;
//Page.prototype.init.call(this);

const BUTTON_MODE_SWITCH    = 0;
const BUTTON_MODE_MOMENTARY = 1;

//----------------------------------------------------------------------

function Widget(x,y,w,h) {
  this.xpos = x;
  this.ypos = y;
  this.width = w;
  this.height = h;
  
  // test/cheat..

  this.button_states = [
    false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false
  ];
  
  this.colors_off = [
    Y,Y,Y,Y,Y,Y,Y,Y,
    Y,Y,Y,Y,Y,Y,Y,Y,
    Y,Y,Y,Y,Y,Y,Y,Y,
    Y,Y,Y,Y,Y,Y,Y,Y,
    Y,Y,Y,Y,Y,Y,Y,Y
  ];
  this.colors_off_press = [
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R
  ];
  this.colors_on = [
    G,G,G,G,G,G,G,G,
    G,G,G,G,G,G,G,G,
    G,G,G,G,G,G,G,G,
    G,G,G,G,G,G,G,G,
    G,G,G,G,G,G,G,G
  ];
  this.colors_on_press = [
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R,
    R,R,R,R,R,R,R,R
  ];
};

//----------------------------------------------------------------------

Widget.prototype.draw = function() {
  //println("Widget.draw");
  for (var y=0; y<this.height; y++) {
    for (var x=0; x<this.width; x++) {
      var i = y * this.width + x;
      apckey25_draw_grid_light(this.xpos + x, this.ypos + y, this.colors_off[i] );
    }
  }
}

//----------

Widget.prototype.exit = function() {
}

//----------------------------------------------------------------------

Widget.prototype.inside = function(x,y) {
  return false;
}

//----------

Widget.prototype.press = function(x,y) {
  var i = (y*this.width) + x;
  //println("widget.press("+x+","+y+") index " + i);
  apckey25_draw_grid_light(this.xpos + x, this.ypos + y, this.colors_off_press[i] );
}

//----------

Widget.prototype.release = function(x,y) {
  var i = (y*this.width) + x;
  //println("widget.release("+x+","+y+") index " + i);
  apckey25_draw_grid_light(this.xpos + x, this.ypos + y, this.colors_off[i] );
}

