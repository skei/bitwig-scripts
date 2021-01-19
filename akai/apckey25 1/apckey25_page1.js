
var remember = initArray(0,8);
var timesig3 = false;
//--------



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
  if (selected_track>=0) {
    switch(type) {
      //case UPDATE_ARROWS:
      //  page1_draw_arrows();
      //  break;
      case UPDATE_TRACK:
        page1_draw_track(selected_track);
        page1_draw_clips(selected_track);
        page1_draw_trackselect();
        break;
      case UPDATE_CLIP:
        page1_draw_clips(selected_track);
        break;      
    }
  }
}

//----------------------------------------------------------------------
// draw (lights)
//----------------------------------------------------------------------

function page1_draw(type,index) {
  switch(type) {
    case DRAW_GRID:
      //apckey25_clear_grid_lights();
      page1_draw_track(selected_track);
      page1_draw_clips(selected_track);
      page1_draw_master();
      page1_draw_col3(selected_track);
      page1_draw_user1();
      page1_draw_user2();
      page1_draw_trackselect();
      break;
  }
}

//----------------------------------------------------------------------

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

//----------------------------------------------------------------------

function page1_draw_track(index) {
  if (selected_track>=0) {
    var col = COLOR_OFF;
    if (track_stopped[index]) col = COLOR_YELLOW; else col = COLOR_GREEN;
    if (track_queued_stop[index]) col = COLOR_YELLOW_BLINK;
    apckey25_draw_grid_light( 0,0, col );
    apckey25_draw_grid_light( 0,1, track_mute[index] ? COLOR_YELLOW : COLOR_OFF );
    apckey25_draw_grid_light( 0,2, track_solo[index] ? COLOR_YELLOW : COLOR_OFF );
    apckey25_draw_grid_light( 0,3, track_arm[index]  ? COLOR_RED    : COLOR_OFF );
  }
  else {
    apckey25_draw_grid_light( 0,0, COLOR_OFF );
    apckey25_draw_grid_light( 0,1, COLOR_OFF );
    apckey25_draw_grid_light( 0,2, COLOR_OFF );
    apckey25_draw_grid_light( 0,3, COLOR_OFF );
  }
}

//----------------------------------------------------------------------

function page1_draw_clips(index) {
  if (selected_track>=0) {
    apckey25_draw_grid_light( 1,0, page1_clip_color(selected_track,0) );
    apckey25_draw_grid_light( 1,1, page1_clip_color(selected_track,1) );
    apckey25_draw_grid_light( 1,2, page1_clip_color(selected_track,2) );
    apckey25_draw_grid_light( 1,3, page1_clip_color(selected_track,3) );
  }
  else {
    apckey25_draw_grid_light( 1,0, COLOR_OFF );
    apckey25_draw_grid_light( 1,1, COLOR_OFF );
    apckey25_draw_grid_light( 1,2, COLOR_OFF );
    apckey25_draw_grid_light( 1,3, COLOR_OFF );
  }
}

//----------------------------------------------------------------------

function page1_draw_col3(index) {
  apckey25_draw_grid_light( 2,0, COLOR_OFF );
  apckey25_draw_grid_light( 2,1, COLOR_OFF );
  apckey25_draw_grid_light( 2,2, COLOR_OFF );
  apckey25_draw_grid_light( 2,3, COLOR_YELLOW );
}

//----------------------------------------------------------------------

function page1_draw_master() {
  apckey25_draw_grid_light( 3,0, (selected_track==-1) ? COLOR_GREEN : COLOR_RED );
  apckey25_draw_grid_light( 3,1, COLOR_GREEN );
  apckey25_draw_grid_light( 3,2, COLOR_GREEN );
  apckey25_draw_grid_light( 3,3, COLOR_YELLOW );
}

//----------------------------------------------------------------------

function page1_draw_user1() {
  for (var x=4; x<8; x++) {
    for (var y=0; y<2; y++) {
      apckey25_draw_grid_light( x,y, COLOR_YELLOW );
    }
  }
}

//----------------------------------------------------------------------

function page1_draw_user2() {
  
  apckey25_draw_grid_light( 4,2, COLOR_RED );
  apckey25_draw_grid_light( 4,3, COLOR_GREEN );
  
  apckey25_draw_grid_light( 5,2, COLOR_GREEN );
  apckey25_draw_grid_light( 5,3, COLOR_GREEN );

  apckey25_draw_grid_light( 6,2, timesig3 ? COLOR_GREEN : COLOR_YELLOW );
  apckey25_draw_grid_light( 6,3, timesig3 ? COLOR_YELLOW : COLOR_GREEN );

  apckey25_draw_grid_light( 7,2, COLOR_GREEN );
  apckey25_draw_grid_light( 7,3, COLOR_RED );

}

