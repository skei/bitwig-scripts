loadAPI(1);
host.defineController("Skei", "Launchpad Lights", "1.0", "6e236f19-ed44-4a75-914f-91f85beceaec");
host.defineMidiPorts(1,1);

function init() {
  //host.getMidiInPort(0).setMidiCallback(onMidi);
  //noteInput = host.getMidiInPort(0).createNoteInput("Launchpad","80????","90????");
  //noteInput.setShouldConsumeEvents(false);
}

function exit() {
}

function onMidi(status,data1,data2) {
}

