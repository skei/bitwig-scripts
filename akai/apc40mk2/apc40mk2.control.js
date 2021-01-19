
loadAPI(8);

host.defineController("Akai","APC40 mk2 (Skei)","2.0","5d1d3af4-3af1-40ec-8535-ae4ec314cf4a");
host.defineMidiPorts(1,1);
host.defineSysexIdentityReply ("F0 7E ?? 06 02 47 29 00 19 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? F7");

load("apc40mk2/apc40mk2.js");

var bitwig      = null;
var controller  = null;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

init = function() {
  bitwig = new Bitwig();
  controller = new Apc40mk2();
  bitwig.init();
  controller.init();
}

//----------

exit = function() {
  bitwig.exit();
  controller.exit();
}

//----------

flush = function() {
  //bitwig.flush();
  controller.flush();
}

