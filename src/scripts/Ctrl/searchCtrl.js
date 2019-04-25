'use strict';
import {
  addInnerHTML,
  debounce
} from '../Utils/utils';
import {
  COMMON
} from '../Utils/Constants';
import {
  getServiceRequest
} from '../service/service';
import {
  render
} from '../Modal/loadSearch';



export const observerObject = {
  offset: 0,
  isRegistered: false,
  isNoResultsShown: false,
  set offsetIncrease(value) {
    this.offset += 20;
    console.log(this.offset);
  }
};


export const modeChange = (e) => {
  let getBodyDOM = document.querySelector('body').classList;
  if (getBodyDOM.value === 'light') {
    getBodyDOM.remove('light');
    addInnerHTML('mode-selector', '🌛');
  } else {
    getBodyDOM.add('light');
    addInnerHTML('mode-selector', '🌛');
  }
};

export const playPauseGIF = (event, element) => {
  element.classList.value.indexOf('active') === -1 ? element.classList.value += ' active' : element.classList.value = 'play-pause-gif';  
  element.children[3].outerText.indexOf('PLAY') === -1 ? element.children[3].children[0].innerText = 'PLAY' : element.children[3].children[0].innerText = 'PAUSE';  
};

export const searchDebounceCall = () => {
  if (!observerObject.isRegistered) {
    observerObject.isRegistered = true;
    window.addEventListener('scroll', debounce(function () {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {   
        searchValue();
      }      
    }, 50), false);
  }
};

export const searchTypingDebounceCall = () => {
  if (!observerObject.isRegistered) {    
    window.addEventListener('keyup', debounce(function () {   
      observerObject.offset = 0;
      observerObject.isNoResultsShown = false;  
      resetResults(); 
      searchValue();
    }, 2000), false);
  }
};


export const searchGIF = (e) => {
  e.preventDefault();
  observerObject.offset = 0;
  observerObject.isNoResultsShown = false;
  addAnimationClass();
  searchTypingDebounceCall();
  searchDebounceCall();  
  resetResults();
  return searchValue();
};

export const searchValue = () => {
  let searchTearm = document.getElementById('searchTerm').value;
  let apiKey = COMMON().API_KEY;
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTearm}&limit=20&rating=g&offset=${observerObject.offset}`;
  getServiceRequest(url, render);
};

export const addAnimationClass = () => {
  if (!observerObject.isRegistered) {
    document.getElementsByClassName('move-right')[0].classList.value += ' move-right-top';
    document.getElementsByClassName('move-top-text')[0].classList.value += ' move-top-right';
    document.getElementsByClassName('container-search-btn')[0].style.display = 'none';
    document.getElementsByClassName('search-results-container')[0].style.display = 'block';
  };
};

export const resetResults = () => {
  document.getElementById('appendSearchImages').innerHTML = '';
};