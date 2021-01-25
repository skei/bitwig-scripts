
const OBS_UNKNOWN                   = 0x0000;
const OBS_GRID                      = 0x0100;
const OBS_GRID_CAN_SCROLL_UP        = OBS_GRID + 1;
const OBS_GRID_CAN_SCROLL_DOWN      = OBS_GRID + 2;
const OBS_GRID_CAN_SCROLL_LEFT      = OBS_GRID + 3;
const OBS_GRID_CAN_SCROLL_RIGHT     = OBS_GRID + 4;
const OBS_TRACK                     = 0x0200;
const OBS_TRACK_EXISTS              = OBS_TRACK + 1;
const OBS_TRACK_SELECTED            = OBS_TRACK + 2;
//const OBS_TRACK_PLAYING             = OBS_TRACK + 3;
const OBS_TRACK_QUEUED_STOP         = OBS_TRACK + 4;
const OBS_TRACK_STOPPED             = OBS_TRACK + 5;
const OBS_TRACK_MUTE                = OBS_TRACK + 6;
const OBS_TRACK_SOLO                = OBS_TRACK + 7;
const OBS_TRACK_ARM                 = OBS_TRACK + 8;
const OBS_TRACK_AB                  = OBS_TRACK + 9;
const OBS_TRACK_VOLUME              = OBS_TRACK + 10;
const OBS_TRACK_PAN                 = OBS_TRACK + 11;
const OBS_TRACK_SEND                = OBS_TRACK + 12;
const OBS_CLIP                      = 0x0300;
const OBS_CLIP_HAS_CONTENT          = OBS_CLIP + 1;
const OBS_CLIP_PLAYING              = OBS_CLIP + 2;
const OBS_CLIP_RECORDING            = OBS_CLIP + 3;
const OBS_CLIP_QUEUED_PLAY          = OBS_CLIP + 4;
const OBS_CLIP_QUEUED_STOP          = OBS_CLIP + 5;
const OBS_CLIP_QUEUED_RECORD        = OBS_CLIP + 6;
const OBS_CLIP_NAME                 = OBS_CLIP + 7;
const OBS_CLIP_COLOR                = OBS_CLIP + 8;
const OBS_CLIP_SELECTED             = OBS_CLIP + 9;
const OBS_SCENE                     = 0x0400;
const OBS_SCENE_NAME                = OBS_SCENE + 1;
const OBS_SCENE_COLOR               = OBS_SCENE + 2;
const OBS_DEVICE                    = 0x0500;
const OBS_DEVICE_PREV               = OBS_DEVICE + 1;
const OBS_DEVICE_NEXT               = OBS_DEVICE + 2;
const OBS_DEVICE_ENABLED            = OBS_DEVICE + 3;
const OBS_DEVICE_PINNED             = OBS_DEVICE + 4;
const OBS_MASTER                    = 0x0600;
const OBS_MASTER_VOLUME             = OBS_MASTER + 1;
const OBS_MASTER_SELECTED           = OBS_MASTER + 2;
const OBS_MASTER_SCENE_NAME         = OBS_MASTER + 3;
const OBS_MASTER_SCENE_COLOR        = OBS_MASTER + 4;
const OBS_REMOTE                    = 0x0700;
const OBS_REMOTE_CONTROL            = OBS_REMOTE + 1; //0x0600;
const OBS_REMOTE_PREV               = OBS_REMOTE + 2; //0x0601;
const OBS_REMOTE_NEXT               = OBS_REMOTE + 3; //0x0602;
const OBS_USER                      = 0x0800;
const OBS_USER_CONTROL              = OBS_USER + 1; // 0x0700;
const OBS_TRANSPORT                 = 0x0900;
const OBS_TRANSPORT_PLAY            = OBS_TRANSPORT + 1;
const OBS_TRANSPORT_RECORD          = OBS_TRANSPORT + 2;
const OBS_TRANSPORT_METRONOME       = OBS_TRANSPORT + 3;
const OBS_APPLICATION               = 0x0a00;
const OBS_APPLICATION_ACTIVE_ENGINE = OBS_APPLICATION + 1;

//----------------------------------------------------------------------

const BITWIG_COLORS_COUNT = 26;

const BITWIG_COLORS_RGB = [
  0.329, 0.329, 0.329,  // LED_GREY
  0.478, 0.478, 0.478,  // LED_GREY2
  0.788, 0.788, 0.788,  // LED_GREY3
  0.525, 0.537, 0.674,  // LED_WHITE
  0.639, 0.474, 0.262,  // LED_BROWN
  0.776, 0.623, 0.439,  // LED_BROWN2
  0.341, 0.380, 0.776,  // LED_LILAC
  0.517, 0.541, 0.878,  // LED_LILAC2
  0.584, 0.286, 0.796,  // LED_PURPLE
  0.850, 0.219, 0.443,  // LED_PINK
  0.850, 0.180, 0.141,  // LED_RED
  1.000, 0.341, 0.023,  // LED_ORANGE
  0.850, 0.615, 0.062,  // LED_YELLOW
  0.450, 0.596, 0.078,  // LED_LIME
  0.000, 0.615, 0.278,  // LED_GREEN
  0.000, 0.650, 0.580,  // LED_CYAN
  0.000, 0.600, 0.850,  // LED_BLUE
  0.737, 0.462, 0.941,  // LED_PURPLE2
  0.882, 0.400, 0.568,  // LED_PINK2
  0.925, 0.380, 0.341,  // LED_RED2
  1.000, 0.513, 0.243,  // LED_ORANGE2
  0.894, 0.717, 0.305,  // LED_YELLOW2
  0.627, 0.752, 0.298,  // LED_LIME2
  0.243, 0.733, 0.384,  // LED_GREEN2
  0.262, 0.823, 0.725,  // LED_CYAN2
  0.266, 0.784, 1.000   // LED_BLUE2
];

