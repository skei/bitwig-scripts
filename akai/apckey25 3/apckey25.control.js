loadAPI(1);
host.defineController("skei2", "apkey25", "1.0", "26d3eb82-c5b1-4301-9409-f2a78b12a5c9");
host.defineMidiPorts(1,1);

load("apckey25.js");
load("bitwig.js");

//----------

var bitwig = null;
var controller = null;

//----------------------------------------------------------------------

function init() {
  bitwig = new Bitwig();
  bitwig.init();
  controller = new Controller();
  controller.init();
}

//----------

function exit() {
  controller.exit();
  bitwig.exit();
}

//----------

function flush() {
  controller.flush();
}

//----------------------------------------------------------------------

//function on_midi(status,data1,data2) {
//  controller.midi(status,data1,data2);
//}