//----------------------------------------------------------------------

function page1_draw_trackselect() {
  for (var x=0; x<8; x++) {
    if (track_exist[x]) {
    
      if (selected_track>=0) {
        if (track_selected[x]) apckey25_draw_grid_light(x,4,COLOR_GREEN);
        else apckey25_draw_grid_light(x,4,COLOR_RED);
      }
      else {
        apckey25_draw_grid_light(x,4,COLOR_RED);
      }
      
    }
    else {
      apckey25_draw_grid_light(x,4,COLOR_OFF);
    }
      
  }
}

//----------------------------------------------------------------------
// button
//----------------------------------------------------------------------

function page1_button(type,x,y,press) {
  switch(type) {
    case BUTTON_GRID:
      if (y==4) {
        page1_button_trackselect(x,y,press);
      }
      else if (x>=4) {
        if ((y>=0) && (y<=1)) page1_button_user1(x,y,press);
        if ((y>=2) && (y<=3)) page1_button_user2(x,y,press);
      }
      else {
        if (x==0) page1_button_track(selected_track,y,press);
        if (x==1) page1_button_clips(selected_track,y,press);
        if (x==2) page1_button_col3(selected_track,y,press);
        if (x==3) page1_button_master(selected_track,y,press);
      }
      break;
  }
}

//----------------------------------------------------------------------

function page1_button_track(x,y,press) {
  if (selected_track>=0) {
    if (track_exist[x]) {
      if (press) {
        switch (y) {
          case 0:
            trackbank.getTrack(x).stop();
            host.showPopupNotification("Stop");
            break;
          case 1:
            trackbank.getTrack(x).getMute().toggle();
            host.showPopupNotification("Mute");
            break;
          case 2:
            trackbank.getTrack(x).getSolo().toggle();
            host.showPopupNotification("Solo");
            break;
          case 3:
            trackbank.getTrack(x).getArm().toggle();
            host.showPopupNotification("Rec Arm");
            break;
        } // switch
      } // press
    } // track exists
  } // !master
}

//----------------------------------------------------------------------

function page1_button_clips(x,y,press) {
  if (selected_track>=0) {
    if (track_exist[x]) {
      if (press) {
        trackbank.getTrack(x).getClipLauncherSlots().launch(y);
      }
    }
  } // !master
}

//----------------------------------------------------------------------

function page1_button_col3(x,y,press) {
  if (press) {
    switch(y) {
      case 3:
        apckey25_draw_grid_light(2,3,COLOR_RED);
        application.toggleDevices();
        break;
    }
  } // press
  else {
    switch(y) {
      case 3: apckey25_draw_grid_light(2,3,COLOR_YELLOW); break;
    }
  }
}

//----------------------------------------------------------------------

function page1_button_master(x,y,press) {
  switch(y) {
    case 0:
      if (press) {
        apckey25_draw_grid_light(3,y,COLOR_GREEN);
        mastertrack.select();
        // auto-arm master track..
        // and if a regular track was selected, deactivate it
        mastertrack.getArm().set(true);
        if (selected_track>=0) trackbank.getTrack(selected_track).getArm().set(false);
        selected_track = -1;
        page1_draw_track(selected_track);
        page1_draw_clips(selected_track);
        page1_draw_trackselect();
        host.showPopupNotification("Master");
      }
      else {
        // after press, master is selected, an should be green..
        // or we could redraw the whole master track column..
        apckey25_draw_grid_light(3,y,COLOR_GREEN);
      }
      break;
    case 1:
      if (press) {
        apckey25_draw_grid_light(3,y,COLOR_YELLOW);
        if (shift_pressed) {
          transport.increaseTempo( 1, 647);
          host.showPopupNotification("Tempo + 1");
        }
        else {
          transport.increaseTempo( 10,647);
          host.showPopupNotification("Tempo + 10");
        }

      }
      else {
        apckey25_draw_grid_light(3,y,COLOR_GREEN); 
      }
      break;
    case 2:
      if (press) {
        apckey25_draw_grid_light(3,y,COLOR_YELLOW);
        if (shift_pressed) {
          transport.increaseTempo( -1, 647); // 666-19 ???
          host.showPopupNotification("Tempo - 1");
        }
        else {
          transport.increaseTempo( -10,647); // 666-19 ???
          host.showPopupNotification("Tempo - 10");
        }
      }
      else {
        apckey25_draw_grid_light(3,y,COLOR_GREEN); 
      }
      break;
    case 3:
      if (press) {
        application.nextPanelLayout();
        host.showPopupNotification("Clips/Timeline");
        apckey25_draw_grid_light(3,y,COLOR_RED);
      }
      else {
        apckey25_draw_grid_light(3,y,COLOR_YELLOW); 
      }
      break;
  }
}