const BITWIG_LOGO = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 1, 1, 0,
  0, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0
];

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Bitwig = function() {

  // objects

  this.actions                    = null;
  this.application                = null;
  this.cursor_device              = null;
  this.cursor_track               = null;
  this.master_track               = null;
  this.midi_input                 = null;
  this.midi_output                = null;
  this.note_input                 = null;
  this.project                    = null;
  this.remote_controls            = null;
  this.root_track                 = null;
  this.scene_bank                 = null;
  this.track_bank                 = null;
  this.transport                  = null;
  this.user_controls              = null;
  //this.mixer                      = null;
  //this.primary_device             = null;

  // observer values
  
  this.obs_transport_play         = false;
  this.obs_transport_record       = false; 
  this.obs_transport_metronome    = false;
  this.obs_track_exists           = initArray(false,NUM_TRACKS);
  this.obs_track_selected         = initArray(false,NUM_TRACKS); 
  this.obs_track_queued_stop      = initArray(false,NUM_TRACKS); 
  this.obs_track_stopped          = initArray(true,NUM_TRACKS);  
  this.obs_track_mute             = initArray(false,NUM_TRACKS); 
  this.obs_track_solo             = initArray(false,NUM_TRACKS); 
  this.obs_track_arm              = initArray(false,NUM_TRACKS); 
  this.obs_track_ab               = initArray("AB",NUM_TRACKS); 
  this.obs_track_volume           = initArray(0,NUM_TRACKS); 
  this.obs_track_pan              = initArray(0,NUM_TRACKS); 
  this.obs_track_send             = initArray(0,NUM_TRACKS*NUM_SENDS); 
  this.obs_grid_can_scroll_up     = false;
  this.obs_grid_can_scroll_down   = false;
  this.obs_grid_can_scroll_left   = false;
  this.obs_grid_can_scroll_right  = false;
  this.obs_clip_has_content       = initArray(false,NUM_CLIPS);
  this.obs_clip_playing           = initArray(false,NUM_CLIPS);
  this.obs_clip_recording         = initArray(false,NUM_CLIPS);
  this.obs_clip_queued_play       = initArray(false,NUM_CLIPS);
  this.obs_clip_queued_stop       = initArray(false,NUM_CLIPS);
  this.obs_clip_queued_record     = initArray(false,NUM_CLIPS);
  this.obs_clip_name              = initArray("",NUM_CLIPS);
  this.obs_clip_color             = initArray(0,NUM_CLIPS);
  this.obs_clip_selected          = initArray(false,NUM_CLIPS);
  this.obs_scene_name             = initArray("",NUM_CLIPS);
  this.obs_scene_color            = initArray(0,NUM_CLIPS);
  this.obs_device_next            = false;
  this.obs_device_prev            = false;
  this.obs_device_enabled         = false;
  this.obs_device_pinned          = false;
  this.obs_remote_control         = initArray(0,NUM_REMOTE_CONTROLS);
  this.obs_remote_prev            = false;
  this.obs_remote_next            = false;
  this.obs_user_control           = initArray(0,NUM_USER_CONTROLS);
  this.obs_master_volume          = 0;
  this.obs_master_selected        = false;
  this.obs_master_scene_name      = initArray("",NUM_SCENES);
  this.obs_master_scene_color     = initArray(0,NUM_SCENES);

  this.obs_application_active_engine  = false;
  
}

//----------

//Bitwig.prototype = Object.create(Base.prototype);
//Bitwig.prototype.constructor = Bitwig;

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

Bitwig.prototype.init = function() {
  //Base.prototype.init.call(this);
  this.application = host.createApplication();
  this.project = host.getProject();
  //this.mixer = host.createMixer();
  //this.cursor_track = host.createArrangerCursorTrack(NUM_SENDS,NUM_SCENES);
}

//----------

Bitwig.prototype.exit = function() {
}

//----------

Bitwig.prototype.initMidi = function(input,output,midi_handler,sysex_handler,note_input) {
  this.midi_input = host.getMidiInPort(input);
  this.midi_input.setMidiCallback(midi_handler);
  this.midi_input.setSysexCallback(sysex_handler);
  this.midi_output = host.getMidiOutPort(output);
  if (note_input != "none") {
    this.note_input = this.midi_input.createNoteInput(note_input,"8f????","9f????");
    this.note_input.setShouldConsumeEvents(true);
  }
  /*
  var notemap = initArray (-1, 128);
  for (i = 0; i < 128; i++) notemap[i] = i; // 127 - i;
  this.noteInput.setKeyTranslationTable(notemap);
  */  
}

/*
Bitwig.prototype.init_engine_observers = function() {
  var index;
  index = create_observer("active engine",ENGINE,ENGINE_IS_ACTIVE);
  application.hasActiveEngine().addValueObserver( bitwig_observer(index) );
}
*/

//----------

Bitwig.prototype.initApplication = function() {
  this.application.hasActiveEngine().addValueObserver( this.observer01(OBS_APPLICATION_ACTIVE_ENGINE) );
}

//----------

