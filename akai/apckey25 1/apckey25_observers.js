
var master_volume = 0;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function init_observers() {

  //----- trackbank -----
  
  trackbank.addCanScrollTracksDownObserver( trackbank_canscrolltracksdown_observer() );
  trackbank.addCanScrollTracksUpObserver( trackbank_canscrolltracksup_observer() );
  trackbank.addCanScrollScenesDownObserver( trackbank_canscrollscenesdown_observer() );
  trackbank.addCanScrollScenesUpObserver( trackbank_canscrollscenesup_observer() );
  trackbank.addChannelCountObserver( trackbank_channelcount_observer() );
  trackbank.addSceneCountObserver( trackbank_scenecount_observer() );
  trackbank.addSceneScrollPositionObserver( trackbank_scenescrollposition_observer(), -1 );
  trackbank.addSendCountObserver( trackbank_sendcount_observer() );
  trackbank.addTrackScrollPositionObserver( trackbank_trackscrollposition_observer(), -1 );
  
  //----- tracks -----
  
  for (var tr=0; tr<NUM_TRACKS; tr++) {
    var track = trackbank.getChannel(tr);
    track.addColorObserver( track_color_observer(tr) );
    track.addIsGroupObserver( track_isgroup_observer(tr) ); // > 1.2
    track.addIsQueuedForStopObserver( track_isqueuedforstop_observer(tr) );    
    //track.addIsSelectedInEditorObserver( track_isselectedinmixer_observer(tr) );
    track.addIsSelectedInMixerObserver( track_isselectedinmixer_observer(tr) );
    track.addNameObserver( 255, "unknown", track_name_observer(tr) );    
    track.addPositionObserver( track_position_observer(tr) );    
    track.addTrackTypeObserver( 255, "unknown", track_type_observer(tr) );    
    track.addVuMeterObserver( MAX_VALUE, -1, true, track_vumeter_observer(tr) );
    track.exists().addValueObserver( track_exists_observer(tr) );
    track.getVolume().addValueObserver( MAX_VALUE, track_volume_observer(tr) );
    track.getArm().addValueObserver( track_arm_observer(tr) );
    track.getAutoMonitor().addValueObserver( track_automonitor_observer(tr) );
    track.getIsMatrixQueuedForStop().addValueObserver( track_ismatrixqueuedforstop_observer(tr) );
    track.getIsMatrixStopped().addValueObserver( track_ismatrixstopped_observer(tr) );
    track.getMonitor().addValueObserver( track_monitor_observer(tr) );
    track.getMute().addValueObserver( track_mute_observer(tr) );
    track.getPan().addValueObserver( MAX_VALUE, track_pan_observer(tr) );
    for (var j=0; j<NUM_SENDS; j++) { track.getSend(j).addValueObserver( MAX_VALUE, track_send_observer(tr,j) ); }
    track.getSolo().addValueObserver( track_solo_observer(tr) );
    track.isActivated().addValueObserver( track_isactivated_observer(tr) );
    
    //----- subtracks -----
    
    //for (var str=0; str<NUM_TRACKS; str++) {
    //  var strack = subtrackbanks[tr].getChannel(str);
    //  strack.addIsQueuedForStopObserver( strack_isqueuedforstop_observer(tr,str) );    
    //  strack.exists().addValueObserver( strack_exists_observer(tr,str) );
    //  strack.getIsMatrixQueuedForStop().addValueObserver( strack_ismatrixqueuedforstop_observer(tr,str) );
    //  //strack.getIsMatrixStopped().addValueObserver( strack_ismatrixstopped_observer(tr,str) );
    //  var scliplauncher = strack.getClipLauncherSlots();
    //  scliplauncher.addHasContentObserver( scliplauncher_hascontent_observer(tr,str) );
    //  scliplauncher.addIsPlaybackQueuedObserver( scliplauncher_isplaybackqueued_observer(tr,str) );    
    //  scliplauncher.addIsPlayingObserver( scliplauncher_isplaying_observer(tr,str) );    
    //  scliplauncher.addIsRecordingObserver( scliplauncher_isrecording_observer(tr,str) );    
    //  scliplauncher.addIsRecordingQueuedObserver( scliplauncher_isrecordingqueued_observer(tr,str) );    
    //  scliplauncher.addIsStopQueuedObserver( scliplauncher_isstopqueued_observer(tr,str) );    
    //}
    //scenes = subtracks[tr].getClipLauncherScenes
    
    //----- clip launcher -----
    
    var cliplauncher = track.getClipLauncherSlots();
    
//    cliplauncher.setIndication(true);

    cliplauncher.addColorObserver( cliplauncher_color_observer(tr) );
    cliplauncher.addHasContentObserver( cliplauncher_hascontent_observer(tr) );    
    cliplauncher.addIsPlaybackQueuedObserver( cliplauncher_isplaybackqueued_observer(tr) );    
    cliplauncher.addIsPlayingObserver( cliplauncher_isplaying_observer(tr) );    
    //cliplauncher.addIsQueuedObserver( cliplauncher_isqueued_observer(tr) );    
    cliplauncher.addIsRecordingObserver( cliplauncher_isrecording_observer(tr) );    
    cliplauncher.addIsRecordingQueuedObserver( cliplauncher_isrecordingqueued_observer(tr) );    
    cliplauncher.addIsSelectedObserver( cliplauncher_isselected_observer(tr) );    
    cliplauncher.addIsStopQueuedObserver( cliplauncher_isstopqueued_observer(tr) );    
    cliplauncher.addNameObserver( cliplauncher_name_observer(tr) );    
    //cliplauncher.addPlaybackStateObserver( cliplauncher_playbackstate_observer(tr) );    
    
  } // track
  
  //----- device -----
  
  // parameters
  
  for (var i=0; i<NUM_PARAM; i++) {
    primarydevice.getCommonParameter(i).addValueObserver( MAX_VALUE, device_paramcommon_observer(i) );
    primarydevice.getEnvelopeParameter(i).addValueObserver( MAX_VALUE, device_paramenvelope_observer(i) );
    primarydevice.getParameter(i).addValueObserver( MAX_VALUE, device_param_observer(i) );
    primarydevice.addPageNamesObserver( device_pagename_observer(i) );
  }
  
  for (var i=0; i<NUM_MACRO; i++) {
    //device_macro_values[ia] = 0;
    var macro = primarydevice.getMacro(i);
    macro.getAmount().addValueObserver(MAX_VALUE,device_macro_observer(i));
    
//    macro.getAmount().setIndication(true);
    
  }
  
  primarydevice.addPresetCategoriesObserver( device_presetcategories_observer() );
  primarydevice.addPresetCreatorsObserver( device_presetcreators_observer() );
  primarydevice.addPresetNamesObserver( device_presetnames_observer() );
  primarydevice.addPresetNameObserver( 255,"-",device_presetname_observer() );
  
  primarydevice.addCanSwitchToDeviceObserver( DeviceType.ANY, ChainLocation.PREVIOUS, device_canscrollleft_observer() );
  primarydevice.addCanSwitchToDeviceObserver( DeviceType.ANY, ChainLocation.NEXT, device_canscrollright_observer() );
  
  //----- user controls -----
  
  for (var i=0; i<NUM_CTRL; i++) {
    var control = usercontrols.getControl(i);
    control.addValueObserver(MAX_VALUE,ctrl_observer(i));
    control.setLabel("ctrl"+i);
  }
  
  //----- master -----
  
  mastertrack.getVolume().addValueObserver(MAX_VALUE, master_volume_observer() );
}

