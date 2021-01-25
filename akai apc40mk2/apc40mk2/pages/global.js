
globalPage = function(name) {
  Page.call(this,name);
}

//----------

globalPage.prototype = Object.create(Page.prototype);
globalPage.prototype.constructor = globalPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//globalPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//globalPage.prototype.exit = function() {
//}

//----------

globalPage.prototype.select = function() {
  this.updateTrackEncoders();
  //this.updateGrid();
  this.updateClipStop();
  this.updateSelectedTrack();
  this.updateTracks();
  this.updateSceneLaunch();
  this.updatePanSendsUser();
  this.updateTrack();
  this.updateDeviceEncoders();
  this.updateDeviceButtons();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

globalPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  //println("globalPage.onControl " + control.id + " " + chn + " " + data1 + " " + data2);
  var pressed = (data2 > 63);
  if ((msg == MIDI_NOTE_ON) || (msg == MIDI_NOTE_OFF)) {
    switch (control.id) {
    
      //case BUTTON_GRID:
      //  break;
    
      case BUTTON_CLIP_STOP:
        if (pressed) bitwig.stopClip(chn);
        break;
    
      case BUTTON_TRACK_SELECT:
        if (pressed) {
          //controller.selected_track = chn;
          bitwig.selectTrack(chn);
        }
        break;
    
      case BUTTON_MUTE:
        if (pressed) bitwig.toggleTrackMute(chn);
        break;
    
      case BUTTON_SOLO:
        if (pressed) bitwig.toggleTrackSolo(chn);
        break;
    
      case BUTTON_ARM:
        if (pressed) bitwig.toggleTrackArm(chn);
        break;
    
      case BUTTON_AB:
        if (pressed) bitwig.toggleTrackAB(chn);
        break;
        
      //-----
        
      case BUTTON_SCENE_LAUNCH:
        if (pressed) {
          var index = control.index;
          
          if (controller.shiftbank_pressed && controller.shiftbank_selector) {
            controller.shiftbank_selector.select(index);
          }
          else if (controller.shift_pressed && controller.shift_selector) {
            controller.shift_selector.select(index);
          }
          else if (controller.bank_pressed && controller.bank_selector) {
            controller.bank_selector.select(index);
          }
          else if (controller.pan_pressed && controller.pan_selector) {
            controller.pan_selector.select(index);
            this.updateTrackEncoders();
          }
          else if (controller.sends_pressed && controller.sends_selector) {
            controller.sends_selector.select(index);
            this.updateTrackEncoders();
          }
          else if (controller.user_pressed && controller.user_selector) {
            controller.user_selector.select(index);
            this.updateTrackEncoders();
          }
          else if (controller.global_selector) {
            controller.global_selector.select(index);
          }
        }
        break;
        
      //-----
        
      case BUTTON_STOP_ALL:
        if (pressed) bitwig.stopAllClips();
        break;
        
      case BUTTON_MASTER:
        if (pressed) {
          //controller.selected_track = 8;//chn;
          bitwig.selectMasterTrack();
        }
        break;
        
      //-----
        
      case BUTTON_PAN:
        controller.pan_pressed = pressed;
        if (pressed) {
          controller.pansendsuser_mode = 0;
          this.updatePanSendsUser();
          this.updateTrackEncoders();
        }
        this.updateSceneLaunch();
        //controller.queueControl(control,data2);
        break;

      case BUTTON_SENDS:
        controller.sends_pressed = pressed;
        if (pressed) {
          controller.pansendsuser_mode = 1;
          this.updatePanSendsUser();
          this.updateTrackEncoders();
        }
        this.updateSceneLaunch();
        //controller.queueControl(control,data2);
        break;

      case BUTTON_USER:
        controller.user_pressed = pressed;
        if (pressed) {
          controller.pansendsuser_mode = 2;
          this.updatePanSendsUser();
          this.updateTrackEncoders();
        }
        this.updateSceneLaunch();
        //controller.queueControl(control,data2);
        break;
        
      //-----
        
      case BUTTON_PLAY:
        if (pressed) {
          /*if (controller.shift_pressed) bitwig.toggleRecordAutomation()
          else*/ bitwig.togglePlay();
        }
        break;
        
      case BUTTON_RECORD:
        if (pressed) {
          if (controller.shift_pressed) bitwig.toggleRecordAutomation();
          else bitwig.toggleRecord();
        }
        break;
        
      case BUTTON_SESSION:
        if (pressed) {
          if (controller.shift_pressed) bitwig.toggleOverdubAutomation();
          bitwig.toggleOverdub();
        }
        break;
        
      //-----
        
      case BUTTON_METRONOME:
        if (pressed) bitwig.toggleMetronome();
        break;
        
      case BUTTON_TAP_TEMPO:
        if (pressed) bitwig.tapTempo();
        break;
        
      case BUTTON_NUDGE_MINUS:
        break;
        
      case BUTTON_NUDGE_PLUS:
        break;
        
      //-----
      
      case BUTTON_DEVICE_MINUS:
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(0);
          else bitwig.selectPreviousDevice();
        }
        break;
        
      case BUTTON_DEVICE_PLUS:
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(1);
          else bitwig.selectNextDevice();
        }
        break;
        
      case BUTTON_BANK_MINUS:
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(2);
          else bitwig.selectPreviousRemoteControlPage();
        }
        break;
        
      case BUTTON_BANK_PLUS:
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(3);
          else bitwig.selectNextRemoteControlPage();
        }
        break;
        
      case BUTTON_DEVICE_ON_OFF:
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(4);
          else bitwig.toggleDeviceEnabled();
        }
        break;
        
      case BUTTON_DEVICE_LOCK:
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(5);
          else bitwig.toggleDevicePinned();
        }
        break;
        
      case BUTTON_CLIP_DEV_VIEW:
        
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(6);
          else bitwig.selectNextPanelView(); //bitwig.toggleDeviceView();
        }
        break;
        
      case BUTTON_DETAIL_VIEW:
        if (pressed) {
          if (controller.bank_pressed) bitwig.selectRemoteControlPage(7);
          else bitwig.selectNextPanelLayout(); //bitwig.selectNextPanelView();
        }
        break;
        
      //-----

      /*
      case BUTTON_ARROW_UP:
        if (pressed) {
          bitwig.scrollGrid(UP,shift_pressed);
        }
        break;
        
      case BUTTON_ARROW_DOWN:
        if (pressed) {
          bitwig.scrollGrid(DOWN,shift_pressed);
        }
        break;
        
      case BUTTON_ARROW_LEFT:
        if (pressed) {
          bitwig.scrollGrid(LEFT,shift_pressed);
        }
        break;
        
      case BUTTON_ARROW_RIGHT:
        if (pressed) {
          bitwig.scrollGrid(RIGHT,shift_pressed);
        }
        break;
      */
      
      //-----
    
      case BUTTON_SHIFT:
        controller.shift_pressed = pressed;
        controller.shiftbank_pressed = (controller.shift_pressed && controller.bank_pressed);
        this.updateSceneLaunch();
        break;

      case BUTTON_BANK:
        controller.bank_pressed = pressed;
        controller.shiftbank_pressed = (controller.shift_pressed && controller.bank_pressed);
        this.updateSceneLaunch();
        this.updateDeviceButtons();
        controller.queueControl(control,data2);
        break;
        
      //----------
       
    }
  }
  
  if (msg == MIDI_CTRL_CHANGE) {
    var v = (data2 / 127);
    var vs = v * SLIDER_VALUE_SCALE;
    switch (control.id) {

      case ENCODER_TRACK:
        switch (controller.pansendsuser_mode) {
          case 0:
            if ((controller.shift_pressed) && (controller.bank_pressed))
              bitwig.resetTrackPan(control.index);
            else
              bitwig.setTrackPan(control.index,v);
            break;
          case 1:
            //println("sends_mode " + sends_mode);
            if ((controller.shift_pressed) && (controller.bank_pressed))
              bitwig.resetTrackSend(control.index,controller.sends_mode);
            else
              bitwig.setTrackSend(control.index,controller.sends_mode,v);
            break;
          case 2:
            if ((controller.shift_pressed) && (controller.bank_pressed))
              bitwig.resetUserControl( (controller.user_mode * NUM_TRACKS) + control.index );
            else
              bitwig.setUserControl( (controller.user_mode * NUM_TRACKS) + control.index + USER_CTRL_TRACK, v );
            break;
        }
        break;
        
      case SLIDER_TRACK:
        //var v = (data2 / 127) * SLIDER_VALUE_SCALE;
        bitwig.setTrackVolume(chn,vs);
        break;
        
      case ENCODER_CUE_LEVEL:
        if (controller.shift_pressed) {
          var f = data2;
          if (f > 63) f -= 128;
          bitwig.incMetronomeVolume(f * METRONOME_LEVEL_SCALE);
        }
        break;
        
      case SLIDER_MASTER:
        //var v = (data2 / 127) * SLIDER_VALUE_SCALE;
        bitwig.setMasterVolume(vs);
        break;
        
      case ENCODER_TEMPO:
        var f = data2;
        if (f > 63) f -= 128;
        bitwig.incTempo(f);
        break;
        
      case ENCODER_DEVICE:
        if ((controller.shift_pressed) && (controller.bank_pressed)) {
          //control.forcedUpdate = true;
          //control.timestamp = 0;
          bitwig.resetRemoteControl(control.index);
        }
        else {
          bitwig.setRemoteControl(control.index,v);
        }
        break;
        
      case SLIDER_CROSSFADE:
        bitwig.setCrossfade(v);
        break;
        
    }
  }
  
}