Bitwig.prototype.initTransport = function() {
  this.transport = host.createTransport();
  this.transport.isPlaying().addValueObserver(                this.observer01(OBS_TRANSPORT_PLAY) );
  this.transport.isMetronomeEnabled().addValueObserver(       this.observer01(OBS_TRANSPORT_METRONOME) );
  this.transport.isArrangerRecordEnabled().addValueObserver(  this.observer01(OBS_TRANSPORT_RECORD) );
  //transport.addLauncherOverdubObserver(             handler( EVENT_TRANSPORT_IS_OVERDUBBING ) );
  //transport.addIsRecordingObserver(                 handler( EVENT_TRANSPORT_IS_RECORDING ) );
  //transport.addIsPlayingObserver(                   handler( EVENT_TRANSPORT_IS_PLAYING ) );
  //transport.getTimeSignature().markInterested();
}

//----------

Bitwig.prototype.initTracks = function() {
  //scene_bank = host.createSceneBank(NUM_SCENES);
  this.root_track = this.project.getShownTopLevelTrackGroup();
  this.track_bank = this.root_track.createMainTrackBank(NUM_TRACKS,NUM_SENDS,NUM_SCENES,false);
  this.track_bank.addCanScrollTracksDownObserver( this.observer01(OBS_GRID_CAN_SCROLL_LEFT) );
  this.track_bank.addCanScrollTracksUpObserver(   this.observer01(OBS_GRID_CAN_SCROLL_RIGHT) );
  this.track_bank.addCanScrollScenesDownObserver( this.observer01(OBS_GRID_CAN_SCROLL_DOWN) );
  this.track_bank.addCanScrollScenesUpObserver(   this.observer01(OBS_GRID_CAN_SCROLL_UP) );
  //trackbank.addTrackScrollPositionObserver( trackbank_trackscrollposition_observer(), -1 );
  //trackbank.addSceneScrollPositionObserver( trackbank_scenescrollposition_observer(), -1 );
  //trackbank.addChannelCountObserver( trackbank_channelcount_observer() );
  //trackbank.addSceneCountObserver( trackbank_scenecount_observer() );
  //trackbank.addSendCountObserver( trackbank_sendcount_observer() );
  for (var tr=0; tr<NUM_TRACKS; tr++) {
    var track = this.track_bank.getItemAt(tr);
    track.exists().addValueObserver(              this.observer11(OBS_TRACK_EXISTS,tr) );
    track.addIsSelectedInMixerObserver(           this.observer11(OBS_TRACK_SELECTED,tr) );
    track.isQueuedForStop().addValueObserver(     this.observer11(OBS_TRACK_QUEUED_STOP,tr) );
    track.isStopped().addValueObserver(           this.observer11(OBS_TRACK_STOPPED,tr) );
    track.mute().addValueObserver(                this.observer11(OBS_TRACK_MUTE,tr) );
    track.solo().addValueObserver(                this.observer11(OBS_TRACK_SOLO,tr) );
    track.arm().addValueObserver(                 this.observer11(OBS_TRACK_ARM,tr) );
    track.crossFadeMode().addValueObserver(       this.observer11(OBS_TRACK_AB,tr) );
    track.volume().addValueObserver(              this.observer11(OBS_TRACK_VOLUME,tr) );
    track.pan().addValueObserver(                 this.observer11(OBS_TRACK_PAN,tr) );
    //track.addNameObserver( 255, "unknown", track_name_observer(tr) );    
    //track.addColorObserver( track_color_observer(tr) );
    //track.addPositionObserver( track_position_observer(tr) );    
    //track.addTrackTypeObserver( 255, "unknown", track_type_observer(tr) );    
    //track.addVuMeterObserver( OBS_MAX_VALUE, -1, true, track_vumeter_observer(tr) );
    //track.addIsGroupObserver( track_isgroup_observer(tr) ); // > 1.2
    //track.getAutoMonitor().addValueObserver( track_automonitor_observer(tr) );
    //track.getMonitor().addValueObserver( track_monitor_observer(tr) );
    //track.isActivated().addValueObserver( track_isactivated_observer(tr) );
    for (var j=0; j<NUM_SENDS; j++) {
      track.sendBank().getItemAt(j).addValueObserver( this.observer21(OBS_TRACK_SEND,tr,j) );
    }
  }
  for (var i=0; i<NUM_SCENES; i++) {
    var scene = this.track_bank.sceneBank().getScene(i);
    scene.name().addValueObserver(  this.observer11(OBS_MASTER_SCENE_NAME,i) );    
    scene.color().addValueObserver( this.observer13c(OBS_MASTER_SCENE_COLOR,i) );
  }
}

//----------

Bitwig.prototype.initClips = function() {
  for (var tr=0; tr<NUM_TRACKS; tr++) {
    var track = this.track_bank.getItemAt(tr);
    var clip_launcher = track.getClipLauncherSlots();
    clip_launcher.setIndication(true);
    clip_launcher.addHasContentObserver(          this.observer12(OBS_CLIP_HAS_CONTENT,tr) );    
    clip_launcher.addIsPlayingObserver(           this.observer12(OBS_CLIP_PLAYING,tr) );
    clip_launcher.addIsRecordingObserver(         this.observer12(OBS_CLIP_RECORDING,tr) );
    clip_launcher.addIsPlaybackQueuedObserver(    this.observer12(OBS_CLIP_QUEUED_PLAY,tr) );    
    clip_launcher.addIsStopQueuedObserver(        this.observer12(OBS_CLIP_QUEUED_STOP,tr) );    
    clip_launcher.addIsRecordingQueuedObserver(   this.observer12(OBS_CLIP_QUEUED_RECORD,tr) );    
    clip_launcher.addNameObserver(                this.observer12(OBS_CLIP_NAME,tr) );    
    clip_launcher.addColorObserver(               this.observer14c(OBS_CLIP_COLOR,tr) );
    clip_launcher.addIsSelectedObserver(          this.observer12(OBS_CLIP_SELECTED,tr) );    
    //cliplauncher.addIsQueuedObserver( bitwig_observer(OBS_CLIP_QUEUED,tr) );    
    //cliplauncher.addPlaybackStateObserver( bitwig_observer(OBS_CLIP_STATE,tr) );    
  }
}

