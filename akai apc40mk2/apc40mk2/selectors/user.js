


//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

userSelector = function(oncol,offcol,altupd) {
  Selector.call(this,oncol,offcol,altupd);
}

//----------

userSelector.prototype = Object.create(Selector.prototype);
userSelector.prototype.constructor = userSelector;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//userSelector.prototype.init = function() {
//  //Selector.prototype.init.call(this)
//}

userSelector.prototype.select = function(index) {
  Selector.prototype.select.call(this,index);
  var i = index;
  //if (this.altmode[index]) i += 5;
  controller.user_mode = i;
}

