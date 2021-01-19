


//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

panSelector = function(oncol,offcol,altupd) {
  Selector.call(this,oncol,offcol,altupd);
}

//----------

panSelector.prototype = Object.create(Selector.prototype);
panSelector.prototype.constructor = panSelector;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//panSelector.prototype.init = function() {
//  //Selector.prototype.init.call(this)
//}

panSelector.prototype.select = function(index) {
  Selector.prototype.select.call(this,index);
  var i = index;
  //if (this.altmode[index]) i += 5;
  controller.pan_mode = i;
}