//----------

Bitwig.prototype.initScenes = function() {
  this.scene_bank = host.createSceneBank(NUM_CLIPS);
  for (var i=0; i<NUM_CLIPS; i++) {
    var scene = this.scene_bank.getScene(i);
    scene.name().addValueObserver(  this.observer11(OBS_SCENE_NAME,i) );    
    scene.color().addValueObserver( this.observer13c(OBS_SCENE_COLOR,i) );
  }
  //scene_bank = root_track.createMainTrackBank(NUM_TRACKS,NUM_SENDS,NUM_SCENES,false);
  //scene_bank.addColorObserver( bitwig_observer5(OBS_SCENE_COLOR,0) );
  //scene_bank.addNameObserver
  //scene_bank.CanScrollForwardsObserver
  //scene_bank.addCanScrollBackwardsUpObserver
}

//bitwig_scrollScenes()up/down)

//----------

Bitwig.prototype.initDevices = function() {
  //cursordevice = host.createCursorDevice();
  //cursor_track = host.createCursorTrack(NUM_SENDS,NUM_SCENES);
  //primary_device = cursor_track.getPrimaryDevice();
  this.cursor_track = host.createArrangerCursorTrack(NUM_SENDS,NUM_SCENES);
  this.cursor_device = this.cursor_track.createCursorDevice(null);
  
  //primary_device.addPresetCategoriesObserver( device_presetcategories_observer() );
  //primary_device.addPresetCreatorsObserver( device_presetcreators_observer() );
  //primary_device.addPresetNamesObserver( device_presetnames_observer() );
  //primary_device.addPresetNameObserver( 255,"-",device_presetname_observer() );
  //primary_device.addCanSwitchToDeviceObserver( DeviceType.ANY, ChainLocation.PREVIOUS, device_canscrollleft_observer() );
  //primary_device.addCanSwitchToDeviceObserver( DeviceType.ANY, ChainLocation.NEXT, device_canscrollright_observer() );
  
  this.cursor_device.hasPrevious().addValueObserver(    this.observer01(OBS_DEVICE_PREV) );
  this.cursor_device.hasNext().addValueObserver(        this.observer01(OBS_DEVICE_NEXT) );
  this.cursor_device.isEnabled().addValueObserver(      this.observer01(OBS_DEVICE_ENABLED) );
  this.cursor_device.isPinned().addValueObserver(       this.observer01(OBS_DEVICE_PINNED) );
  //cursor_device.addPageNamesObserver(              handler(EVENT_DEVICE_PAGE_NAMES) );

  //remote_controls = primary_device.createCursorRemoteControlsPage(NUM_REMOTE_CONTROLS);
  this.remote_controls = this.cursor_device.createCursorRemoteControlsPage(NUM_REMOTE_CONTROLS);
  
  for (var i=0; i<NUM_REMOTE_CONTROLS; i++) {
    this.remote_controls.getParameter(i).addValueObserver( this.observer11(OBS_REMOTE_CONTROL,i) );
  }

  this.remote_controls.hasPrevious().addValueObserver(  this.observer01(OBS_REMOTE_PREV) )
  this.remote_controls.hasNext().addValueObserver(      this.observer01(OBS_REMOTE_NEXT) )
}

//----------

Bitwig.prototype.initUserControls = function() {
  this.user_controls = host.createUserControls(NUM_USER_CONTROLS);
  for (var i=0; i<NUM_USER_CONTROLS; i++) {
    var control = this.user_controls.getControl(i);
    control.setLabel("user ctrl " + i);
    control.addValueObserver( this.observer11(OBS_USER_CONTROL,i) );
  }
}

//----------

Bitwig.prototype.initActions = function() {
  this.actions = this.application.getActions();
  //var num = actions.length;
  //for (var i=0; i<num; i++) {
  //  println( i + " " + actions[i].getName() );
  //  //action_names[i] = actions[i];
  //}
}

//----------

Bitwig.prototype.initMaster = function() {
  this.master_track = host.createMasterTrack(NUM_SCENES);
  this.master_track.volume().addValueObserver(    this.observer01(OBS_MASTER_VOLUME) );
  this.master_track.addIsSelectedInMixerObserver( this.observer01(OBS_MASTER_SELECTED) );
    
  //master_track.addNameObserver( 255, "unknown", track_name_observer(tr) );    
  //master_track.addColorObserver( track_color_observer(tr) );
  //master_track.addPositionObserver( track_position_observer(tr) );    
  //master_track.addTrackTypeObserver( 255, "unknown", track_type_observer(tr) );    
  //master_track.addVuMeterObserver( OBS_MAX_VALUE, -1, true, track_vumeter_observer(tr) );
  //master_track.addIsGroupObserver( track_isgroup_observer(tr) ); // > 1.2
  //master_track.getAutoMonitor().addValueObserver( track_automonitor_observer(tr) );
  //master_track.getMonitor().addValueObserver( track_monitor_observer(tr) );
  //master_track.isActivated().addValueObserver( track_isactivated_observer(tr) );
}

