export const bindEventID = (id, functionName, event) => {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(id).addEventListener(event, functionName, false);
  });
};


export const bindEventClass = (className, functionName,event) => {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName(className)[0].addEventListener(event, functionName, false);
  });  
};

export const addInnerHTML = (className, data) => { 
    let domElement = document.getElementsByClassName(className)[0];
    domElement.innerHTML = data;
};


export const debounce = (func, delay) => {      
  let inDebounce;
  return function() {        
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {                       
      func.apply(context, args);          
    }, delay);    
};    
};

export const delegate = (el, evt, sel, handler) => {
  el.addEventListener(evt, function(event) {
      var t = event.target;
      while (t && t !== this) {
          if (t.matches(sel)) {
              handler.call(t, event);
          }
          t = t.parentNode;
      }
  });
};
