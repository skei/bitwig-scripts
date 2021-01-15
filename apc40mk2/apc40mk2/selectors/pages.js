

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

pagesSelector = function(oncol,offcol,altupd) {
  Selector.call(this,oncol,offcol,altupd);
}

//----------

pagesSelector.prototype = Object.create(Selector.prototype);
pagesSelector.prototype.constructor = pagesSelector;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//pagesSelector.prototype.init = function() {
//  //Selector.prototype.init.call(this)
//}

pagesSelector.prototype.select = function(index) {
  Selector.prototype.select.call(this,index);
  var i = index;
  if (this.altmode[index]) i += 5;
  controller.selectPage(i);
}

