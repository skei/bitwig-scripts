
loadAPI(1);
host.defineController("Skei","APC Key 25","1.0","d82b6d0e-c884-4598-b2e4-e8b8779b98b0");
host.defineMidiPorts(1,1);
load("apckey25.js");

//----------------------------------------------------------------------

function init() {
  apckey25_init();
}

//----------------------------------------------------------------------

function exit() {
  apckey25_exit();
}

//----------------------------------------------------------------------

function flush() {
  apckey25_flush();
}

