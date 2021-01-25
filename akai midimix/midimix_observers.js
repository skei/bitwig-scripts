

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function init_observers() {
  
  //----- tracks -----
  
  for (var tr=0; tr<NUM_TRACKS; tr++) {
    var track = trackbank.getChannel(tr);
    //track.addIsSelectedInEditorObserver( track_isselectedinmixer_observer(tr) );
    track.addIsSelectedInMixerObserver( track_isselectedinmixer_observer(tr) );
    track.addVuMeterObserver( MAX_VALUE, -1, true, track_vumeter_observer(tr) );
    track.exists().addValueObserver( track_exists_observer(tr) );
    track.getVolume().addValueObserver( MAX_VALUE, track_volume_observer(tr) );
    track.getArm().addValueObserver( track_arm_observer(tr) );
    track.getMute().addValueObserver( track_mute_observer(tr) );
    track.getPan().addValueObserver( MAX_VALUE, track_pan_observer(tr) );
    for (var j=0; j<8; j++) { track.getSend(j).addValueObserver( MAX_VALUE, track_send_observer(tr,j) ); }
    track.getSolo().addValueObserver( track_solo_observer(tr) );
  }
    
  //----- device parameters -----
  
  var device = primarydevice;
  
  for (var pa=0; pa<NUM_PARAM; pa++) {
    device.getCommonParameter(pa).addValueObserver( MAX_VALUE, device_paramcommon_observer(pa) );
    device.getEnvelopeParameter(pa).addValueObserver( MAX_VALUE, device_paramenvelope_observer(pa) );
    device.getParameter(pa).addValueObserver( MAX_VALUE, device_param_observer(pa) );
    device.addPageNamesObserver( device_pagename_observer(pa) );
  }
  
  //----- device macros -----
  
  
  for (var ma=0; ma<NUM_MACRO; ma++) {
    var macro = device.getMacro(ma);
    macro.getAmount().addValueObserver(MAX_VALUE,device_macro_observer(ma));
    //macro.getAmount().setIndication(true);
  }
  
  //----- user controls -----
  
  for (var co=0; co<NUM_CTRL; co++) {
    var control = usercontrols.getControl(co);
    control.addValueObserver(MAX_VALUE,ctrl_observer(co));
    control.setLabel("ctrl "+co);
  }
  
  //----- master -----
  
  mastertrack.getVolume().addValueObserver( MAX_VALUE, master_volume_observer() );
    
}

//----------------------------------------------------------------------
// track observers
//----------------------------------------------------------------------

function track_arm_observer(tr) {
  return function(value) {
    track_arm[tr] = value;
    update(UPDATE_TRACK_STATE,tr);
  }
}

function track_exists_observer(tr) {
  return function(value) {
    track_exist[tr] = value;
  }
}

function track_isselectedinmixer_observer(tr) {
  return function(value) {
    track_selected[tr] = value;
    //if (value) selected_track = tr;
    update(UPDATE_TRACK_STATE,tr);
  }
}

function track_mute_observer(tr) {
  return function(value) {
    track_mute[tr] = value;
    update(UPDATE_TRACK_STATE,tr);
  }
}

function track_pan_observer(tr) {
  return function(value) {
    track_pan[tr] = value;
    update(UPDATE_TRACK_VALUE,tr);
  }
}

function track_send_observer(tr,send) {
  return function(value) {
    //track_send[tr*NUM_SENDS+send] = value;
    track_send[send*NUM_SENDS+tr] = value;
    update(UPDATE_TRACK_VALUE,tr);
  }
}

function track_solo_observer(tr) {
  return function(value) {
    track_solo[tr] = value;
    update(UPDATE_TRACK_STATE,tr);
  }
}

function track_volume_observer(tr) {
  return function(value) {
    track_volume[tr] = value;
    update(UPDATE_TRACK_VALUE,tr);
  }
}

function track_vumeter_observer(tr) {
  return function(value) {
    track_vumeter[tr] = value;
    //update(UPDATE_TRACK_VALUE,tr);
  }
}

//----------------------------------------------------------------------
// device observers
//----------------------------------------------------------------------

function device_macro_observer(index) {
  return function(value) {
    device_macro[index] = value;
    update(UPDATE_DEVICE_VALUE,index);
  }
}

function device_param_observer(index) {
  return function(value) {
    device_param[index] = value;
    update(UPDATE_DEVICE_VALUE,index);
  }
}

function device_paramcommon_observer(index) {
  return function(value) {
    device_param_common[index] = value;
    update(UPDATE_DEVICE_VALUE,index);
  }
}

function device_paramenvelope_observer(index) {
  return function(value) {
    device_param_env[index] = value;
    update(UPDATE_DEVICE_VALUE,index);
  }
}

function device_pagename_observer(index) {
  return function(names) {
    device_num_param_pages = arguments.length;
    for (var i=0; i<arguments.length; i++) {
      device_param_page_names[i] = arguments[i];
    }
    //update(UPDATE_DEVICE_VALUE,index);
  }
}

//----------------------------------------------------------------------
// user controls
//----------------------------------------------------------------------

function ctrl_observer(index) {
  return function(value) {
    user_controls[index] = value;
    update(UPDATE_CTRL_VALUE,index);
  }
}


//----------------------------------------------------------------------
// master observer
//----------------------------------------------------------------------

function master_volume_observer() {
  return function(value) {
    master_volume = value;
    update(UPDATE_MASTER_VALUE);
  }
}

