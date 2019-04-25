import {
  modeChange,
  searchGIF, 
  playPauseGIF 
} from '../Ctrl/searchCtrl';

import { bindEventID,bindEventClass, delegate } from '../Utils/utils';

export const init = () => {
  bindEventClass('mode-selector', modeChange, 'click');
  bindEventID('searchGif', searchGIF, 'click');   
  delegate(document, "click", ".play-pause-gif", function(e){
    playPauseGIF(e,this);
  });
};