//----------------------------------------------------------------------
// trackbank
//----------------------------------------------------------------------

function trackbank_canscrollscenesdown_observer() {
  return function(value) {
    trackbank_canscrollscenesdown = value;
    page_update(UPDATE_ARROWS);
  }
}

function trackbank_canscrollscenesup_observer() {
  return function(value) {
    trackbank_canscrollscenesup = value;
    page_update(UPDATE_ARROWS);
  }
}

function trackbank_canscrolltracksdown_observer() {
  return function(value) {
    trackbank_canscrolltracksdown = value;
    page_update(UPDATE_ARROWS);
  }
}

function trackbank_canscrolltracksup_observer() {
  return function(value) {
    trackbank_canscrolltracksup = value;
    page_update(UPDATE_ARROWS);
  }
}

function trackbank_channelcount_observer() {
  return function(value) {
    trackbank_trackcount = value;
  }
}

function trackbank_scenecount_observer() {
  return function(value) {
    trackbank_scenecount = value;
  }
}

function trackbank_scenescrollposition_observer() {
  return function(value) {
    trackbank_scenescrollposition = value;
    //println("scroll up/down");
    //page_update(UPDATE_GRID);
  }
}

// never called?
function trackbank_sendcount_observer() {
  return function(value) {
    trackbank_sendcount = value;
  }
}

