

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

optionsSelector = function(oncol,offcol,altupd) {
  Selector.call(this,oncol,offcol,altupd);
  //this.saved_bank_selector = bank_selector;
  //if (use_global_selector) this.altmode[0] = true;
}

//----------

optionsSelector.prototype = Object.create(Selector.prototype);
optionsSelector.prototype.constructor = optionsSelector;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//optionsSelector.prototype.init = function() {
//  //Selector.prototype.init.call(this)
//}

optionsSelector.prototype.select = function(index) {
  Selector.prototype.select.call(this,index);
  //if (index == 0) {
  //  if (this.altmode[0]) {
  //    use_global_selector = true;
  //    bank_selector = this.saved_bank_selector;
  //  }
  //  else {
  //    use_global_selector = false;
  //    bank_selector = global_selector;
  //  }
  //}
}