//----------------------------------------------------------------------
//
// observers
//
//----------------------------------------------------------------------

Bitwig.prototype.observerName = function(id)  {
  switch (id) {
    case OBS_UNKNOWN:               return "OBS_UNKNOWN"; break;
    case OBS_GRID:                  return "OBS_GRID"; break;
    case OBS_GRID_CAN_SCROLL_UP:    return "OBS_GRID_CAN_SCROLL_UP"; break;
    case OBS_GRID_CAN_SCROLL_DOWN:  return "OBS_GRID_CAN_SCROLL_DOWN"; break;
    case OBS_GRID_CAN_SCROLL_LEFT:  return "OBS_GRID_CAN_SCROLL_LEFT"; break;
    case OBS_GRID_CAN_SCROLL_RIGHT: return "OBS_GRID_CAN_SCROLL_RIGHT"; break;
    case OBS_TRACK:                 return "OBS_TRACK"; break;
    case OBS_TRACK_EXISTS:          return "OBS_TRACK_EXISTS"; break;
    case OBS_TRACK_SELECTED:        return "OBS_TRACK_SELECTED"; break;
//    case OBS_TRACK_PLAYING:         return "OBS_TRACK_PLAYING"; break;
    case OBS_TRACK_QUEUED_STOP:     return "OBS_TRACK_QUEUED_STOP"; break;
    case OBS_TRACK_STOPPED:         return "OBS_TRACK_STOPPED"; break;
    case OBS_TRACK_MUTE:            return "OBS_TRACK_MUTE"; break;
    case OBS_TRACK_SOLO:            return "OBS_TRACK_SOLO"; break;
    case OBS_TRACK_ARM:             return "OBS_TRACK_ARM"; break;
    case OBS_TRACK_AB:              return "OBS_TRACK_AB"; break;
    case OBS_TRACK_VOLUME:          return "OBS_TRACK_VOLUME"; break;
    case OBS_TRACK_PAN:             return "OBS_TRACK_PAN"; break;
    case OBS_TRACK_SEND:            return "OBS_TRACK_SEND"; break;
    case OBS_CLIP:                  return "OBS_CLIP"; break;
    case OBS_CLIP_HAS_CONTENT:      return "OBS_CLIP_HAS_CONTENT"; break;
    case OBS_CLIP_PLAYING:          return "OBS_CLIP_PLAYING"; break;
    case OBS_CLIP_RECORDING:        return "OBS_CLIP_RECORDING"; break;
    case OBS_CLIP_QUEUED_PLAY:      return "OBS_CLIP_QUEUED_PLAY"; break;
    case OBS_CLIP_QUEUED_STOP:      return "OBS_CLIP_QUEUED_STOP"; break;
    case OBS_CLIP_QUEUED_RECORD:    return "OBS_CLIP_QUEUED_RECORD"; break;
    case OBS_CLIP_NAME:             return "OBS_CLIP_NAME"; break;
    case OBS_CLIP_COLOR:            return "OBS_CLIP_COLOR"; break;
    case OBS_CLIP_SELECTED:         return "OBS_CLIP_SELECTED"; break;
    case OBS_SCENE:                 return "OBS_SCENE"; break;
    case OBS_SCENE_NAME:            return "OBS_SCENE_NAME"; break;
    case OBS_SCENE_COLOR:           return "OBS_SCENE_COLOR"; break;
    case OBS_DEVICE:                return "OBS_DEVICE"; break;
    case OBS_DEVICE_PREV:           return "OBS_DEVICE_PREV"; break;
    case OBS_DEVICE_NEXT:           return "OBS_DEVICE_NEXT"; break;
    case OBS_DEVICE_ENABLED:        return "OBS_DEVICE_ENABLED"; break;
    case OBS_DEVICE_PINNED:         return "OBS_DEVICE_PINNED"; break;
    case OBS_MASTER:                return "OBS_MASTER"; break;
    case OBS_MASTER_VOLUME:         return "OBS_MASTER_VOLUME"; break;
    case OBS_MASTER_SELECTED:       return "OBS_MASTER_SELECTED"; break;
    case OBS_MASTER_SCENE_NAME:     return "OBS_MASTER_SCENE_NAME"; break;
    case OBS_MASTER_SCENE_COLOR:    return "OBS_MASTER_SCENE_COLOR"; break;
    case OBS_REMOTE:                return "OBS_REMOTE"; break;
    case OBS_REMOTE_CONTROL:        return "OBS_REMOTE_CONTROL"; break;
    case OBS_REMOTE_PREV:           return "OBS_REMOTE_PREV"; break;
    case OBS_REMOTE_NEXT:           return "OBS_REMOTE_NEXT"; break;
    case OBS_USER:                  return "OBS_USER"; break;
    case OBS_USER_CONTROL:          return "OBS_USER_CONTROL"; break;
    case OBS_TRANSPORT:             return "OBS_TRANSPORT"; break;
    case OBS_TRANSPORT_PLAY:        return "OBS_TRANSPORT_PLAY"; break;
    case OBS_TRANSPORT_RECORD:      return "OBS_TRANSPORT_RECORD"; break;
    case OBS_TRANSPORT_METRONOME:   return "OBS_TRANSPORT_METRONOME"; break;
    case OBS_APPLICATION:               return "OBS_APPLICATION"; break;
    case OBS_APPLICATION_ACTIVE_ENGINE: return "OBS_APPLICATION_ACTIVE_ENGINE"; break;
  }
}

