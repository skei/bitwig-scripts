
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Selector = function(oncol,offcol,altupd) {

  this.mode       = 0;
  this.altmode    = initArray(false,NUM_SCENES);
  this.color_on   = oncol;
  this.color_off  = offcol;
  this.altupdate  = altupd; // -> multi
  
  /*
    selectors options.js, pan.js, pages.js, sends.js, user.js
  */
  
  this.start      = BUTTON_SCENE_LAUNCH;
  this.count      = NUM_SCENES;

}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//Selector.prototype.init = function() {
//}

//----------

//Selector.prototype.exit = function() {
//}

//----------

Selector.prototype.select = function(index) {
  if (this.altupdate) {
    var pre = this.altmode[index];
    if (this.altmode[index] == true) this.altmode[index] = false;
    else this.altmode[index] = true;
  }
  else {
    if (this.mode == index) {
      this.altmode[index] = ~this.altmode[index];
    }
    else this.mode = index;
  }
  this.update();
}

//----------

Selector.prototype.update = function() {
  for (var i=0; i<NUM_SCENES; i++) {
    var control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_SCENE_LAUNCH+i);
    var color = LED_OFF;
    if (this.altupdate) {
      if (this.altmode[i]) color = this.color_on;
      else color = this.color_off;
    }
    else {
      if (this.altmode[this.mode]) {
        if (this.mode == i) color = this.color_off;
        else color = this.color_on;
      }
      else {
        if (this.mode == i) color = this.color_on;
        else color = this.color_off;
      }
    }
    controller.queueControl(control,color);
  }
}

