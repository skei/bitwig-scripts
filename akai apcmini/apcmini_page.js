
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
    //case 5: page6_select(); break;
    //case 6: page7_select(); break;
    //case 7: page8_select(); break;
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
    //case 5: page6_update(type); break;
    //case 6: page7_update(type); break;
    //case 7: page8_update(type); break;
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
      //  apcmini_draw_arrow_light(x,COLOR_OFF);
      //}
      if (trackbank_canscrollscenesup)    apcmini_draw_arrow_light(0,COLOR_RED);
      else apcmini_draw_arrow_light(0,COLOR_OFF);
      if (trackbank_canscrollscenesdown)  apcmini_draw_arrow_light(1,COLOR_RED);
      else apcmini_draw_arrow_light(1,COLOR_OFF);
      if (trackbank_canscrolltracksup)    apcmini_draw_arrow_light(2,COLOR_RED);
      else apcmini_draw_arrow_light(2,COLOR_OFF);
      if (trackbank_canscrolltracksdown)  apcmini_draw_arrow_light(3,COLOR_RED);
      else apcmini_draw_arrow_light(3,COLOR_OFF);
      break;
    case DRAW_KNOBCTRL:
      for (var x=0; x<4; x++) {
        if (x==mode) apcmini_draw_knobctrl_light(x,COLOR_RED);
        else apcmini_draw_knobctrl_light(x,COLOR_OFF);
      }
      break;
    case DRAW_SCENELAUNCH:
      for (var y=0; y<8; y++) {
        if (y==page) apcmini_draw_scenelaunch_light(y,COLOR_GREEN);
        else apcmini_draw_scenelaunch_light(y,COLOR_OFF);
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
            case 0:
              if (trackbank_canscrollscenesup) {
                trackbank.scrollScenesPageUp();
                //var track = trackbank.getChannel(8);
                //track.getClipLauncherSlots().select(8);
                //application.arrowKeyUp();
                //scenebank.scrollPageUp();
/* */           for (var i=0; i<NUM_SCENES; i++) application.arrowKeyUp();
              }
              break;
            case 1:
              if (trackbank_canscrollscenesdown) {
                trackbank.scrollScenesPageDown();
                //var track = trackbank.getChannel(8);
                //track.getClipLauncherSlots().select(8);
                //application.arrowKeyDown();
                //scenebank.scrollPageDown();
/* */           for (var i=0; i<NUM_SCENES; i++) application.arrowKeyDown();
              }
              break;
            case 2:
              if (trackbank_canscrolltracksup)
                trackbank.scrollTracksPageUp();
              break;
            case 3:
              if (trackbank_canscrolltracksdown)
                trackbank.scrollTracksPageDown();
              break;
          }
        } // shift
        else {
          switch(x) {
            case 0:
              if (trackbank_canscrollscenesup) {
                trackbank.scrollScenesUp();
                //var track = trackbank.getChannel(8);
                //track.getClipLauncherSlots().select(8);
                application.arrowKeyUp();
                
                //scenebank.scrollUp();
/* */           //application.arrowKeyUp();

                /*
                // "the scene index within this bank,
                // not the index within the list of all Bitwig Studio scenes."
                var scene = scenebank.getScene(0);
                // "Makes the scene visible in the Bitwig Studio user interface."
                scene.showInEditor();
                scene.selectInEditor();
                */
                //application.focusPanelAbove();
                //application.focusPanelAbove();
                //application.focusPanelToLeft();
                //application.focusPanelToLeft();
                //application.focusPanelToRight();
                /*
                // selected, but not focus..
                var track = trackbank.getTrack(0);
                track.getClipLauncherSlots().select(0);
                application.arrowKeyUp();
                */
                
              }
              break;
            case 1:
              if (trackbank_canscrollscenesdown) {
                trackbank.scrollScenesDown();
                //scenebank.scrollDown();
/* */           //application.arrowKeyDown();

                //var i = (tr*NUM_SCENES)+index;
                //handle_clip_action(clip_name[i],tr,index,value);                
                //actions[158].invoke();                
                //application.arrowKeyDown();
                
                //var track = trackbank.getChannel(8);
                //track.getClipLauncherSlots().select(8);
                application.arrowKeyDown();
                
              }
              break;
            case 2:
              if (trackbank_canscrolltracksup)
                trackbank.scrollTracksUp();
              break;
            case 3:
              if (trackbank_canscrolltracksdown)
                trackbank.scrollTracksDown();
              break;
          }
        } // ! shift
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
      
      if (mode==-1) host.showPopupNotification("User Controls");
      else {
        switch(mode) {
          case 0: host.showPopupNotification("Volume"); break;
          case 1: host.showPopupNotification("Send1"); break;
          case 2: host.showPopupNotification("Send2"); break;
          case 3: host.showPopupNotification("Track Macros"); break;
        }
      }
      //host.showPopupNotification("Mode " + mode);
      
      break;
    case BUTTON_SCENELAUNCH:
      if (press) {
        if (shift_pressed) {
          if (y!=page) {
            page = y;
            page_select();
          }
        }
        else {
          // trigger scene
          trackbank.launchScene(y);
          
          if ( scene_name[y].charAt(0) != ' ') host.showPopupNotification(scene_name[y]);
          
        }
      }
      break;
    //case BUTTON_STOPALL:
    //  stopall_pressed = press;
    //  if (press && shift_pressed) {
    //    trackbank.getClipLauncherScenes().stop();
    //    //host.showPopupNotification("Stop All Clips");
    //  }
    //  break;
    case BUTTON_SHIFT:
      shift_pressed = press;
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