//----------

/*
  if we had an observer function/method for each observer type, we wouldn't
  need this big switch/case..
*/

Bitwig.prototype.saveObserverValue = function(id,value,x,y) {

  i3 = ((NUM_SCENES - 1 - y) * NUM_TRACKS) + x;
  i4 = (                  y  * NUM_TRACKS) + x;
  
  //id_major = id & 0xff00;
  //id_minor = id & 0x00ff;
  
  switch (id) {

    case OBS_TRANSPORT_PLAY:        this.obs_transport_play = value;              break;
    case OBS_TRANSPORT_RECORD:      this.obs_transport_record = value;            break;
    case OBS_TRANSPORT_METRONOME:   this.obs_transport_metronome = value;         break;
    case OBS_GRID_CAN_SCROLL_UP:    this.obs_grid_can_scroll_up = value;          break;
    case OBS_GRID_CAN_SCROLL_DOWN:  this.obs_grid_can_scroll_down = value;        break;
    case OBS_GRID_CAN_SCROLL_LEFT:  this.obs_grid_can_scroll_left = value;        break;
    case OBS_GRID_CAN_SCROLL_RIGHT: this.obs_grid_can_scroll_right = value;       break;
    case OBS_DEVICE_PREV:           this.obs_device_prev = value;                 break;
    case OBS_DEVICE_NEXT:           this.obs_device_next = value;                 break;
    case OBS_DEVICE_ENABLED:        this.obs_device_enabled = value;              break;
    case OBS_DEVICE_PINNED:         this.obs_device_pinned = value;               break;
    case OBS_MASTER_VOLUME:         this.obs_master_volume = value;               break;
    case OBS_MASTER_SELECTED:       this.obs_master_selected = value;             break;
    case OBS_REMOTE_PREV:           this.obs_remote_prev = value;                 break;
    case OBS_REMOTE_NEXT:           this.obs_remote_next = value;                 break;
    
    // observer2
    
    case OBS_TRACK_EXISTS:          this.obs_track_exists[x] = value;             break;
    case OBS_TRACK_SELECTED:        this.obs_track_selected[x] = value;           break;
    case OBS_TRACK_QUEUED_STOP:     this.obs_track_queued_stop[x] = value;        break;
    case OBS_TRACK_STOPPED:         this.obs_track_stopped[x] = value;            break;
    case OBS_TRACK_MUTE:            this.obs_track_mute[x] = value;               break;
    case OBS_TRACK_SOLO:            this.obs_track_solo[x] = value;               break;
    case OBS_TRACK_ARM:             this.obs_track_arm[x] = value;                break;
    case OBS_TRACK_AB:              this.obs_track_ab[x] = value;                 break;
    case OBS_TRACK_VOLUME:          this.obs_track_volume[x] = value;             break;
    case OBS_TRACK_PAN:             this.obs_track_pan[x] = value;                break;
    case OBS_REMOTE_CONTROL:        this.obs_remote_control[x] = value;           break;
    case OBS_USER_CONTROL:          this.obs_user_control[x] = value;             break;

    // observer3
    
    case OBS_CLIP_HAS_CONTENT:      this.obs_clip_has_content[i3] = value;    break;
    case OBS_CLIP_PLAYING:          this.obs_clip_playing[i3] = value;        break;
    case OBS_CLIP_RECORDING:        this.obs_clip_recording[i3] = value;      break;
    case OBS_CLIP_QUEUED_PLAY:      this.obs_clip_queued_play[i3] = value;    break;
    case OBS_CLIP_QUEUED_STOP:      this.obs_clip_queued_stop[i3] = value;    break;
    case OBS_CLIP_QUEUED_RECORD:    this.obs_clip_queued_record[i3] = value;  break;
    case OBS_CLIP_NAME:             this.obs_clip_name[i3] = value;           break;
    case OBS_CLIP_COLOR:            this.obs_clip_color[i3] = value;          break;
    case OBS_CLIP_SELECTED:         this.obs_clip_selected[i3] = value;       break;
    
    // observer4
    
    case OBS_TRACK_SEND:            this.obs_track_send[i4] = value;          break;
    
    //---
    
    case OBS_SCENE_NAME:            this.obs_scene_name[x] = value;               break;
    case OBS_SCENE_COLOR:           this.obs_scene_color[x] = value;              break;
    
    case OBS_MASTER_SCENE_NAME:     this.obs_master_scene_name[x] = value;        break;
    case OBS_MASTER_SCENE_COLOR:    this.obs_master_scene_color[x] = value;       break;
    
    case OBS_APPLICATION_ACTIVE_ENGINE:
      this.obs_application_active_engine = value;
      //println("bitwig.obs_application_active_engine = ",this.obs_application_active_engine);
      break;
    
    
  } // switch
}

//----------------------------------------------------------------------

// id -> value,0,0
// 0 arguments, 1 value

Bitwig.prototype.observer01 = function(id) {
  return function(v1) {
    bitwig.saveObserverValue(id,v1,0,0);
    controller.onObserver(id,v1,0,0);
  }
}

// id,x -> value,x,0
// 1 argument, 1 value

Bitwig.prototype.observer11 = function(id,arg1) {
  return function(v1) {
    bitwig.saveObserverValue(id,v1,arg1,0);
    controller.onObserver(id,v1,arg1,0);
  }
}

// id,x -> value,x,y
// 1 argument, 2 values

