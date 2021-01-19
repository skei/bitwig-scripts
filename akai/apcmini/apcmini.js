
load("apcmini_const.js");
load("apcmini_var.js");
load("apcmini_utils.js");

//load("apcmini_knobs.js");
//load("apcmini_buttons.js");
load("apcmini_lights.js");

load("apcmini_observers.js");

load("apcmini_page.js");
load("apcmini_page1.js");

load("apcmini_page2.js");
load("apcmini_page3.js");
load("apcmini_page4.js");
load("apcmini_page5.js");

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function apcmini_init() {

  //---------- draw bitwig logo ----------

  //apcmini_clear_lights();
  //apcmini_draw_logo();
  //apcmini_flush_lights();

  //---------- setup objects ----------
  
  application = host.createApplication();
  project     = host.getProject();
  transport   = host.createTransport();
  mixer       = host.createMixer();
  actions     = application.getActions();
  
  //var num = actions.length;
  //for (var i=0; i<num; i++) {
  //  println( i + " " + actions[i].getName() );
  //  //action_names[i] = actions[i].getName();
  //}
  
  // midi

  midiinput   = host.getMidiInPort(0);
  midioutput  = host.getMidiOutPort(0);
  //noteinput1  = midiinput.createNoteInput("1", "?1????");
  //noteinput2  = midiinput.createNoteInput("2", "?f????");
  
  midiinput.setMidiCallback(on_midi);
  midiinput.setSysexCallback(on_sysex);
  //noteinput1.setShouldConsumeEvents(false);
  //noteinput2.setShouldConsumeEvents(false);
  
  // tracks
  
  cursortrack = host.createCursorTrack(NUM_SENDS,NUM_SCENES);
  mastertrack = host.createMasterTrack(NUM_SCENES);
  //roottrack   = project.getShownTopLevelTrackGroup();
  
  //----- banks -----
  
  scenebank = host.createSceneBank(NUM_SCENES);
  trackbank = host.createMainTrackBank(NUM_TRACKS+1,NUM_SENDS,NUM_SCENES);
  //trackbank = roottrack.createMainTrackBank(NUM_TRACKS,NUM_SENDS,NUM_SCENES,false);
  
  //for (var i=0; i<NUM_TRACKS; i++) {
  //  subtrackbanks[i] = trackbank.getChannel(i).createMainTrackBank(NUM_TRACKS,NUM_SENDS,NUM_SCENES,false);
  //}
  
  //----- devices -----
  
  cursordevice  = host.createCursorDevice();
  primarydevice = cursortrack.getPrimaryDevice();
  
  //----- controls -----
  
  usercontrols = host.createUserControls(NUM_CTRL);
  
  //----------
  
  init_observers();

  //---------- clear lights ----------
  
  //sleep(1000);
  apcmini_clear_lights();
  apcmini_flush_lights();
  
  page = 0;
  page_select();
  
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function apcmini_exit() {
  apcmini_clear_lights();
  apcmini_flush_lights();
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function apcmini_flush() {
  apcmini_flush_lights();
}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function on_midi(status,data1,data2) {

  //printMidi(status,data1,data2);
  
  var msg     = status >> 4;
  var chan    = status & 15;
  var num     = data1 & 127;
  var val     = data2 & 127;
  var button  = false;
  var knob    = false;
  //var note    = false;
  
  // buttons & knobs  
  
  if (chan==0) {
    if ((msg==9) || (msg==8)) button = true;
    if (msg==11) knob = true;
    
    if (knob) {
      if (in_range(data1, 48,56)) page_knob(num-48,val); // 0..8 (8=master)
    }
    
    if (button) {
      if (msg==9) press = true; else press = false;
      if (in_range(data1, 0,63))  page_button(BUTTON_GRID,data1&7,7-(data1>>3),press);
      if (in_range(data1,64,67))  page_button(BUTTON_ARROW,data1-64,0,press);
      if (in_range(data1,68,71))  page_button(BUTTON_KNOBCTRL,data1-68,0,press);
      if (in_range(data1,82,89))  page_button(BUTTON_SCENELAUNCH,0,data1-82,press);
      if (data1==98)              page_button(BUTTON_SHIFT,0,0,press);
    }
  } // chan = 0
  
 // notes

  else if (chan==1) {
    if (shift_pressed) {
      noteinput2.sendRawMidiEvent(status,data1,data2);
    }
    //else
    //  noteinput1.sendRawMidiEvent(status,data1,data2);
  }
  
}

//----------

function on_sysex(data) {
  printSysex(data);
}