//----------

globalPage.prototype.onObserver = function(obs,value,x,y) {
  //println("globalPage.onObserver " + obs + " " + value + " " + x + " " + y);
  switch (obs) {

    case OBS_TRACK_EXISTS:
    case OBS_TRACK_MUTE:
    case OBS_TRACK_SOLO:
    case OBS_TRACK_ARM:
    case OBS_TRACK_AB:
      this.updateTrack(x);
      break;
      
    case OBS_TRACK_SELECTED:
      if (value) controller.selected_track = x;
      this.updateSelectedTrack();
      break;
    
    
    case OBS_MASTER_SELECTED:
      if (value) controller.selected_track = 8;
      this.updateSelectedTrack();
      break;
      
    case OBS_TRACK_QUEUED_STOP:
    case OBS_TRACK_STOPPED:
      this.updateClipStop();
      break;
      
    case OBS_TRANSPORT_PLAY:
    case OBS_TRANSPORT_RECORD:
    case OBS_TRANSPORT_METRONOME:
      this.updateTransport();
      break;
      
    //case OBS_SCENE_NAME:
    case OBS_SCENE_COLOR:
      this.updateSceneLaunch();
      break;
      
    case OBS_DEVICE_PREV:
    case OBS_DEVICE_NEXT:
    case OBS_DEVICE_ENABLED:
    case OBS_DEVICE_PINNED:
    case OBS_REMOTE_PREV:
    case OBS_REMOTE_NEXT:
      this.updateDeviceButtons();
      break;
    
    case OBS_REMOTE_CONTROL:
      this.updateDeviceEncoders();
      break;
      
    case OBS_USER_CONTROL:
      this.updateTrackEncoders();
      break;
    
    case OBS_TRACK_PAN:
    case OBS_TRACK_SEND:
    case OBS_USER_CONTROL:
      this.updateTrackEncoders();
      break;

  }
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

globalPage.prototype.updateDeviceButtons = function() {
  var control = null;
  var color = LED_OFF;
  
  if (controller.bank_pressed) {
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_MINUS);
    controller.queueControl(control,LED_OFF);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_PLUS);
    controller.queueControl(control,LED_OFF);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_BANK_MINUS);
    controller.queueControl(control,LED_OFF);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_BANK_PLUS);
    controller.queueControl(control,LED_OFF);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_ON_OFF);
    controller.queueControl(control,LED_OFF);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_LOCK);
    controller.queueControl(control,LED_OFF);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_CLIP_DEV_VIEW);
    controller.queueControl(control,LED_OFF);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DETAIL_VIEW);
    controller.queueControl(control,LED_OFF);
  }
  else {
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_MINUS);
    color = (bitwig.obs_device_prev) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);
    
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_PLUS);
    color = (bitwig.obs_device_next) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);
    
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_BANK_MINUS);
    color = (bitwig.obs_remote_prev) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);
    
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_BANK_PLUS);
    color = (bitwig.obs_remote_next) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);
    
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_ON_OFF);
    color = (bitwig.obs_device_enabled) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);
    
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DEVICE_LOCK);
    color = (bitwig.obs_device_pinned) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);

    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_CLIP_DEV_VIEW);
    controller.queueControl(control,LED_OFF);

    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_DETAIL_VIEW);
    controller.queueControl(control,LED_OFF);
  }
  
}

