
loadAPI(1);
host.defineController("Novation", "Launchpad (skei)", "1.0", "1e4d4d90-bd9b-11e3-b1b6-0800200c9a66");
host.defineMidiPorts(1,1);
host.addDeviceNameBasedDiscoveryPair(["Launchpad MIDI 1"],["Launchpad MIDI 1"]);

//----------

function init()
{
  //host.getMidiInPort(0).createNoteInput("Launchpad");
  host.getMidiInPort(0).setMidiCallback(onMidi);
  transport = host.createTransportSection();
  userControls = host.createUserControlsSection(128);
  for (var i=0; i<128; i++) { userControls.getControl(i).setLabel("CC"+i); }
  var out = host.getMidiOutPort(0);
  out.sendMidi(0xB0,0,0); // reset launchpad
  out.sendMidi(0xB0,0,2); // grid mapping mode (1=x-y layout, 2=drum rack layout)
  //out.sendMidi(0xB0,0,1); // double buffering
  
  // test
  // turn on all ledsd
  out.sendMidi(0xB0,0,125); // 125=low, 126=med, 127=hi
  
  
}

//----------

function exit()
{
}

//----------

function onMidi(status, data1, data2)
{
  printMidi(status,data1,data2);
  if (isChannelController(status))
  {
    userControls.getControl(data1).set(data2,128);
  }
}

