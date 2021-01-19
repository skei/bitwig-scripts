
function in_range(v,v1,v2) {
  if ((v >= v1) && (v <= v2)) return true;
}

//----------

function init_array(len,val) {
  var arr = [], i = 0;
  arr.length = len;
  while (i < len) { arr[i++] = val; }
  return arr;
}

//----------

function sleep(ms) {
  var start = new Date().getTime();
  while (new Date() < (start + ms));
  return true;  
}

//----------

// returns new/scaled value_new

function scale_value(knob_new,knob_old,value_old) {

  //println("knob_new = " + knob_new);
  //println("knob_old = " + knob_old);
  //println("value_old = " + value_old);

  var value_new = 0;
  if (knob_new > knob_old) {
    // up
    var range   = MAX_VALUE - knob_old;   // how much we CAN turn up
    var diff    = knob_new - knob_old;    // how much we DID turn up
    var scale   = diff / range;           // fraction of range we DID turned up
    var prange  = MAX_VALUE - value_old;  // how much parameter CAN increase
    var change  = (prange*scale);         // how much we WILL change
    value_new   = value_old + change;     // increase parameter
  } else {
    // down
    var range   = knob_old;
    var diff    = knob_old - knob_new;
    var scale   = diff / range;
    var prange  = value_old;
    var change  = (prange*scale);
    value_new   = value_old - change;
  }
  value_new = Math.max(value_new,0)
  value_new = Math.min(value_new,(MAX_VALUE-1));
  return value_new;
}

//----------