//----------

globalPage.prototype.updateDeviceEncoders = function() {
  //println("globalPage.updateDeviceEncoders");
  for (var i=0; i<NUM_DEVICE_ENCODERS; i++) {
    var control = controller.getControl(MIDI_CTRL_CHANGE,0,ENCODER_DEVICE+i);
    var value = bitwig.obs_remote_control[i];
    controller.queueControl(control,value);
  }
}

//----------

globalPage.prototype.updateTrackEncoders = function() {
  for (var i=0; i<NUM_TRACK_ENCODERS; i++) {
    var control = controller.getControl(MIDI_CTRL_CHANGE,0,ENCODER_TRACK+i);
    //var value = bitwig.obs_remote_control[i];
    //controller.queueControl(control,value);
    var value = 0;
    switch (controller.pansendsuser_mode) {
      case 0: // pan
        value = bitwig.obs_track_pan[i];
        break;
      case 1: // sends
        value = bitwig.obs_track_send[ (controller.sends_mode * NUM_TRACKS) + i ];
        break;
      case 2: // user
        value = bitwig.obs_user_control[ (controller.user_mode * NUM_TRACKS) + i + USER_CTRL_TRACK ];
        break;
    }
    controller.queueControl(control,value);
    
  }
}

//----------

globalPage.prototype.updateTrack = function(index) {
  //println("updateTrack " + index);
  var control = null;
  var color = LED_OFF;
  if (bitwig.obs_track_exists[index]) {

    //control = controller.getControl(MIDI_NOTE_ON,index,BUTTON_CLIP_STOP);
    //if (bitwig.obs_track_stopped[index]) color = LED_OFF;
    //else if (bitwig.obs_track_queued_stop[index]) color = LED_BLINK;
    //else color = LED_ON;
    //controller.queueControl(control,color);

    //control = controller.getControl(MIDI_NOTE_ON,index,BUTTON_TRACK_SELECT);
    //color = (bitwig.obs_track_selected[index]) ? LED_ON : LED_OFF;
    //controller.queueControl(control,color);
    
    control = controller.getControl(MIDI_NOTE_ON,index,BUTTON_MUTE);
    color = (bitwig.obs_track_mute[index]) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);

    control = controller.getControl(MIDI_NOTE_ON,index,BUTTON_SOLO);
    color = (bitwig.obs_track_solo[index]) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);

    control = controller.getControl(MIDI_NOTE_ON,index,BUTTON_ARM);
    color = (bitwig.obs_track_arm[index]) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);

    control = controller.getControl(MIDI_NOTE_ON,index,BUTTON_AB);
    switch (bitwig.obs_track_ab[index]) {
      case "A"   : color = LED_A; break;
      case "B"  : color = LED_B; break;
      case "AB" : color = LED_OFF; break;
    }
    controller.queueControl(control,color);
  
  }
  else {
  }

}

