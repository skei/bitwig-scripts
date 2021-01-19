loadAPI(1);
host.defineController("Skei","MIDI Mix","1.0","b516badc-9f0f-4a45-884f-e27b1284cdfd");
host.addDeviceNameBasedDiscoveryPair(["MIDI Mix"],["MIDI Mix"]);
host.defineMidiPorts(1,1);

load("midimix_const.js")
load("midimix_var.js")
load("midimix.js")
load("midimix_observers.js")
load("midimix_utils.js")

load("midimix_page_mixer.js")
load("midimix_page_device.js")
load("midimix_page_user.js")

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function init() {
  
  //midimix_clear_lights();
  //midimix_flush();
  
  application   = host.createApplication();
  cursordevice  = host.createCursorDevice();
  cursortrack   = host.createCursorTrack(NUM_SENDS,NUM_SCENES);
  mastertrack   = host.createMasterTrack(NUM_SCENES);
  midiinput     = host.getMidiInPort(0);
  midioutput    = host.getMidiOutPort(0);
  mixer         = host.createMixer();
  project       = host.getProject();
  transport     = host.createTransport();
  usercontrols  = host.createUserControls(NUM_CTRL);
  
  primarydevice = cursortrack.getPrimaryDevice();
  roottrack     = project.getShownTopLevelTrackGroup(); // getRootTrackGroup();
  trackbank     = roottrack.createMainTrackBank(NUM_TRACKS,NUM_SENDS,NUM_SCENES,false);
  
  midiinput.setMidiCallback(on_midi);
  midiinput.setSysexCallback(on_sysex);
  //noteinput = midiinput.createNoteInput("MIDI Mix",  "?0????");
  //noteinput.setShouldConsumeEvents(true);
  
  init_observers();
  //draw_page();
  //draw_buttons();
  page = 1;
  select();
}

//----------

function exit() {
  //midimix_clear_lights();
  //midimix_flush();
}

//----------

function flush() {
  //midimix_flush();
}

//----------------------------------------------------------------------
// midi callbacks
//----------------------------------------------------------------------

function on_midi(status,data1,data2) {
  //printMidi(status,data1,data2);
  var msg     = status >> 4;
  var chan    = status & 15;
  var num     = data1 & 127;
  var val     = data2 & 127;
  var button  = false;
  var press   = false;
  var knob    = false;
  //if (chan==0) {
    if ((msg==9) || (msg==8)) {
      button = true;
      if (msg==9) press = true; else press = false;
      if (data1==25) handle_bankleft(press);
      if (data1==26) handle_bankright(press);
      if (data1==27) handle_solo(press);
      if (in_range(data1,1,24)) {
        var index = data1-1;
        var x = Math.floor( index / 3 );
        var y = index - x*3;
        handle_button(x,y,press);
      }
    }
    if (msg==11) {
      knob = true;
      if (data1==62) handle_master(val);
      if (in_range(data1,16,31)) {
        var index = data1-16;
        handle_knob((index>>2),(index&3),val);
      }
      if (in_range(data1,46,61)) {
        var index = data1 - 46 + 16;
        handle_knob((index>>2),(index&3),val);
      }
    }
  //} // chan = 0
}

//----------------------------------------------------------------------

function on_sysex(data) {
  printSysex(data);
}

