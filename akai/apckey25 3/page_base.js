

//Page_Base.prototype = new Page(name,mode);

Page_Base.prototype = new Page();
Page_Base.prototype.constructor = Page_Base;

//----------------------------------------------------------------------

const NUM_TRACKS = 8;
const NUM_SCENES = 5;

//----------------------------------------------------------------------


function Page_Base(name,mode) {
  this.name = name;
  this.mode = mode;
  
  this.widgets.push( new Widget(1,1,4,2) );
  this.widgets.push( new Widget(6,0,2,5) );
  
};

//----------------------------------------------------------------------

//Page_Base.prototype.select = function() {
//  println("Page_Base.select");
//}

//----------

//Page_Base.prototype.draw = function() {
//  println("Page_Base.draw");
//}

//----------------------------------------------------------------------

//Page_Base.prototype.handleKnob = function(index,value) {
//  println("Page_Base.handleKnob(" + index + "," + value + ")");
//}

//----------

Page_Base.prototype.handleGridButton = function(x,y,press) {
  var i = (y*NUM_TRACKS) + x;
  //println("Page_Base.handleGridButton(" + x + "," + y + "," + press + ") index " + i);
  var widget = /*controller.page*/this.findWidget(x,y);
  if (widget) {
    if (press) widget.press(x-widget.xpos,y-widget.ypos)
    else widget.release(x-widget.xpos,y-widget.ypos);
  }
}

//----------

//Page_Base.prototype.handleArrowButton = function(x,press) {
//  println("Page_Base.handleArrowButton(" + x + "," + press + ")");
//}

//----------

//Page_Base.prototype.handleModeButton = function(x,press) {
//  println("Page_Base.handleModeButton(" + x + "," + press + ")");
//}

//----------

//Page_Base.prototype.handlePageButton = function(y,press) {
//  println("Page_Base.handlePageButton(" + y + "," + press + ")");
//}

//----------

//Page_Base.prototype.handleShiftButton = function(press) {
//  println("Page_Base.handleShiftButton(" + press + ")");
//}

//----------

//Page_Base.prototype.handleStopAllButton = function(press) {
//  println("Page_Base.handleStopAllButton(" + press + ")");
//}

//----------

//Page_Base.prototype.handlePlayButton = function(press) {
//  println("Page_Base.handlePlayButton(" + press + ")");
//}

//----------

//Page_Base.prototype.handleRecButton = function(press) {
//  println("Page_Base.handleRecButton(" + press + ")");
//}

//----------

//Page_Base.prototype.handleSustainButton = function(press) {
//  println("Page_Base.handleSustainButton(" + press + ")");
//}

//----------------------------------------------------------------------