Bitwig.prototype.observer12 = function(id,arg1) {
  return function(v1,v2) {
    bitwig.saveObserverValue(id,v2,arg1,v1);
    controller.onObserver(id,v2,arg1,v1);
  }
}

// id,x,y -> value,x,y
// 2 arguments, 1 value

Bitwig.prototype.observer21 = function(id,arg1,arg2) {
  return function(v1) {
    bitwig.saveObserverValue(id,v1,arg1,arg2);
    controller.onObserver(id,v1,arg1,arg2);
  }
}

// (rgb)
// id,x,y -> value,x,0
// 1 argument, 3 values -> 1 (color)

Bitwig.prototype.observer13c = function(id,arg1) {
  return function(r,g,b) {
    var c = bitwig.findColor(r,g,b);
    //println(" arg1 " + arg1 + " c " + c);
    bitwig.saveObserverValue(id,c,arg1,0);
    controller.onObserver(id,c,arg1,0);
  }
}

// (rgb)
// id,x,y -> value,x,y
// 1 argument, 4 values -> 2 (color,value)

Bitwig.prototype.observer14c = function(id,arg1) {
  return function(v1,r,g,b) {
    var c = bitwig.findColor(r,g,b);
    bitwig.saveObserverValue(id,c,arg1,v1);
    controller.onObserver(id,c,arg1,v1);
  }
}

//----------------------------------------------------------------------
//
// color
//
//----------------------------------------------------------------------

