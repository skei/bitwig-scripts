
/*
  TODO:
  - subclasses for LED_COLOR, LED_COLOR2, LED_RING, ..
    (get rid of the switch in flush())
*/


//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Control = function(id,index,type,midimsg,midichn,midiidx) {
  this.id           = id;
  this.index        = index;
  this.type         = type;
  this.midi_msg     = midimsg;
  this.midi_chn     = midichn;
  this.midi_idx     = midiidx;
  this.timestamp    = 0;
  this.state        = BUTTON_OFF;
  this.value        = 0;
  this.pending      = 0;
  this.value2       = 0;
  this.pending2     = 0;
  this.mode2        = 0;
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

//Control.prototype.init = function() {
//}

//----------

//Control.prototype.exit = function() {
//}

//----------

Control.prototype.setPending = function(value) {
  this.pending = value;
}

//----------

Control.prototype.setPending2 = function(value,mode2,value2) {
  this.pending  = value;
  this.pending2 = value2;
  this.mode2    = mode2;
}

//----------

Control.prototype.flush = function() {
  switch (this.type) {
    case LED_COLOR:
      if (this.value != this.pending) {
        this.value = this.pending;
        controller.setLightChan(this.midi_idx,this.midi_chn,this.value);
      }
      break;
    case LED_COLOR2:
      if ((this.value != this.pending) || (this.value2 != this.pending2)) {
        this.value = this.pending;
        this.value2 = this.pending2;
        controller.setLight2(this.midi_idx,this.value,this.mode2,this.value2);
      }
      break;
    case LED_RING:
      if (this.value != this.pending) {
        this.value = this.pending;
        if (controller.timestampElapsed(this,BLOCK_UPDATE_TIME)) {
          controller.setLedring(this.midi_idx,this.value * 127);
        }
      }
      break;
  }
}

