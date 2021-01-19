
//----------------------------------------------------------------------
// select
//----------------------------------------------------------------------

function select_user() {
  draw_page();
  draw_buttons();
  draw_indicators();
  notify_page();
}

//----------------------------------------------------------------------
// knobs & sliders
//----------------------------------------------------------------------


// primarydevice.getModulationSource(index).reset(); break;



function handle_knob_user(x,y,v) {
  var k = x*4 + y;
  if (soloright_pressed) {
    usercontrols.getControl(k).reset();
    host.showPopupNotification("User Control " + k + " Reset" );
  }
  else {
    var value_new = scale_value( v, knob_positions[k], user_controls[k] );
    usercontrols.getControl(k).set(value_new,MAX_VALUE);
    user_controls[k] = value_new;
    //println("user control " + k + " = " + value_new);
    host.showPopupNotification("User Control " + k + " = " + value_new.toFixed(2) );
    
  }
}

//----------------------------------------------------------------------
// buttons
//----------------------------------------------------------------------

function handle_modeselect_user(x) {
  if (x!=device_mode) {
    device_mode = x;
    draw_mode();
    notify_mode_user();
  }
}

//----------

function handle_button_user(x,y,press) {
  if (y==0) button1_pressed[x] = press;
  if (y==2) button2_pressed[x] = press;
  if (press) {
    switch(y) {
      case 0:
        //println("userctrl " + (32+x) + " = " + (MAX_VALUE-1));
        usercontrols.getControl(32+x).set(MAX_VALUE-1,MAX_VALUE);
        user_controls[32+x] = MAX_VALUE-1;
        sendMidi(144,x*3+1,1);
        break;
      case 1:
        handle_modeselect_user(x);
        break;
      case 2:
        trackbank.getTrack(x).select();
        break;
    }
  } // press
  else {
    switch(y) {
      case 0:
        //println("userctrl " + (32+x) + " = " + (0));
        usercontrols.getControl(32+x).set(0,MAX_VALUE);
        user_controls[32+x] = 0;
        sendMidi(144,x*3+1,0);
        break;
    }
  }
}

//----------

//----------------------------------------------------------------------
// lights
//----------------------------------------------------------------------

function draw_mode_user() {
// 2 5 8 11 14 17 20 23
  for (var i=0; i<NUM_TRACKS; i++) {
    if (i==device_mode) sendMidi(144,2+(i*3),1);
    else sendMidi(144,2+(i*3),0);
  }
}

//----------

function draw_buttons_user() {
  for (var x=0; x<NUM_TRACKS; x++) {
    //if ((x==0) || (x==1)) sendMidi(144,x*3+1,1);
    //else sendMidi(144,x*3+1,0);
    if (user_controls[32+x] >= HALF_VALUE) sendMidi(144,x*3+1,1);
    else sendMidi(144,x*3+1,0);
    if (track_selected[x]) sendMidi(144,x*3+3,1);
    else sendMidi(144,x*3+3,0);
  }
}

//----------------------------------------------------------------------
// notification
//----------------------------------------------------------------------

function notify_mode_user() {
  var txt = "";
  switch(device_mode) {
    case 0: txt = "?";      break;
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

function update_user(mode,x,y) {
  switch(mode) {
    case UPDATE_TRACK_STATE:
      draw_buttons_user();
      break;
  }
}
