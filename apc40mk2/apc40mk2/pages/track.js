
trackPage = function(name) {
  Page.call(this,name);
  
  this.track_pos    = 0;
  /*
  this.slider_pos   = 4;
  this.slider_size  = 4;
  this.slider       = initArray(0,NUM_SCENES);
  */
}

//----------

trackPage.prototype = Object.create(Page.prototype);
trackPage.prototype.constructor = trackPage;

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

//trackPage.prototype.init = function() {
//  //Page.prototype.init.call(this);
//}

//----------

//trackPage.prototype.exit = function() {
//}

//----------

trackPage.prototype.select = function() {
  //println("trackPage.select");
  this.updateGrid();
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

/*
trackPage.prototype.handleSlider = function(x,y) {
  println("handleSlider " + x + " " + y);
  this.slider[y] = x;
  this.updateSlider(this.slider_pos,y);
  var v = 0;
  switch (x) {
    case 0: v = 0;    break;
    case 1: v = 0.36; break;
    case 2: v = 0.66; break;
    case 3: v = 1;    break;
  }
  bitwig.setUserControl( (USER_CTRL_TRACKPAGE + y), v );  
}
*/

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

trackPage.prototype.onControl = function(control,msg,chn,data1,data2) {
  var pressed = (data2>63);
  if (msg == MIDI_NOTE_ON) {
    switch (control.id) {
      case BUTTON_GRID:
        var i = control.index;
        var x = controller.gridX(i);
        var y = controller.gridY(i);
        
        if (x == this.track_pos) {
          var t = controller.selected_track;
          if ((t >= 0) && (t < NUM_TRACKS)) {
            if (pressed) bitwig.launchClip(t,y);
          }
        }
        
        /*
        if (x >= this.slider_pos) {
          this.handleSlider(x-this.slider_pos,y);
        }
        */
        
        break;
      case BUTTON_ARROW_UP:
        if (pressed) {
          bitwig.scrollGrid(UP,controller.shift_pressed);
        }
        break;
        
      case BUTTON_ARROW_DOWN:
        if (pressed) {
          bitwig.scrollGrid(DOWN,controller.shift_pressed);
        }
        break;
        
      case BUTTON_ARROW_LEFT:
        if (pressed) {
          bitwig.scrollGrid(LEFT,controller.shift_pressed);
        }
        break;
        
      case BUTTON_ARROW_RIGHT:
        if (pressed) {
          bitwig.scrollGrid(RIGHT,controller.shift_pressed);
        }
        break;
        
    }
  }
}

//----------

trackPage.prototype.onObserver = function(obs,value,x,y) {
  //println("trackPage.onObserver " + obs + " " + value + " " + x + "," + y);
  switch (obs) {
    case OBS_TRACK_SELECTED:
      if (value) this.updateTrack(x,this.track_pos);
      break;
    case OBS_MASTER_SELECTED:
      //this.updateTrack(8,this.track_pos);
      if (value) this.clearTrack(this.track_pos);
      break;
    default:
      switch (obs & 0xff00) {
        case OBS_CLIP:
          if (x == controller.selected_track) this.updateTrack(x,this.track_pos);
          break;
      }
      break;
  }
}

//----------------------------------------------------------------------
//
//
//
//----------------------------------------------------------------------

trackPage.prototype.updateTrack = function(track) {
  //println("updateTrack: " + track);
  for (y=0; y<NUM_SCENES; y++) {
    this.updateClipColor(track,y,this.track_pos,y);
  }
}

//----------

trackPage.prototype.updateGrid = function() {
  this.clearGrid();
  var track = controller.selected_track;
  if (track >= NUM_TRACKS) this.clearTrack(this.track_pos);
  else this.updateTrack(track);
  
  /*
  for (var i=0; i<NUM_SCENES; i++) this.updateSlider(this.slider_pos,i);
  */
  
}

//----------

/*
trackPage.prototype.updateSlider = function(x,y) {
  //println("drawSlider " + x + " " + y);
  var size = this.slider_size;
  for (var n=0; n<size; n++) {
    var color = LED_OFF;
    if (n == this.slider[y]) color = LED_RED;
    else color = LED_WHITE;
    var i = controller.gridIndex(x+n,y);
    control = controller.getControl(MIDI_NOTE_ON,0,BUTTON_GRID+i);
    controller.queueControl(control,color);
  }
}
*/

