// External JS: JS Helper Functions
// External JS: Dynamics JS
// 5-6/7/2019 Andrew Lorenz Modified  to add:
//    Tuning of animation to personal taste
//    Faded background with correct timing
//    Y-scrolling after modal display
//    X-click to close modal
//    Close modal on ouside click and fix it (outside click) to work on Safari

// Original code by Phillip Rappold https://codepen.io/rppld/pen/vOvdyQ

//alert("modalV2.js loaded");

var btnOpen = select('.js-open');
var btnClose = select('.js-close');
var xClose = select('.js-xclose')
var modalBg = select('.xmodal-bg.is-active');
var modal = select('.js-modal');
var modalChildren = modal.children;

function toggleClasses() {
//  toggleClass(btnOpen, 'is-active');
//  toggleClass(modal, 'is-active');
  toggleClass(modalBg, 'is-active'); // hide/display modal background
}

//------------------ Show Modal Functions -----------------//

// added by Andrew Lorenz
function fadeInModalBg() {
  // Animate to final properties
  dynamics.animate(modalBg, {
    opacity: 1
//    background: rgba(0, 0, 0, 1) // doesn't animate
  }, {
    type: dynamics.linear,
    duration: 250
  });
}

function bounceInModal() {
  // Define initial properties
  dynamics.css(modal, {
    opacity: .1, // 0
    scale: .5  
  });
  
  // Animate to final properties
  dynamics.animate(modal, {
    opacity: 1,
    scale: 1
  }, {
    type: dynamics.spring,
    frequency: 300,
    friction: 400,
    duration: 1000
  });
}

function bounceInModalChildren() {
  // Animate each child separately
  for(var i=0; i<modalChildren.length; i++) {
    var item = modalChildren[i];
    
    // Define initial properties
    dynamics.css(item, {
      opacity: 0,
      translateY: 25  // 30
//      translateY: 40  // 30
    });

    // Animate to final properties
    dynamics.animate(item, {
      opacity: 1,  
      translateY: 0
    }, {
      type: dynamics.spring,
//      frequency: 300, // 300 originals
//      friction: 400,  // 400
//      duration: 1000,  // 1000
      frequency: 300, // 250
      friction: 250,  // 400
      duration: 1000,  // 1000
      delay: 100 + i * 40
    });
  } 
}

function showModal() {
  toggleClasses(); /* set display: flex */
  fadeInModalBg(); 
  /* delay modal animation to allow time for background fade in */
  dynamics.setTimeout(bounceInModal, 150);
  dynamics.setTimeout(bounceInModalChildren, 150);
  /* Pause so modal displays fully before adding Y-scrollbar.  Otherwise, get ugly text bounce during animation */
  dynamics.setTimeout(function () {
    document.querySelector('.xmodal').style.overflowY='auto';
    }, 700);
}

//------------------ Hide Modal Functions -----------------//

function fadeOutModalBG() {
  // Animate to final properties from existing opacity of 1
  dynamics.animate(modalBg, {
    opacity: 0
//    background: rgba(0, 0, 0, 1)
  }, {
    type: dynamics.linear,
    duration: 250
  });
}

function slideOutModal() {
  /* Slide the modal down off screen */
  dynamics.animate(modal, {
    opacity: 0,  // 0
    translateY: 150  // 100
  }, {
    type: dynamics.spring,
    frequency: 50,
    friction: 600,
    duration: 1500
  });
}

function hideModal() {
  fadeOutModalBG();
  slideOutModal();
  /* Pause to allow modal to slide down before hiding it */
  dynamics.setTimeout(toggleClasses, 450);
  /* Turn off the Y-scrollbar */
  document.querySelector('.xmodal').style.overflowY='hidden';
}

//----------------  Event Listeners -----------------------//

///////////////////////////////
// Open the Modal on button click

btnOpen.addEventListener('click', function(e) {
  showModal();
});

////////////////////////////////
// Close Modal on button click

btnClose.addEventListener('click', function(e) {
  hideModal();  
});

////////////////////////////////
// Close Modal on X click

xClose.addEventListener('click', function(e) {
  hideModal();  
});

////////////////////////////////
// Close Modal on modal background click
var modalBg = document.getElementById('xmodalBgID');

window.onclick = function(event) {
//  alert(event.target.className);  
  if (event.target == modalBg) {
    hideModal();  
  } /*else { alert(event.target.className);*/
  /*console.log('not modalBG',event.target);*/
}
