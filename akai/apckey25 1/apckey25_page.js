
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page_select() {

  page_draw(DRAW_GRID);
  page_draw(DRAW_ARROWS);
  page_draw(DRAW_KNOBCTRL);
  page_draw(DRAW_SCENELAUNCH);
  switch(page) {
    case 0: page1_select(); break;
    case 1: page2_select(); break;
    case 2: page3_select(); break;
    case 3: page4_select(); break;
    case 4: page5_select(); break;
  }
}

function page_update(type) {
  switch(type) {
    case UPDATE_ARROWS:
      page_draw(DRAW_ARROWS);
      break;
  }
  switch(page) {
    case 0: page1_update(type); break;
    case 1: page2_update(type); break;
    case 2: page3_update(type); break;
    case 3: page4_update(type); break;
    case 4: page5_update(type); break;
  }
}

function page_draw(type,index) {
  switch(type) {
    case DRAW_GRID:
      switch(page) {
        case 0: page1_draw(DRAW_GRID,index); break;
        case 1: page2_draw(DRAW_GRID,index); break;
        case 2: page3_draw(DRAW_GRID,index); break;
        case 3: page4_draw(DRAW_GRID,index); break;
        case 4: page5_draw(DRAW_GRID,index); break;
      }
      break;
    case DRAW_ARROWS:
      //for (var x=0; x<4; x++) {
      //  apckey25_draw_arrow_light(x,COLOR_OFF);
      //}
      if (trackbank_canscrollscenesup)    apckey25_draw_arrow_light(0,COLOR_RED);
      else apckey25_draw_arrow_light(0,COLOR_OFF);
      if (trackbank_canscrollscenesdown)  apckey25_draw_arrow_light(1,COLOR_RED);
      else apckey25_draw_arrow_light(1,COLOR_OFF);
      if (trackbank_canscrolltracksup)    apckey25_draw_arrow_light(2,COLOR_RED);
      else apckey25_draw_arrow_light(2,COLOR_OFF);
      if (trackbank_canscrolltracksdown)  apckey25_draw_arrow_light(3,COLOR_RED);
      else apckey25_draw_arrow_light(3,COLOR_OFF);
      break;
    case DRAW_KNOBCTRL:
      for (var x=0; x<4; x++) {
        if (x==mode) apckey25_draw_knobctrl_light(x,COLOR_RED);
        else apckey25_draw_knobctrl_light(x,COLOR_OFF);
      }
      break;
    case DRAW_SCENELAUNCH:
      for (var y=0; y<5; y++) {
        if (y==page) apckey25_draw_scenelaunch_light(y,COLOR_GREEN);
        else apckey25_draw_scenelaunch_light(y,COLOR_OFF);
      }
      break;
  }


}

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------

function page_button(type,x,y,press) {
  switch(type) {
    case BUTTON_GRID:
      switch(page) {
        case 0: page1_button(BUTTON_GRID,x,y,press); break;
        case 1: page2_button(BUTTON_GRID,x,y,press); break;
        case 2: page3_button(BUTTON_GRID,x,y,press); break;
        case 3: page4_button(BUTTON_GRID,x,y,press); break;
        case 4: page5_button(BUTTON_GRID,x,y,press); break;
      }
      break;
    case BUTTON_ARROW:
      if (press) {
        if (shift_pressed) {
          switch(x) {
            case 0: if (trackbank_canscrollscenesup)    trackbank.scrollScenesPageUp();     break;
            case 1: if (trackbank_canscrollscenesdown)  trackbank.scrollScenesPageDown();   break;
            case 2: if (trackbank_canscrolltracksup)    trackbank.scrollTracksPageUp();     break;
            case 3: if (trackbank_canscrolltracksdown)  trackbank.scrollTracksPageDown();   break;
          }
        } // shift
        else {
          switch(x) {
            case 0: if (trackbank_canscrollscenesup)    trackbank.scrollScenesUp();         break;
            case 1: if (trackbank_canscrollscenesdown)  trackbank.scrollScenesDown();       break;
            case 2: if (trackbank_canscrolltracksup)    trackbank.scrollTracksUp();         break;
            case 3: if (trackbank_canscrolltracksdown)  trackbank.scrollTracksDown();       break;
          }
        } // ! shift
        
        //trackbank.scrollToScene(0);
        //println(trackbank_scenescrollposition);
        //var scene = scenebank.getScene(0);
        //scene.showInEditor();
        
      }
      break;
    case BUTTON_KNOBCTRL:
      if (press) {
        if (x==mode) {
          mode = -1;
          page_draw(DRAW_KNOBCTRL);
        }
        else {
          mode = x;
          page_draw(DRAW_KNOBCTRL);
        }
      }
      
      if (mode==-1) host.showPopupNotification("Track Macros");
      else {
        host.showPopupNotification("User Controls " + (mode+1));
        //switch(mode) {
        //  case 0: host.showPopupNotification("Master FX 1"); break;
        //  case 1: host.showPopupNotification("Master FX 2"); break;
        //  case 2: host.showPopupNotification("Send2"); break;
        //  case 3: host.showPopupNotification("Track Macros"); break;
        //}
      }
      //host.showPopupNotification("Mode " + mode);
      
      
      break;
    case BUTTON_SCENELAUNCH:
      if (press && (y!=page)) {
        page = y;
        page_select();
      }
      break;
    case BUTTON_STOPALL:
      stopall_pressed = press;
      if (press && shift_pressed) {
        trackbank.getClipLauncherScenes().stop();
        //host.showPopupNotification("Stop All Clips");
      }
      break;
    case BUTTON_SHIFT:
      shift_pressed = press;
      break;
    case BUTTON_PLAY:
      if (press) {
        if (shift_pressed) {
          transport.tapTempo();
          host.showPopupNotification("Tap Tempo");
        }
        else {
          transport.togglePlay();
          host.showPopupNotification("Play");
        }
      }
      break;
    case BUTTON_REC:
      if (press) {
        if (shift_pressed) {
          transport.toggleClick();
          host.showPopupNotification("Toggle Metronome");
        }
        else {
          //transport.record();
          //host.showPopupNotification("Record");
          transport.toggleLauncherOverdub();
          transport.toggleWriteClipLauncherAutomation();
          host.showPopupNotification("Toggle Clip Overdub");
        }
      }
      break;
  }
}


function page_knob(index,press) {
  switch(page) {
    case 0: page1_knob(index,press); break;
    case 1: page2_knob(index,press); break;
    case 2: page3_knob(index,press); break;
    case 3: page4_knob(index,press); break;
    case 4: page5_knob(index,press); break;
  }
}


