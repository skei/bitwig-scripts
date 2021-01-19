
loadAPI(1);
host.defineController("Skei","APC Mini","1.0","d333cebe-d85c-4a98-b591-ddcc0e5787b3");
host.defineMidiPorts(1,1);
load("apcmini.js");

//----------------------------------------------------------------------

function init() {
  apcmini_init();
}

//----------------------------------------------------------------------

function exit() {
  apcmini_exit();
}

//----------------------------------------------------------------------

function flush() {
  apcmini_flush();
}