//----------

globalPage.prototype.updateTracks = function() {
  for (var i=0; i<NUM_TRACKS; i++) {
    this.updateTrack(i);
  }
}

//----------

//globalPage.prototype.updateGrid = function() {
//}

//----------

globalPage.prototype.updateClipStop = function() {
  //println("updateClipStop");
  var control = null;
  var color = LED_OFF;
  for (var i=0; i<NUM_TRACKS; i++) {
    control = controller.getControl(MIDI_NOTE_ON,i,BUTTON_CLIP_STOP);
    if (bitwig.obs_track_exists[i]) {
      if (bitwig.obs_track_stopped[i]) color = LED_OFF;
      else if (bitwig.obs_track_queued_stop[i]) color = LED_BLINK;
      else color = LED_ON;
      controller.queueControl(control,color);
    }
    else {
      color = LED_OFF;
      controller.queueControl(control,color);
    }
  }
}

//----------

globalPage.prototype.updateSelectedTrack = function() {
  //println("updateSelectedTrack");
  var control = null;
  var color = LED_OFF;
  for (var i=0; i<NUM_TRACKS; i++) {
    control = controller.getControl(MIDI_NOTE_ON,i,BUTTON_TRACK_SELECT);
    color = (bitwig.obs_track_selected[i]) ? LED_ON : LED_OFF;
    controller.queueControl(control,color);
  }
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_MASTER);
  color = (bitwig.obs_master_selected) ? LED_ON : LED_OFF;
  controller.queueControl(control,color);
}