function trackbank_trackscrollposition_observer() {
  return function(value) {
    trackbank_trackscrollposition = value;
    //println("scroll left/right");
    //page_update(UPDATE_GRID);
  }
}

//----------------------------------------------------------------------
// track
//----------------------------------------------------------------------

function track_arm_observer(tr) {
  return function(value) {
    track_arm[tr] = value;
    page_update(UPDATE_TRACK,tr);
    
  }
}

function track_automonitor_observer(tr) {
  return function(value) {
    track_automonitor[tr] = value;
    //page_update(UPDATE_TRACK,tr);
  }
}

function track_color_observer(tr) {
  return function(r,g,b) {
    track_color[tr*3] = r;
    track_color[tr*3+1] = g;
    track_color[tr*3+2] = b;
    //page_update(UPDATE_TRACK_VALUE,tr);
  }
}

function track_exists_observer(tr) {
  return function(value) {
    track_exist[tr] = value;
    //page_update(UPDATE_TRACK,tr);
  }
}

function track_isactivated_observer(tr) {
  return function(value) {
    track_activated[tr] = value;
    //page_update(UPDATE_TRACK,tr);
  }
}

function track_isgroup_observer(tr) {
  return function(value) {
    track_isgroup[tr] = value;
    //page_update(UPDATE_TRACK,tr);
    //if (value) println("track " + tr + " is a group track");
  }
}

function track_ismatrixqueuedforstop_observer(tr) {
  return function(value) {
    //if (value) println("track_ismatrixqueuedforstop_observer");
    track_queued_stop[tr] = value;
    page_update(UPDATE_TRACK,tr);
  }
}

function track_ismatrixstopped_observer(tr) {
  return function(value) {
    //if (value) println("track_ismatrixstopped_observer");
    track_stopped[tr] = value;
    page_update(UPDATE_TRACK,tr);
  }
}

function track_isqueuedforstop_observer(tr) {
  return function(value) {
    //if (value) println("track_isqueuedforstop_observer");
    track_queued_stop[tr] = value;
    page_update(UPDATE_TRACK,tr);
  }
}

function track_isselectedinmixer_observer(tr) {
  return function(value) {
    track_selected[tr] = value;
    //println("track_isselectedinmixer_observer " + tr + " = " + value);
    if (value) {
      //if (tr==selected_track) { println("."); }
      selected_track = tr;
      //println("observer / selected_track = " + selected_track);
    }
    page_update(UPDATE_TRACK,tr);
  }
}

function track_monitor_observer(tr) {
  return function(value) {
    track_monitor[tr] = value;
    //page_update(UPDATE_TRACK,tr);
  }
}

function track_mute_observer(tr) {
  return function(value) {
    track_mute[tr] = value;
    page_update(UPDATE_TRACK,tr);
  }
}

function track_name_observer(tr) {
  return function(value) {
    track_name[tr] = value;
    //page_update(UPDATE_TRACK,tr);
  }
}

function track_pan_observer(tr) {
  return function(value) {
    track_pan[tr] = value;
    page_update(UPDATE_TRACK_VALUE,tr);
  }
}

function track_position_observer(tr) {
  return function(value) {
    track_position[tr] = value;
    //page_update(UPDATE_TRACK,tr);
  }
}

function track_send_observer(tr,send) {
  return function(value) {
    track_send[tr*NUM_SENDS+send] = value;
    page_update(UPDATE_TRACK_VALUE,tr);
  }
}

function track_solo_observer(tr) {
  return function(value) {
    track_solo[tr] = value;
    page_update(UPDATE_TRACK,tr);
  }
}

function track_type_observer(tr) {
  return function(value) {
    track_type[tr] = value;
    //page_update(UPDATE_TRACK,tr);
  }
}

function track_volume_observer(tr) {
  return function(value) {
    track_volume[tr] = value;
    //page_update(UPDATE_TRACK_VALUE,tr);
  }
}

function track_vumeter_observer(tr) {
  return function(value) {
    track_vumeter[tr] = value;
    //page_update(UPDATE_TRACK_VALUE,tr);
  }
}

//----------------------------------------------------------------------
// subtracks
//----------------------------------------------------------------------

