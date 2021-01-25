
//----------------------------------------------------------------------
// select
//----------------------------------------------------------------------

function select_mixer() {
  draw_page();
  draw_buttons();
  draw_indicators();
  notify_page();
}

//----------------------------------------------------------------------
// knobs & sliders
//----------------------------------------------------------------------

function handle_knob_mixer(x,y,v) {
  var k = x*4 + y;
  //println("k = " + k);
  //println("knob_positions[k] = " + knob_positions[k]);
  if (soloright_pressed) {
    switch(y) {
      case 0:
        trackbank.getTrack(x).getPan().reset();
        host.showPopupNotification("Pan Track " + x + " Reset");
        break;
      case 1:
        trackbank.getTrack(x).getSend(0).reset();
        host.showPopupNotification("Send1 Track " + x + " Reset");
        break;
      case 2:
        trackbank.getTrack(x).getSend(1).reset();
        host.showPopupNotification("Send2 Track " + x + " Reset");
        break;
      case 3:
        trackbank.getTrack(x).getVolume().reset();
        host.showPopupNotification("Volume Track " + x + " Reset");
        break;
    }
  }
  else {
    switch(y) {
      case 0: // pan
        var value_new = scale_value( v, knob_positions[k], track_pan[x] );
        trackbank.getTrack(x).getPan().set(value_new,MAX_VALUE);
        track_pan[x] = value_new;
        host.showPopupNotification("Pan Track " + x + " = " + value_new.toFixed(2) );
        break;
      case 1: // send1
        var value_new = scale_value( v, knob_positions[k], track_send[x] );
        trackbank.getTrack(x).getSend(0).set(value_new,MAX_VALUE);
        track_send[x] = value_new;
        host.showPopupNotification("Send1 Track " + x + " = " + value_new.toFixed(2) );
        break;
      case 2: // send2
        var value_new = scale_value( v, knob_positions[k], track_send[NUM_SENDS+x] );
        trackbank.getTrack(x).getSend(1).set(value_new,MAX_VALUE);
        track_send[NUM_SENDS+x] = value_new;
        host.showPopupNotification("Send2 Track " + x + " = " + value_new.toFixed(2) );
        break;
      case 3: // volume
        var value_new = scale_value( v, knob_positions[k], track_volume[x] );
        trackbank.getTrack(x).getVolume().set(value_new,MAX_VALUE);
        track_volume[x] = value_new;
        host.showPopupNotification("Volume Track " + x + " = " + value_new.toFixed(2) );
        break;
    }
  }
}

//----------------------------------------------------------------------
// buttons
//----------------------------------------------------------------------

function handle_modeselect_mixer(x) {
  //println("set mode "+x);
  switch(page) {
    case 1: // mixer
      if (x!=mixer_mode) {
        mixer_mode = x;
        draw_mode_mixer();
        notify_mode_mixer();
      }
  } // page
}

//----------

function handle_button_mixer(x,y,press) {
  var track = trackbank.getTrack(x);
  //println("button x:"+x+" y:"+y+" press:"+press);
  if (y==0) button1_pressed[x] = press;
  if (y==1) handle_modeselect_mixer(x);
  if (y==2) button2_pressed[x] = press;
  if (press) {
      
    switch(y) {
      case 0:
        switch(mixer_mode) {
          case 0: track.getMute().toggle(); host.showPopupNotification("Mute: " + x); break;
          case 1: track.getSolo().toggle(); host.showPopupNotification("Solo: " + x); break;
          case 2: track.getArm().toggle(); host.showPopupNotification("Arm: " + x); break;
        } // mixer mode
        break;
      case 2:
        track.select();
        break;
    }
    
  } // press
}

//----------

//----------------------------------------------------------------------
// lights
//----------------------------------------------------------------------

function draw_mode_mixer() {
// 2 5 8 11 14 17 20 23
  for (var i=0; i<NUM_TRACKS; i++) {
    if (i==mixer_mode) sendMidi(144,2+(i*3),1);
    else sendMidi(144,2+(i*3),0);
  }
}

//----------

function draw_buttons_mixer() {
  for (var x=0; x<NUM_TRACKS; x++) {
    var col = COLOR_OFF;
    switch(mixer_mode) {
      case 0: if (track_mute[x])  col = COLOR_ON; break;
      case 1: if (track_solo[x])  col = COLOR_ON; break;
      case 2: if (track_arm[x])   col = COLOR_ON; break;
    } // mode
    sendMidi(144,x*3+1,col);
    
    if (track_selected[x]) col = COLOR_ON;
    else col = COLOR_OFF;
    sendMidi(144,x*3+3,col);
  }
}

//----------------------------------------------------------------------
// notification
//----------------------------------------------------------------------

function notify_mode_mixer() {
  var txt = "";
  switch(mixer_mode) {
    case 0: txt = "Mute";     break;
    case 1: txt = "Solo";     break;
    case 2: txt = "Arm";      break;
    case 3: txt = "[ Stop ]"; break;
    case 4: txt = "?";        break;
    case 5: txt = "?";        break;
    case 6: txt = "?";        break;
    case 7: txt = "?";        break;
  }
  host.showPopupNotification(txt);
}

//----------------------------------------------------------------------
// update
//----------------------------------------------------------------------

function update_mixer(mode,x,y) {
  switch(mode) {
    case UPDATE_TRACK_STATE:
      draw_buttons_mixer();
      break;
  }
}