Bitwig.prototype.findColor = function(red,green,blue) {
  if ((red < 0.001) && (green < 0.001) && (blue < 0.001)) return 0;
  var closest = 999999;
  var result  = 0; // -1;
  for (var i=0; i<BITWIG_COLORS_COUNT; i++) {
    var r = BITWIG_COLORS_RGB[i * 3    ];
    var g = BITWIG_COLORS_RGB[i * 3 + 1];
    var b = BITWIG_COLORS_RGB[i * 3 + 2];
    var rdist = Math.abs(red - r);
    var gdist = Math.abs(green - g);
    var bdist = Math.abs(blue - b);
    var dist  = Math.sqrt ((rdist * rdist) + (gdist * gdist) + (bdist * bdist));
    if (dist < closest) {
      closest = dist;
      result = i;
    }
  }
  return BITWIG_COLORS[result];
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//------------------------------
// application
//------------------------------

Bitwig.prototype.activateEngine = function() {
  this.application.activateEngine();
}

Bitwig.prototype.deactivateEngine = function() {
  this.application.deactivateEngine();
}

Bitwig.prototype.selectPreviousProject = function() {
  this.application.nextProject();
}

Bitwig.prototype.selectNextProject = function() {
  this.application.nextProject();
}

Bitwig.prototype.undo = function() {
  this.application.undo();
}

Bitwig.prototype.redo = function() {
  this.application.redo();
}

// clip/dev ciew
Bitwig.prototype.selectNextPanelView = function() {
  this.application.nextSubPanel();
}

// detail view
Bitwig.prototype.selectNextPanelLayout = function() {
  this.application.nextPanelLayout();
}

// toggle detail view on/off
Bitwig.prototype.toggleDeviceView = function() {
  this.application.toggleDevices();
}

Bitwig.prototype.copy = function() {
  this.application.copy();
}

Bitwig.prototype.paste = function() {
  this.application.paste();
}

//------------------------------
// cursor_device
//------------------------------

Bitwig.prototype.selectPreviousDevice = function() {
  this.cursor_device.selectPrevious();
}

Bitwig.prototype.selectNextDevice = function() {
  this.cursor_device.selectNext();
}

Bitwig.prototype.toggleDeviceEnabled = function() {
  this.cursor_device.isEnabled().toggle();
}

Bitwig.prototype.toggleDevicePinned = function() {
  this.cursor_device.isPinned().toggle();
}

//------------------------------
// master_track
//------------------------------

Bitwig.prototype.selectMasterTrack = function() {
  this.master_track.selectInMixer();
}

Bitwig.prototype.setMasterVolume = function(value) {
  this.master_track.getVolume().set(value/*,MAX_VALUE*/);
}

//------------------------------
// note_input
//------------------------------

Bitwig.prototype.sendMidiEvent = function(msg,chan,index,value) {
  this.note_input.sendRawMidiEvent(msg+chan,index,value);
}

//------------------------------
// remote_controls
//------------------------------

Bitwig.prototype.resetRemoteControl = function(index) {
  this.remote_controls.getParameter(index).reset();
}

Bitwig.prototype.setRemoteControl = function(index,value) {
  this.remote_controls.getParameter(index).value().set(value/*,MAX_VALUE*/);
}

Bitwig.prototype.selectRemoteControlPage = function(index) {
  this.remote_controls.selectedPageIndex().set(index);
}

Bitwig.prototype.selectPreviousRemoteControlPage = function() {
  this.remote_controls.selectPrevious();
}

Bitwig.prototype.selectNextRemoteControlPage = function() {
  this.remote_controls.selectNext();
}

//------------------------------
// scene_bank
//------------------------------

Bitwig.prototype.launchScene2 = function(index) {
  this.scene_bank.launchScene(index);
}

Bitwig.prototype.scrollScenes = function(direction,bank) {
  switch (direction) {
    case UP:
      if (bank) this.scene_bank.scrollPageUp();
      else this.scene_bank.scrollUp();
      break;
    case DOWN:
      if (bank) this.scene_bank.scrollPageDown();
      else this.scene_bank.scrollDown();
      break;
  }
}

//------------------------------
// track_bank
//------------------------------

Bitwig.prototype.launchScene = function(index) {
  this.track_bank.launchScene(index);
}

//----------

Bitwig.prototype.launchClip = function(track,clip) {
  this.track_bank.getChannel(track).clipLauncherSlotBank().launch(clip);
}

Bitwig.prototype.deleteClip = function(track,clip) {
  this.track_bank.getChannel(track).clipLauncherSlotBank().deleteClip(clip);
}

Bitwig.prototype.selectClip = function(track,clip) {
  this.track_bank.getChannel(track).clipLauncherSlotBank().select(clip);
}

Bitwig.prototype.stopClip = function(index) {
  this.track_bank.getChannel(index).stop();
}

Bitwig.prototype.stopAllClips = function() {
  this.track_bank.getClipLauncherScenes().stop();
}

Bitwig.prototype.scrollGrid = function(direction,bank) {
  switch (direction) {
    case UP:
      if (bank) this.track_bank.scrollScenesPageUp();
      else this.track_bank.scrollScenesUp();
      break;
    case DOWN:
      if (bank) this.track_bank.scrollScenesPageDown();
      else this.track_bank.scrollScenesDown();
      break;
    case LEFT:
      if (bank) this.track_bank.scrollTracksPageUp();   //Down();
      else this.track_bank.scrollTracksUp();            //Down();
      break;
    case RIGHT:
      if (bank) this.track_bank.scrollTracksPageDown(); //Up();
      else this.track_bank.scrollTracksDown();          //Up();
      break;
  }
}

Bitwig.prototype.selectTrack = function(track) {
  this.track_bank.getChannel(track).selectInMixer();
}

Bitwig.prototype.setTrackVolume = function(track,value) {
  this.track_bank.getChannel(track).getVolume().set(value/*,MAX_VALUE*/);
}

Bitwig.prototype.setTrackPan = function(track,value) {
  this.track_bank.getChannel(track).getPan().set(value/*,MAX_VALUE*/);
}

Bitwig.prototype.setTrackSend = function(track,index,value) {
  this.track_bank.getChannel(track).getSend(index).set(value/*,MAX_VALUE*/);
}

Bitwig.prototype.resetTrackPan = function(track) {
  this.track_bank.getChannel(track).getPan().reset();
}

Bitwig.prototype.resetTrackSend = function(track,index) {
  this.track_bank.getChannel(track).getSend(index).reset();
}

Bitwig.prototype.toggleTrackMute = function(track) {
  this.track_bank.getChannel(track).getMute().toggle();//set(true);
}

Bitwig.prototype.toggleTrackSolo = function(track) {
  this.track_bank.getChannel(track).getSolo().toggle();//set(true);
}

Bitwig.prototype.toggleTrackArm = function(track) {
  this.track_bank.getChannel(track).getArm().toggle();//set(true);
}

Bitwig.prototype.toggleTrackAB = function(track) {
  var ab = this.track_bank.getChannel(track).getCrossFadeMode().get();
  switch (ab) {
    case "A":   this.track_bank.getChannel(track).getCrossFadeMode().set("B");   break;
    case "B":   this.track_bank.getChannel(track).getCrossFadeMode().set("AB");  break;
    case "AB":  this.track_bank.getChannel(track).getCrossFadeMode().set("A");   break;
  }
}

//------------------------------
// transport
//------------------------------

Bitwig.prototype.setCrossfade = function(value) {
  this.transport.getCrossfade().set(value/*,MAX_VALUE*/);
}

Bitwig.prototype.resetCrossfade = function() {
  this.transport.getCrossfade().reset();
}

Bitwig.prototype.incMetronomeVolume = function(value) {
  this.transport.metronomeVolume().inc(value);
}

Bitwig.prototype.incTempo = function(value) {
  this.transport.increaseTempo(value,647);
}

Bitwig.prototype.tapTempo = function() {
  this.transport.tapTempo();
}

Bitwig.prototype.toggleMetronome = function() {
  this.transport.isMetronomeEnabled().toggle();
}

Bitwig.prototype.togglePlay = function() {
  this.transport.togglePlay();
}

Bitwig.prototype.toggleRecord = function() {
  this.transport.isArrangerRecordEnabled().toggle();
}

Bitwig.prototype.toggleRecordAutomation = function() {
  this.transport.isArrangerAutomationWriteEnabled().toggle();
}

Bitwig.prototype.toggleOverdub = function() {
  this.transport.toggleLauncherOverdub();
}

Bitwig.prototype.toggleOverdubAutomation = function() {
  this.transport.toggleWriteClipLauncherAutomation();
}

Bitwig.prototype.setTempo = function(bpm) {
}

Bitwig.prototype.setTimeSignature = function(num,denom) {
  //this.transport.getTimeSignature().set("3/4");
  //this.transport.getTimeSignature().get().charAt(0);
}

Bitwig.prototype.setTimeSigNum = function(num) {
  this.transport.timeSignature().numerator().set(num);
}

Bitwig.prototype.setTimeSigDenom = function(denom) {
  this.transport.timeSignature().denominator().set(denom);
}

Bitwig.prototype.stop = function() {
  this.transport.stop();;
}

//------------------------------
// user_controls
//------------------------------

Bitwig.prototype.setUserControl = function(index,value) {
  this.user_controls.getControl(index).set(value/*,MAX_VALUE*/);
}

Bitwig.prototype.resetUserControl = function(index) {
  this.user_controls.getParameter(index).reset();
}

