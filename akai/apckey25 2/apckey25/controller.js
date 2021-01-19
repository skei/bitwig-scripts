
//load("bitwig.js");
load("observers.js");
load("pages.js");

//----------------------------------------------------------------------


function apckey25() {
  
  this.bitwig = new bitwig();
  this.observers = new observers();
  
  //----------
  
  this.init = function() {
    bitwig.init();
    observers.init();
  };
  
  //----------
  
  this.exit = function() {
  };
  
  //----------
  
  this.flush = function() {
  };
  
  //------------------------------
  //
  //------------------------------
  
  this.addObserver() {
  }
  
  //------------------------------
  //
  //------------------------------
  
  this. on_observer = function(index,value,num) {
  };
  
  this. on_midi = function(status,data1,data2) {
  };
  
  
}
  
  
}

//----------------------------------------------------------------------


//function on_sysex(data) {
//  printSysex(data);
//}

//----------------------------------------------------------------------
  
//var apckey25 = new controller("apckey25");

