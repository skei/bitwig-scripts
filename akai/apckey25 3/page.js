

//_page_clips.prototype = new _page();
//_page_clips.prototype.constructor = _page_clips;
//Page.prototype.init.call(this);

const PAGE_MODE_SWITCH    = 0;
const PAGE_MODE_MOMENTARY = 1;

//----------------------------------------------------------------------


//----------------------------------------------------------------------

function Page(name,mode) {
  this.name = name;
  this.mode = mode;
  
  this.widgets = [];
  

};

//----------------------------------------------------------------------

Page.prototype.select = function() {
  //println("Page.select");
  //controller.page.draw();
  this.draw();
}

//----------

Page.prototype.draw = function() {
  //println("Page.draw");
  apckey25_clear_grid_lights();
  for (var i=0; i<this.widgets.length; i++) {
    //println("  draw widget " + i );
    this.widgets[i].draw();
  }
}

//----------------------------------------------------------------------

Page.prototype.addWidget = function(widget) {
  widgets.push(widget);
}

Page.prototype.findWidget = function(x,y) {
  for (var i=0; i<this.widgets.length; i++) {
    var widget = this.widgets[i];
    if ((x >= widget.xpos)
    && (x <  widget.xpos+widget.width)
    && (y >= widget.ypos)
    && (y <  widget.ypos+widget.height))
    return widget;
  }
  return null;
}

//----------------------------------------------------------------------

Page.prototype.handleKnob = function(index,value) {
  println("Page.handleKnob(" + index + "," + value + ")");
}

//----------

Page.prototype.handleGridButton = function(x,y,press) {
  println("Page.handleGridButton(" + x + "," + y + "," + press + ")");
}

//----------

Page.prototype.handleArrowButton = function(x,press) {
  println("Page.handleArrowButton(" + x + "," + press + ")");
}

//----------

Page.prototype.handleModeButton = function(x,press) {
  println("Page.handleModeButton(" + x + "," + press + ")");
}

//----------

Page.prototype.handlePageButton = function(y,press) {
  println("Page.handlePageButton(" + y + "," + press + ")");
}

//----------

Page.prototype.handleShiftButton = function(press) {
  println("Page.handleShiftButton(" + press + ")");
}

//----------

Page.prototype.handleStopAllButton = function(press) {
  println("Page.handleStopAllButton(" + press + ")");
}

//----------

Page.prototype.handlePlayButton = function(press) {
  println("Page.handlePlayButton(" + press + ")");
}

//----------

Page.prototype.handleRecButton = function(press) {
  println("Page.handleRecButton(" + press + ")");
}

//----------

Page.prototype.handleSustainButton = function(press) {
  println("Page.handleSustainButton(" + press + ")");
}

//----------------------------------------------------------------------

