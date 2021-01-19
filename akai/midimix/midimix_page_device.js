
//----------------------------------------------------------------------
// select
//----------------------------------------------------------------------

function select_device() {
  draw_page();
  draw_buttons();
  draw_indicators();
  notify_page();
}

//----------------------------------------------------------------------
// knobs & sliders
//----------------------------------------------------------------------


// primarydevice.getModulationSource(index).reset(); break;



function handle_knob_device(x,y,v) {
  var k = x*4 + y;
  if (soloright_pressed) {
    switch(y) {
      case 0: primarydevice.getMacro(x).getAmount().reset();  break;
      case 1: primarydevice.getCommonParameter(x).reset();    break;
      case 2: primarydevice.getEnvelopeParameter(x).reset();  break;
      case 3: primarydevice.getParameter(x).reset();          break;
    }
  }
  else {
    switch(y) {
      case 0:
        var value_new = scale_value( v, knob_positions[k], device_macro[x] );
        primarydevice.getMacro(x).getAmount().set(value_new,MAX_VALUE);
        device_macro[x] = value_new;
        //host.showPopupNotification("Device macro " + x + " = " + value_new);
        break;
      case 1:
        var value_new = scale_value( v, knob_positions[k], device_param_common[x] );
        primarydevice.getCommonParameter(x).set(value_new,MAX_VALUE);
        device_param_common[x] = value_new;
        break;
      case 2:
        var value_new = scale_value( v, knob_positions[k], device_param_env[x] );
        primarydevice.getEnvelopeParameter(x).set(value_new,MAX_VALUE);
        device_param_env[x] = value_new;
        break;
      case 3:
        var value_new = scale_value( v, knob_positions[k], device_param[x] );
        primarydevice.getParameter(x).set(value_new,MAX_VALUE);
        device_param[x] = value_new;
        break;
    }
  }
}

//----------------------------------------------------------------------
// buttons
//----------------------------------------------------------------------

function handle_modeselect_device(x) {
  if (x!=device_mode) {
    device_mode = x;
    draw_mode();
    notify_mode_device();
  }
}

//----------

function handle_button_device(x,y,press) {
  if (y==0) button1_pressed[x] = press;
  if (y==2) button2_pressed[x] = press;
  if (press) {
    switch(y) {
      case 0:
        if (x==0) {
          if (param_page > 0) {
            param_page -= 1;
            primarydevice.setParameterPage(param_page);
            var name = device_param_page_names[param_page];
            host.showPopupNotification(name);
            //this.draw_grid_rect(6,1,2,1);
          }
        }
        if (x==1) {
          if (param_page < (device_num_param_pages-1)) {
            param_page += 1;
            primarydevice.setParameterPage(param_page);
            var name = device_param_page_names[param_page];
            host.showPopupNotification(name);
            //this.draw_grid_rect(6,1,2,1);
          }
        }
        break;
      case 1:
        handle_modeselect_device(x);
        break;
      case 2:
        trackbank.getTrack(x).select();
        break;
    }
  }
}

//----------

//----------------------------------------------------------------------
// lights
//----------------------------------------------------------------------

function draw_mode_device() {
// 2 5 8 11 14 17 20 23
  for (var i=0; i<NUM_TRACKS; i++) {
    if (i==device_mode) sendMidi(144,2+(i*3),1);
    else sendMidi(144,2+(i*3),0);
  }
}

//----------

function draw_buttons_device() {
  for (var x=0; x<NUM_TRACKS; x++) {
    
    if ((x==0) || (x==1)) sendMidi(144,x*3+1,1);
    else sendMidi(144,x*3+1,0);
    
    if (track_selected[x]) sendMidi(144,x*3+3,1);
    else sendMidi(144,x*3+3,0);
  }
}

//----------------------------------------------------------------------
// notification
//----------------------------------------------------------------------

function notify_mode_device() {
  var txt = "";
  switch(device_mode) {
    case 0: txt = "Scroll"; break;
    case 1: txt = "?";      break;
    case 2: txt = "?";      break;
    case 3: txt = "?";      break;
    case 4: txt = "?";      break;
    case 5: txt = "?";      break;
    case 6: txt = "?";      break;
    case 7: txt = "?";      break;
  }
  host.showPopupNotification("Mode: " + txt);
}

//----------------------------------------------------------------------
// update
//----------------------------------------------------------------------

function update_device(mode,x,y) {
  switch(mode) {
    case UPDATE_TRACK_STATE:
      draw_buttons_device();
      break;
  }
}
