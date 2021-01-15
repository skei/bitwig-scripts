


//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

sendsSelector = function(oncol,offcol,altupd) {
  Selector.call(this,oncol,offcol,altupd);
}

//----------

sendsSelector.prototype = Object.create(Selector.prototype);
sendsSelector.prototype.constructor = sendsSelector;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//sendsSelector.prototype.init = function() {
//  //Selector.prototype.init.call(this)
//}

sendsSelector.prototype.select = function(index) {
  Selector.prototype.select.call(this,index);
  var i = index;
  //if (this.altmode[index]) i += 5;
  //println("sends " + i);
  controller.sends_mode = i;
}