/*
function strack_exists_observer(tr,str) {
  return function(value) {
    var i = (tr*NUM_TRACKS) + str;
    strack_exist[i] = value;
    page_update(UPDATE_TRACK,tr,str);
  }
}

function strack_ismatrixqueuedforstop_observer(tr,str) {
  return function(value) {
    //if (value) println("strack_ismatrixqueuedforstop_observer");
    var i = (tr*NUM_TRACKS) + str;
    strack_queued_stop[i] = value;
    page_update(UPDATE_TRACK,tr,str);
  }
}

function strack_isqueuedforstop_observer(tr,str) {
  return function(value) {
    //if (value) println("strack_isqueuedforstop_observer");
    var i = (tr*NUM_TRACKS) + str;
    strack_queued_stop[i] = value;
    page_update(UPDATE_TRACK,tr,str);
  }
}
*/

//----------------------------------------------------------------------
// cliplauncher
//----------------------------------------------------------------------

function cliplauncher_color_observer(tr) { 
  return function(index,r,g,b) {
    var pos = ( (tr*NUM_SCENES)+index ) * 3;
    clip_color[pos  ] = r;
    clip_color[pos+1] = g;
    clip_color[pos+2] = b;
    //page_update(UPDATE_CLIP_VALUE,tr);
  }
}

function cliplauncher_hascontent_observer(tr) { 
  return function(index,value) {
    //println("cliplauncher has content  tr:"+tr+" index:"+index+" = "+value);
    var i = (tr*NUM_SCENES)+index;
    clip_hascontent[i] = value;
    page_update(UPDATE_CLIP,tr,index);
  }
}

function cliplauncher_isplaybackqueued_observer(tr) { 
  return function(index,value) {
    var i = (tr*NUM_SCENES)+index;
    clip_queued_play[i] = value;
    page_update(UPDATE_CLIP,tr,index);
  }
}

function cliplauncher_isplaying_observer(tr) { 
  return function(index,value) {
    var i = (tr*NUM_SCENES)+index;
    clip_playing[i] = value;
    
    
    //if (value==true) {
      //println("start action (" + tr + "," + index + ")");
//      var i = (tr*NUM_SCENES)+index;
//      handle_clip_action(clip_name[i],tr,index,value);
      
    //}
    //else {
    //  //println("stop action (" + tr + "," + index + ")");
    //}
    
    
    page_update(UPDATE_CLIP,tr,index);
  }
}
//function cliplauncher_isqueued_observer(tr) { 
//  return function(index,value) {
//  }
//}

function cliplauncher_isrecording_observer(tr) { 
  return function(index,value) {
    var i = (tr*NUM_SCENES)+index;
    clip_recording[i] = value;
    page_update(UPDATE_CLIP,tr,index);
  }
}

function cliplauncher_isrecordingqueued_observer(tr) { 
  return function(index,value) {
    var i = (tr*NUM_SCENES)+index;
    clip_queued_rec[i] = value;
    page_update(UPDATE_CLIP,tr,index);
  }
}

function cliplauncher_isselected_observer(tr) { 
  return function(index,value) {
    var i = (tr*NUM_SCENES)+index;
    clip_selected[i] = value;
  }
}

function cliplauncher_isstopqueued_observer(tr) { 
  return function(index,value) {
    var i = (tr*NUM_SCENES)+index;
    clip_queued_stop[i] = value;
    page_update(UPDATE_CLIP,tr,index);
  }
}

function cliplauncher_name_observer(tr) { 
  return function(index,value) {
    var i = (tr*NUM_SCENES)+index;
    clip_name[i] = value;
    //page_update(UPDATE_CLIP_VALUE,tr);
    
/*    
    
    println( i + " " + value);
    
*/    
    
  }
}

//function cliplauncher_playbackstate_observer(tr) { 
//  return function(index,state,queue) {
//  }
//}

//----------------------------------------------------------------------
// subtrack (group) cliplauncher
//----------------------------------------------------------------------

