
//----------------------------------------------------------------------
// select
//----------------------------------------------------------------------

function select() {
  switch(page) {
    case 0: break;
    case 1: select_mixer(); break;
    case 2: select_device(); break;
    case 3: select_user(); break;
  }
}


//----------------------------------------------------------------------
// knobs & sliders
//----------------------------------------------------------------------

function handle_master(v) {
  if (solo_pressed) {
  }
  else {
    var value_new = scale_value( v, knob_positions[32], master_volume );
    mastertrack.getVolume().set(value_new,MAX_VALUE);
    master_volume = value_new;
    host.showPopupNotification("Volume Master = " + value_new.toFixed(2) );
    
  }
  knob_positions[32] = v;
}

//----------

function handle_knob(x,y,v) {
  if (solo_pressed) {
    if (soloright_pressed) {
    
      // a little hack..
      // todo: reorganize logic...

      switch(page) {
        case 0: break;
        case 1: handle_knob_mixer(x,y,v); break;
        case 2: handle_knob_device(x,y,v); break;
        case 3: handle_knob_user(x,y,v); break;
      }
    
    
    }
  }
  else {
    switch(page) {
      case 0: break;
      case 1: handle_knob_mixer(x,y,v); break;
      case 2: handle_knob_device(x,y,v); break;
      case 3: handle_knob_user(x,y,v); break;
    }
  }
  var k = x*4 + y;
  knob_positions[k] = v;
  //println("k = " + k);
  //println("knob_positions[k] = " + knob_positions[k]);
  
}

//----------------------------------------------------------------------
// buttons
//----------------------------------------------------------------------

function handle_button(x,y,press) {
  switch(page) {
    case 0: break;
    case 1: handle_button_mixer(x,y,press); break;
    case 2: handle_button_device(x,y,press); break;
    case 3: handle_button_user(x,y,press); break;
  }
}

//----------

function handle_bankleft(press) {
  bankleft_pressed = press;
  var p = page;
  if (press) {
    if (solo_pressed) {
      sololeft_pressed = true;
    }
    else {
      if (bankright_pressed) p = 3; else p = 1;
      if (p!=page) {
        page = p;
        select();
      }
      else {
        bank_pressed = true;
      }
    }
  }
  else {
    bank_pressed = false;
    sololeft_pressed = false;
  }
}

//----------

function handle_bankright(press) {
  bankright_pressed = press;
  var p = page;
  if (press) {
    if (solo_pressed) {
      soloright_pressed = true;
    }
    else {
      if (bankleft_pressed) p = 3; else p = 2;
      if (p!=page) {
        page = p;
        select();
      }
      else {
        bank_pressed = true;
      }
    }
  }
  else {
    bank_pressed = false;
    soloright_pressed = false;
  }
}

//----------

function handle_solo(press) {
  solo_pressed = press;
  if (press) draw_mode();
  else draw_buttons();
}

//----------------------------------------------------------------------
// lights
//----------------------------------------------------------------------

function draw_page() {
  //println("midimix.js / draw_page");
  switch(page) {
    case 0:
      sendMidi(144,25,0);
      sendMidi(144,26,0);
      break;
    case 1:
      sendMidi(144,25,1);
      sendMidi(144,26,0);
      break;
    case 2:
      sendMidi(144,25,0);
      sendMidi(144,26,1);
      break;
    case 3:
      sendMidi(144,25,1);
      sendMidi(144,26,1);
      break;
  }
}

//----------

function draw_mode() {
  //println("midimix.js / draw_mode");
  switch(page) {
    case 0: break;
    case 1: draw_mode_mixer(); break;
    case 2: draw_mode_device(); break;
    case 3: draw_mode_user(); break;
  }
}

//----------

function draw_buttons() {
  //println("midimix.js / draw_buttons");
  switch(page) {
    case 0: break;
    case 1: draw_buttons_mixer(); break;
    case 2: draw_buttons_device(); break;
    case 3: draw_buttons_user(); break;
  }
}

//----------------------------------------------------------------------
// notification
//----------------------------------------------------------------------

function notify_page() {
  var txt = "";
  switch(page) {
    case 0: txt = "?";      break;
    case 1: txt = "Mixer";  break;
    case 2: txt = "Device"; break;
    case 3: txt = "User Controls";   break;
  }
  host.showPopupNotification(txt);
}

//----------


//----------

function notify_mode() {
  switch(page) {
    case 0: break;
    case 1: notify_mode_mixer(); break;
    case 2: notify_mode_device(); break;
    case 3: notify_mode_user(); break;
  }
}

//----------------------------------------------------------------------
// update
//----------------------------------------------------------------------

function update(mode,x,y) {
  switch(page) {
    case 0: break;
    case 1: update_mixer(mode,x,y); break;
    case 2: update_device(mode,x,y); break;
    case 3: update_user(mode,x,y); break;
  }
}

//----------------------------------------------------------------------
// indicators
//----------------------------------------------------------------------

function draw_indicators() {
  switch(page) {
    case 1:
      for (var i=0; i<8; i++) {
        trackbank.getTrack(i).getVolume().setIndication(    true);
        trackbank.getTrack(i).getPan().setIndication(       true);
        trackbank.getTrack(i).getSend(0).setIndication(     true);
        trackbank.getTrack(i).getSend(1).setIndication(     true);
        primarydevice.getMacro(i).getAmount().setIndication(false);
        primarydevice.getCommonParameter(i).setIndication(  false);
        primarydevice.getEnvelopeParameter(i).setIndication(false);
        primarydevice.getParameter(i).setIndication(        false);
      }
      break;
    case 2:
      for (var i=0; i<8; i++) {
        trackbank.getTrack(i).getVolume().setIndication(    false);
        trackbank.getTrack(i).getPan().setIndication(       false);
        trackbank.getTrack(i).getSend(0).setIndication(     false);
        trackbank.getTrack(i).getSend(1).setIndication(     false);
        primarydevice.getMacro(i).getAmount().setIndication(true);
        primarydevice.getCommonParameter(i).setIndication(  true);
        primarydevice.getEnvelopeParameter(i).setIndication(true);
        primarydevice.getParameter(i).setIndication(        true);
      }
      break;
    case 3:
      for (var i=0; i<8; i++) {
        trackbank.getTrack(i).getVolume().setIndication(    false);
        trackbank.getTrack(i).getPan().setIndication(       false);
        trackbank.getTrack(i).getSend(0).setIndication(     false);
        trackbank.getTrack(i).getSend(1).setIndication(     false);
        primarydevice.getMacro(i).getAmount().setIndication(false);
        primarydevice.getCommonParameter(i).setIndication(  false);
        primarydevice.getEnvelopeParameter(i).setIndication(false);
        primarydevice.getParameter(i).setIndication(        false);
      }
      break;
  }
}
