
loadAPI(1);
host.defineController("S2","apckey25","1.0","1147bb8e-3c20-4b36-a769-64c3d9d260c8");
host.defineMidiPorts(1,1);
load("apckey25/controller.js");

var controller = null;

//----------------------------------------------------------------------

function init() {
  controller = new apckey25();
  controller.init();
}

//----------------------------------------------------------------------

function exit() {
  controller.exit();
}

//----------------------------------------------------------------------

function flush() {
  controller.flush();
}