/*
function scliplauncher_hascontent_observer(tr,str) { 
  return function(index,value) {
    //println("scliplauncher has content  tr:"+tr+" str:"+str+" index:"+index+" = "+value);
    var i = (tr*NUM_CLIPS) + (str*NUM_SCENES) + index;
    sclip_hascontent[i] = value;
    page_update(UPDATE_CLIP,tr,index,str);
  }
}

function scliplauncher_isplaybackqueued_observer(tr,str) { 
  return function(index,value) {
    //println("scliplauncher is playback queued  tr:"+tr+" str:"+str+" index:"+index+" = "+value);
    var i = (tr*NUM_CLIPS) + (str*NUM_SCENES) + index;    
    sclip_queued_play[i] = value;
    page_update(UPDATE_CLIP,tr,index,str);
  }
}

function scliplauncher_isplaying_observer(tr,str) { 
  return function(index,value) {
    //println("scliplauncher is playing  tr:"+tr+" str:"+str+" index:"+index+" = "+value);
    var i = (tr*NUM_CLIPS) + (str*NUM_SCENES) + index;
    sclip_playing[i] = value;
    page_update(UPDATE_CLIP,tr,index,str);
  }
}

function scliplauncher_isrecording_observer(tr,str) { 
  return function(index,value) {
    //println("scliplauncher is recording  tr:"+tr+" str:"+str+" index:"+index+" = "+value);
    var i = (tr*NUM_CLIPS) + (str*NUM_SCENES) + index;
    sclip_recording[i] = value;
    page_update(UPDATE_CLIP,tr,index,str);
  }
}

function scliplauncher_isrecordingqueued_observer(tr,str) { 
  return function(index,value) {
    //println("scliplauncher is recording queued  tr:"+tr+" str:"+str+" index:"+index+" = "+value);
    var i = (tr*NUM_CLIPS) + (str*NUM_SCENES) + index;
    sclip_queued_rec[i] = value;    
    page_update(UPDATE_CLIP,tr,index,str);
  }
}

function scliplauncher_isstopqueued_observer(tr,str) { 
  return function(index,value) {
    //println("scliplauncher is stop queued  tr:"+tr+" str:"+str+" index:"+index+" = "+value);
    var i = (tr*NUM_CLIPS) + (str*NUM_SCENES) + index;
    sclip_queued_stop[i] = value;    
    page_update(UPDATE_CLIP,tr,index,str);
  }
}
*/

//----------------------------------------------------------------------
// device
//----------------------------------------------------------------------

function device_macro_observer(index) {
  return function(value) {
    device_macro_values[index] = value;
    page_update(UPDATE_DEVICE_VALUE);
  }
}

function device_param_observer(index) {
  return function(value) {
    device_param_values[index] = value;
    page_update(UPDATE_DEVICE_VALUE);
  }
}

function device_paramcommon_observer(index) {
  return function(value) {
    device_param_common_values[index] = value;
    page_update(UPDATE_DEVICE_VALUE);
  }
}

function device_paramenvelope_observer(index) {
  return function(value) {
    device_param_envelope_values[index] = value;
    page_update(UPDATE_DEVICE_VALUE);
  }
}

function device_pagename_observer(index) {
  return function(names) {
    device_num_param_pages = arguments.length;
    for (var i=0; i<arguments.length; i++) {
      //println( i + " " + arguments[i] );
      device_param_page_names[i] = arguments[i];
    }
  }
}

//----------------------------------------------------------------------
// device presets
//----------------------------------------------------------------------

function device_presetcategories_observer() {
  return function(txt) {
    device_num_preset_categories = arguments.length;
    for (var i=0; i<arguments.length; i++) {
      //println( i + " " + arguments[i] );
      device_preset_categories[i] = arguments[i];
    }
  }
}

function device_presetcreators_observer() {
  return function(txt) {
    device_num_preset_creators = arguments.length;
    for (var i=0; i<arguments.length; i++) {
      //println( i + " " + arguments[i] );
      device_preset_creators[i] = arguments[i];
    }
  }
}

function device_presetnames_observer() {
  return function(txt) {
    device_num_presets = arguments.length;
    for (var i=0; i<arguments.length; i++) {
      //println( i + " " + arguments[i] );
      device_preset_names[i] = arguments[i];
    }
  }
}

function device_presetname_observer() {
  return function(name) {
    //println( name );
    device_preset_name = name;
    page_update(UPDATE_DEVICE_PRESET);
  }
}

function device_canscrollleft_observer() {
  return function(value) {
    println( "device_canscrollleft = " + value );
    device_canscrollleft = value;
  }
}

function device_canscrollright_observer() {
  return function(value) {
    println( "device_canscrollright = " + value );
    device_canscrollright = value;
  }
}


//----------------------------------------------------------------------
// user controls
//----------------------------------------------------------------------

function ctrl_observer(index) {
  return function(value) {
    ctrl_values[index] = value;
    page_update(UPDATE_CTRL);
  }
}

//----------------------------------------------------------------------
// master
//----------------------------------------------------------------------

function master_volume_observer() {
  return function(value) {
    master_volume = value;
    page_update(UPDATE_MASTER);
  }
}

