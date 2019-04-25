
import {observerObject} from '../Ctrl/searchCtrl';


export const render = (resp) => {
    let time = new Date();
    let data = JSON.parse(resp);
    let appendSearchImages = document.getElementById('appendSearchImages');
    let resultsContainer = document.getElementsByClassName('results-container')[0];
    let li = '';
    for(let i=0;i<data.data.length;i++) {
      li += `<li>
                <div class="play-pause-gif">
                  <img class="show-img" src="${data.data[i].images.original_still.url}" width="120" >
                  <img class="show-gif" src="${data.data[i].images.preview_gif.url}" width="120" >
                  <div class="description-size"><p>Size : ${data.data[i].images.original_still.height} x ${data.data[i].images.original_still.width}</p></div>
                  <div class="play-pause-container">
                  <button class="play-pause-text">play</button>                 
                </div>
                </div>
            </li>`;
            new Image().src = data.data[i].images.original_still.url;
            new Image().src = data.data[i].images.preview_gif.url;
          }
          let time2 = new Date();
    resultsContainer.innerHTML = `Found ${data.pagination.total_count} GIFs images`;
    if(data.data.length === 0 && !observerObject.isNoResultsShown)    {
      observerObject.isNoResultsShown = true;
      appendSearchImages.innerHTML += `<div class="no-results-found"><img  src="https://cdn.dribbble.com/users/1554526/screenshots/3399669/no_results_found.png" ></div>`;
    }
    appendSearchImages.innerHTML += li;
    let increase = observerObject.offset;
    increase += 20;
    observerObject.offsetIncrease = increase;    
  };