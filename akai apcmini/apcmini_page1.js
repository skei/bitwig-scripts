
//----------------------------------------------------------------------
// select
//----------------------------------------------------------------------

function page1_select() {
}

//----------------------------------------------------------------------
// update (observers)
//----------------------------------------------------------------------

// called from observers

function page1_update(type) {
  switch(type) {
    //case UPDATE_ARROWS:
    //  page1_draw_arrows();
    //  break;
    case UPDATE_TRACK:
      page1_draw_clips(selected_track);
      break;
    case UPDATE_CLIP:
      page1_draw_clips(selected_track);
      break;      
  }
}

//----------------------------------------------------------------------
// draw (lights)
//----------------------------------------------------------------------

function page1_draw(type,index) {
  switch(type) {
    case DRAW_GRID:
      page1_draw_clips();
      break;
  }
}

//----------

function page1_clip_color(x,y) {
  var col = COLOR_OFF;
  var i = (x*NUM_SCENES) + y;
  if (clip_hascontent[i]) {
    if (clip_playing[i]) {
      col = COLOR_GREEN;
      if (track_queued_stop[x]) col = COLOR_YELLOW_BLINK;
      if (clip_queued_stop[i]) col = COLOR_YELLOW_BLINK;
      if (clip_queued_rec[i]) col = COLOR_RED_BLINK;
    }
    else if (clip_recording[i]) {
      col = COLOR_RED;
      if (track_queued_stop[x]) col = COLOR_YELLOW_BLINK;
      if (clip_queued_stop[i]) col = COLOR_YELLOW_BLINK;
      if (clip_queued_play[i]) col = COLOR_GREEN_BLINK;
    }
    else { // stopped
      col = COLOR_YELLOW;  
      if (clip_queued_play[i]) col = COLOR_GREEN_BLINK;
      if (clip_queued_rec[i])  col = COLOR_RED_BLINK;
    }
  } // has content
  else {
    if (clip_queued_rec[i])  col = COLOR_RED_BLINK;
  }
  return col;
}

//----------

function page1_draw_track(index) {
  for (var y=0; y<NUM_SCENES; y++) {
    apcmini_draw_grid_light( index, y, page1_clip_color(index,y) );
  }
}

function page1_draw_clips() {
  for (var y=0; y<NUM_SCENES; y++) {
    for (var x=0; x<(NUM_TRACKS-1); x++) {
      apcmini_draw_grid_light( x,y, page1_clip_color(x,y) );
    }
  }
}

//----------------------------------------------------------------------
// button
//----------------------------------------------------------------------

function page1_button(type,x,y,press) {
  //println("grid " + x + "," + y + " = " + press);
  switch(type) {
    case BUTTON_GRID:
      page1_button_clips(x,y,press);
      break;
  }
}

//----------

function page1_button_clips(x,y,press) {
  if (track_exist[x]) {
    if (press) {
      if (shift_pressed) {
        trackbank.launchScene(y);
        
        if ( scene_name[y].charAt(0) != ' ') host.showPopupNotification(scene_name[y]);
        
      }
      //else if (stopall_pressed) trackbank.getTrack(x).stop();
      else {
        trackbank.getTrack(x).getClipLauncherSlots().launch(y);
      }
    }
  }
}

//----------------------------------------------------------------------
// knobs
//----------------------------------------------------------------------

// index 0..8 (8=master)

function page1_knob(index,value) {
  //println("knob " + index + " = " + value);
  
  //if (stopall_pressed) {
  if (shift_pressed) {
  }
  
  /*
    hmm... this doesn't sem to work..
    strange..
    same code as in midimix (where it works)
  */
  
  else if (index==8) { // master
    //if (shift_pressed) {
    //  mastertrack.getVolume().reset();   
    //}
    //else {
      var value_new = scale_value( value, knob_positions[index], master_volume );
      mastertrack.getVolume().set(value_new,MAX_VALUE);
      master_volume = value_new;
      host.showPopupNotification("Volume Master = " + value_new.toFixed(2) );
    //}
  }
  
  else {
  
    if (mode<0) { // macro
      //if (shift_pressed) {
      //  usercontrols.getControl(index).reset();
      //  host.showPopupNotification("User Control " + index + " Reset");
      //}  
      //else {
        var value_new = scale_value( value, knob_positions[index], ctrl_values[index] );
        usercontrols.getControl(index).set(value_new,MAX_VALUE);
        ctrl_values[index] = value_new;
        host.showPopupNotification("User Control " + index + " = " + value_new.toFixed(2));
      //}
    }
    
    else { // mode > 0, normal mode
    
      //if (shift_pressed) {
      //  switch (mode) {
      //    case 0: trackbank.getTrack(index).getVolume().reset();      break;
      //    case 1: trackbank.getTrack(index).getSend(0).reset();       break;
      //    case 2: trackbank.getTrack(index).getSend(1).reset();       break;
      //    case 3: primarydevice.getMacro(index).getAmount().reset();  break;
      //  }
      //}
      //else {  // ! shift_pressed
        var value_new = 0;
        switch(mode) {
          case 0:
            value_new = scale_value( value, knob_positions[index], track_volume[index] );
            trackbank.getTrack(index).getVolume().set(value_new,MAX_VALUE);
            track_volume[index] = value_new;
            host.showPopupNotification("Volume Track " + index + " = " + value_new.toFixed(2));
            break;
          case 1:
            value_new = scale_value( value, knob_positions[index], track_send[index*NUM_SENDS+0] );
            trackbank.getTrack(index).getSend(0).set(value_new,MAX_VALUE);
            track_send[index*NUM_SENDS+0] = value_new;
            host.showPopupNotification("Send1 Track " + index + " = " + value_new.toFixed(2));
            break;
          case 2:
            value_new = scale_value( value, knob_positions[index], track_send[index*NUM_SENDS+1] );
            trackbank.getTrack(index).getSend(1).set(value_new,MAX_VALUE);
            track_send[index*NUM_SENDS+1] = value_new;
            host.showPopupNotification("Send2 Track " + index + " = " + value_new.toFixed(2));
            break;
          case 3:
            value_new = scale_value( value, knob_positions[index], device_macro_values[index] );
             primarydevice.getMacro(index).getAmount().set(value_new,MAX_VALUE);
            device_macro_values[index] = value_new;
            host.showPopupNotification("Track Macro " + index + " = " + value_new.toFixed(2));
            break;
        } // switch
      //} // ! shift_pressed
      
    } // mode > 0
      
  }
  knob_positions[index] = value;
}