//----------------------------------------------------------------------

function page1_button_user1(x,y,press) {

  if (press) apckey25_draw_grid_light(x,y,COLOR_RED);
  else apckey25_draw_grid_light(x,y,COLOR_YELLOW); 

  var index = (y*4) + (x-4);
  if (mode<0) {
    if (press) {
      if (shift_pressed) {
        primarydevice.getMacro(index).getAmount().reset();
        host.showPopupNotification("Reset Macro " + (index+1));
      }
      else {
        primarydevice.getMacro(index).getAmount().set(MAX_VALUE-1,MAX_VALUE);
        host.showPopupNotification("Macro " + (index+1) + " = 127");
      }
    }
    else {
      if (!shift_pressed) {
        primarydevice.getMacro(index).getAmount().set(0,MAX_VALUE);
        host.showPopupNotification("Macro " + (index+1) + " = 0");
      }
    }
  }
  else {
    var index2 = (mode * NUM_KNOBS) + index;
    if (press) {
      if (shift_pressed) usercontrols.getControl(index2).reset();
      else usercontrols.getControl(index2).set(MAX_VALUE-1,MAX_VALUE);
    }
    else {
      if (!shift_pressed) {
        usercontrols.getControl(index2).set(0,MAX_VALUE); 
      }
    }
  }
}

//----------------------------------------------------------------------

function page1_button_user2(x,y,press) {
  var index = ((y-2)*4) + (x-4);
  var col = COLOR_OFF;
  if (press) {
    switch(index) {
      case 0:
        if (shift_pressed) {
        application.deactivateEngine();
        col = COLOR_GREEN;
        host.showPopupNotification("Deactivate Engine");
        }
        break;
      case 1:
        if (shift_pressed) {
        application.previousProject();
        col = COLOR_YELLOW;
        host.showPopupNotification("Previous Project");
        }
        break;
      case 2:
        if (shift_pressed) {
        transport.getTimeSignature().set("3/4");
        col = COLOR_RED;
        timesig3 = true;
        apckey25_draw_grid_light(x,y+1,COLOR_YELLOW);
        host.showPopupNotification("3/4");
        }
        break;
      case 3:
        col = COLOR_YELLOW;
        // remembers macros & user ctrls
        for (var i=0; i<8; i++) {
          if (mode<0) { // macros
            remember[i] = device_macro_values[i];
          }
          else { // userctrl 1..4
            var i2 = (mode * NUM_KNOBS) + i;
            remember[i] = ctrl_values[i2];
          }
        } // i
        host.showPopupNotification("Remember");
        break;
      case 4:
        if (shift_pressed) {
        application.activateEngine();
        col = COLOR_RED;
        host.showPopupNotification("Activate Engine");
        }
        break;
      case 5:
        if (shift_pressed) {
        application.nextProject();
        col = COLOR_YELLOW;
        host.showPopupNotification("Next Project");
        }
        break;
      case 6:
        if (shift_pressed) {
        transport.getTimeSignature().set("4/4");
        col = COLOR_RED;
        timesig3 = false;
        apckey25_draw_grid_light(x,y-1,COLOR_YELLOW);
        host.showPopupNotification("4/4");
        }
        break;
      case 7:
        col = COLOR_YELLOW;
        
        // master track

        if (shift_pressed) {
          //mastertrack.stop();
          mastertrack.getVolume().reset();
          mastertrack.getPan().reset();
          mastertrack.getMute().set(false);
          mastertrack.getSolo().set(false);
          //mastertrack.getArm().set(false);
          var device = mastertrack.getPrimaryDevice();
          for (var ma=0; ma<NUM_MACRO; ma++) {
            var macro = device.getMacro(ma);
            macro.getAmount().reset();
          }
          
        //} // shift
        
          // tracks

          for (var tr=0; tr<NUM_TRACKS; tr++) {
            var track = trackbank.getTrack(tr);
            //track.stop();
            track.getVolume().reset();
            track.getPan().reset();
            track.getMute().set(false);
            track.getSolo().set(false);
            track.getArm().set(false);
            //track.getSend(0).reset();
            //track.getSend(1).reset();
            //if (shift_pressed) {
              // reset macros
              var device = track.getPrimaryDevice();
              for (var ma=0; ma<NUM_MACRO; ma++) {
                var macro = device.getMacro(ma);
                macro.getAmount().reset();
              }
            //} // shift
          }
          
        } // shift
        
        // user controls
        
        for (co=0; co<NUM_CTRL; co++) {
          var control = usercontrols.getControl(co);
          control.reset();
        }
        
        if (shift_pressed) host.showPopupNotification("Reset All"); // user ctrl, tracks (and macros), master (and macros)
        else host.showPopupNotification("Reset User Controls");
        
        break;
    } // switch
  } // press
  else {
    switch(index) {
      case 0: col = COLOR_RED;  break;
      case 1: col = COLOR_GREEN;  break;
      case 2: col = COLOR_GREEN;  break;
      case 3:
        col = COLOR_GREEN;
        // reset macros & user ctrls
        for (var i=0; i<8; i++) {
          if (mode<0) { // macros
            primarydevice.getMacro(i).getAmount().set(remember[i],MAX_VALUE);
          }
          else { // userctrl 1..4
            var i2 = (mode * NUM_KNOBS) + i;
            usercontrols.getControl(i2).set(remember[i],MAX_VALUE);  
          }
        } // i
        break;
      case 4: col = COLOR_GREEN;  break;
      case 5: col = COLOR_GREEN;  break;
      case 6: col = COLOR_GREEN;  break;
      case 7: col = COLOR_RED;  break;
    }
  }
  apckey25_draw_grid_light(x,y,col);
 
}