//----------

globalPage.prototype.updateSceneLaunch = function() {
  //println("updateSceneLaunch");
  if (controller.shiftbank_pressed  && controller.shiftbank_selector) controller.shiftbank_selector.update();
  else if (controller.shift_pressed && controller.shift_selector)     controller.shift_selector.update();
  else if (controller.bank_pressed  && controller.bank_selector)      controller.bank_selector.update();
  else if (controller.pan_pressed   && controller.pan_selector)       controller.pan_selector.update();
  else if (controller.sends_pressed && controller.sends_selector)     controller.sends_selector.update();
  else if (controller.user_pressed  && controller.user_selector)      controller.user_selector.update();
  else if (controller.global_selector) controller.global_selector.update();
}

//----------

globalPage.prototype.updatePanSendsUser = function() {
  //println("updatePanSendsUser");
  var control = null;
  var color = LED_OFF;
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_PAN);
  color = (controller.pansendsuser_mode==0) ? LED_ON : LED_OFF;
  controller.queueControl(control,color);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_SENDS);
  color = (controller.pansendsuser_mode==1) ? LED_ON : LED_OFF;
  controller.queueControl(control,color);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_USER);
  color = (controller.pansendsuser_mode==2) ? LED_ON : LED_OFF;
  controller.queueControl(control,color);
}

//----------

globalPage.prototype.updateTransport = function() {
  var control = null;
  var color = LED_OFF;
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_PLAY);
  color = (bitwig.obs_transport_play) ? LED_ON : LED_OFF;
  controller.queueControl(control,color);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_RECORD);
  color = (bitwig.obs_transport_record) ? LED_ON : LED_OFF;
  controller.queueControl(control,color);
  //control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_SESSION);
  //color = (bitwig.obs_transport_play) ? LED_ON : LED_OFF;
  //controller.queueControl(control,color);
  control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_METRONOME);
  color = (bitwig.obs_transport_metronome) ? LED_ON : LED_OFF;
  controller.queueControl(control,color);
}

