
/*
  most functions:
    mode = shift (c1,c2,c3,a9,b9)
    index = knob index (0-7)
    value = knob pos (0-127)
  plus:
    selected_track: 1-8, 9=master
*/

//----------------------------------------------------------------------
// knobs
//----------------------------------------------------------------------

function process_knobs(mode,index,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      param = scale_value(index,KNOBS,value,knob_positions,ctrl_values);
      userControls.getControl(KNOBS+index).set(param,MAX_MIDI);
      break;
    case MODE_C1: // track
      if (selected_track<8) {
        // 'regular' track, not master
        switch (index) {
          case 0:
            param = scale_value(index,selected_track,value,knob_positions,chan_vol_values);
            cursorTrack.getVolume().set(param,MAX_VALUE);
            break;
          case 1:
            param = scale_value(index,selected_track,value,knob_positions,chan_pan_values);
            cursorTrack.getPan().set(param,MAX_VALUE);
            break;
          case 2:
            param = scale_value(index,selected_track,value,knob_positions,chan_s1_values);
            cursorTrack.getSend(0).set(param,MAX_VALUE);
            break;
          case 3:
            param = scale_value(index,selected_track,value,knob_positions,chan_s2_values);
            cursorTrack.getSend(1).set(param,MAX_VALUE);
            break;
          case 4:
            param = scale_value(index,selected_track,value,knob_positions,chan_s3_values);
            cursorTrack.getSend(2).set(param,MAX_VALUE);
            break;
        }
      }
      break;
    case MODE_C2: // device
      param = scale_value(index,index,value,knob_positions,macro_values);
      primaryDevice.getMacro(index).getAmount().set(param,MAX_VALUE);
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}
      
//----------

function process_knob9(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(KNOB9).set(value,MAX_MIDI);
      break;
    case MODE_C1:
      break;
    case MODE_C2:
      break;
    case MODE_C3:
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------------------------------------------------------------------
// top row buttons
//----------------------------------------------------------------------

function process_buttons_a(mode,index,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(BUTTONS_A+index).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      if (value>=HALF_MIDI) tracks.getTrack(index).select();
      selected_track = index;
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_a9(mode,value) {
  shift_a9 = (value>=HALF_MIDI);
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      //userControls.getControl(BUTTON_A9).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      if (value>=HALF_MIDI) master.select();
      selected_track = 8;
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  } 
}

//----------------------------------------------------------------------
// bottom row buttons
//----------------------------------------------------------------------

function process_buttons_b(mode,index,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(BUTTONS_B+index).set(param,MAX_MIDI);
      break;
    case MODE_C1: // track
      switch (index) {
        case 0:
          if (value>=HALF_MIDI) cursorTrack.getMute().toggle();
          break;
        case 1:
          if (value>=HALF_MIDI) cursorTrack.getSolo().toggle();
          break;
        case 2:
          if (value>=HALF_MIDI) cursorTrack.getArm().toggle();
          break;
        case 3:
          if (value>=HALF_MIDI) cursorTrack.stop();
          break;
        case 4:
          if (value>=HALF_MIDI) cursorTrack.returnToArrangement();
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
      }
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_b9(mode,value) {
  shift_b9 = (value>=HALF_MIDI);
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      //userControls.getControl(BUTTON_B9).set(value,MAX_MIDI);
      //if (value>=HALF_MIDI) application.nextPerspective();
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------------------------------------------------------------------
// cross-fader
//----------------------------------------------------------------------

function process_slider_xfader(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(SLIDER_XFADER).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------------------------------------------------------------------
// c1/c2/c3 buttons
//----------------------------------------------------------------------

function process_button_c1(mode,value) {
  shift_c1 = (value>=HALF_MIDI);
    var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      //userControls.getControl(BUTTON_C1).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      //if (shift_a9) master.select();
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_c2(mode,value) {
  shift_c2 = (value>=HALF_MIDI);
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      //userControls.getControl(BUTTON_C2).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_c3(mode,value) {
  shift_c3 = (value>=HALF_MIDI);
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      //userControls.getControl(BUTTON_C3).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------------------------------------------------------------------
// sliders
//----------------------------------------------------------------------

function process_sliders(mode,index,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      param = scale_value(index,SLIDERS,value,slider_positions,ctrl_values);
      userControls.getControl(SLIDERS+index).set(param,MAX_VALUE);
      break;
    case MODE_C1: // track
      param = scale_value(index,index,value,slider_positions,chan_vol_values);
      tracks.getTrack(index).getVolume().set(param,MAX_VALUE);
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_slider9(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      param = scale_value(0,SLIDER9,value,slider9_position,ctrl_values);
      userControls.getControl(SLIDER9).set(param,MAX_VALUE);
      break;
    case MODE_C1: // track
      param = scale_value(0,0,value,slider9_position,master_vol_value);
      master.getVolume().set(param,MAX_MIDI);
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------------------------------------------------------------------
// v-link
//----------------------------------------------------------------------

/*
  is there something fishy with this?
  i've seen sudden, unintender reset (to #0?) preset changes..
  what if v-link knob sends value #0?
  added another test (signed >0) to see if that fixes it..
*/

function process_knob_vlink(mode,value) {
  var signed = uint7ToInt7(value);
  switch (mode) {
    case MODE_NORMAL:
      //if (value>=HALF_MIDI) primaryDevice.switchToPreviousPreset();
      //else  primaryDevice.switchToNextPreset();
      userControls.getControl(KNOB_VLINK).inc(signed,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      if (signed<0) primaryDevice.switchToPreviousPreset();
      else if (signed>0)primaryDevice.switchToNextPreset();
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_v1(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(BUTTON_V1).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_v2(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(BUTTON_V2).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_v3(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(BUTTON_V3).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_v4(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      userControls.getControl(BUTTON_V4).set(value,MAX_MIDI);
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------------------------------------------------------------------
// transport
//----------------------------------------------------------------------

function process_button_rewind(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      if (value>=HALF_MIDI) transport.rewind();
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_stop(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      if (value>=HALF_MIDI) transport.stop();
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_play(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      if (value>=HALF_MIDI) transport.play();
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

//----------

function process_button_record(mode,value) {
  var param = 0;
  switch (mode) {
    case MODE_NORMAL:
      if (value>=HALF_MIDI) transport.record();
      break;
    case MODE_C1: // track
      break;
    case MODE_C2: // device
      break;
    case MODE_C3: // clip
      break;
    case MODE_A9:
      break;
    case MODE_B9:
      break;
  }
}