//----------------------------------------------------------------------

function page1_button_trackselect(x,y,press) {
  if (press) {
    if (track_exist[x]) {  
      if (x!=selected_track) {
      
        /*
        even if i have "Auto Arm selected Instrument/Audio Tracks" ticked in
        preferences, master channel's rec arm doesn't seem to be affected if i
        select or deselect master channel.. so i do it manually here and in
        page1_button_master() 
        if you don't want master channel auto arm, comment the folowing line..
        and the related lines from page1_button_master()
        */
        
        var was_master = (selected_track == -1);
        if (was_master) mastertrack.getArm().set(false);
        
        //if (selected_track == -1) {
        //  mastertrack.getArm().set(false);
        //  page1_draw_master();
        //}
        
        //miditrack.selectFirst();
        //miditrack.getMute().set(true);
        
        trackbank.getTrack(x).selectInMixer();
        selected_track = x;
        host.showPopupNotification((selected_track+1) + " : " +track_name[selected_track]);
        
        if (was_master) page1_draw_master(); // depends on selected_track
        
        //page1_draw_master();
      } // already selected
      //else {
      //  println("x != selected_track");
      //  application.toggleDevices();
      //}
    } // exist
  } // press
}

//----------------------------------------------------------------------
// knobs
//----------------------------------------------------------------------

function page1_knob(index,value) {
  //println("knob " + index + " = " + value);
  if (stopall_pressed) {}
  else {
    if (mode<0) {
      if (shift_pressed) {
        //usercontrols.getControl(index2).reset();
        primarydevice.getMacro(index).getAmount().reset();
        host.showPopupNotification("Track Macro " + index + " Reset" );
      }  
      else {
        var value_new = scale_value( value, knob_positions[index], device_macro_values[index] );
        primarydevice.getMacro(index).getAmount().set(value_new,MAX_VALUE);
        device_macro_values[index] = value_new;
        host.showPopupNotification("Track Macro " + index + " = " + value_new.toFixed(2) );
      }
    }
    else {
      var index2 = (mode * NUM_KNOBS) + index;
      if (shift_pressed) {
        usercontrols.getControl(index2).reset();
        //host.showPopupNotification("User Control " + index2 + " Reset"); // -> "usercontrol 0 = NaN"
        host.showPopupNotification("User Control " + index2 + " Reset" );
      }  
      else {
        var value_new = 0;
        value_new = scale_value( value, knob_positions[index], ctrl_values[index2] );
        usercontrols.getControl(index2).set(value_new,MAX_VALUE);
        ctrl_values[index2] = value_new;
        //host.showPopupNotification("User Control " + index2 + " = " + value_new); // -> "usercontrol 0 = NaN"
        host.showPopupNotification("User Control " + index2 + " = " + value_new.toFixed(2) );
      }
    }
  }
  knob_positions[index] = value;
}

