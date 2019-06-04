// External JS: JS Helper Functions
// External JS: Dynamics JS
// Code by Phillip Rappold https://codepen.io/rppld/pen/vOvdyQ

var btnOpen = select('.js-open');
var btnClose = select('.js-close');
var xClose = select('.js-xclose')
var modalBg = select('.js-bg');
var modal = select('.js-modal');
var modalChildren = modal.children;

// added by Andrew Lorenz
function showModalBg() {
  // Define initial properties
  dynamics.css(modalBg, {
    backgroundColor: rgba(0, 0, 0, 0),
    scale: 1
  });
  
  // Animate to final properties
  dynamics.animate(modalBg, {
    backgroundColor: rgba(0, 0, 0, 1),
    scale: 1
  }, {
    type: dynamics.spring,
    frequency: 300,
    friction: 400,
    duration: 1000
  });
}


function hideModal() {
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

function showModal() {
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

function showBtn() {
  dynamics.css(btnOpen, {
    opacity: 0
  });
  
  dynamics.animate(btnOpen, {
    opacity: 1
  }, {
    type: dynamics.spring,
    frequency: 300,
    friction: 400,
    duration: 800
  });
}

function showModalChildren() {
  // Animate each child individually
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
      friction: 240,  // 400
      duration: 550,  // 1000
      delay: 100 + i * 40
    });
  } 
}

function toggleClasses() {
//  toggleClass(btnOpen, 'is-active');
//  toggleClass(modal, 'is-active');
  toggleClass(modalBg, 'is-active'); // hide/display modal background
}

///////////////////////////////
// Open the Modal

btnOpen.addEventListener('click', function(e) {
//  showModalBg(); 
  toggleClasses(); /* show faded modal bakground set display: flex simultaneously */
  showModal();
  showModalChildren();
  setTimeout(function () {
    document.querySelector('.xmodal').style.overflowY='auto';
    }, 500);
});

////////////////////////////////
// Close Modal on button click

btnClose.addEventListener('click', function(e) {
  hideModal();  // slide modal off screen
  dynamics.setTimeout(toggleClasses, 375);
  document.querySelector('.xmodal').style.overflowY='hidden';
  //  dynamics.setTimeout(showBtn, 500);
});

////////////////////////////////
// Close Modal on X click

xClose.addEventListener('click', function(e) {
  hideModal();  // slide modal off screen
  dynamics.setTimeout(toggleClasses, 375);
  document.querySelector('.xmodal').style.overflowY='hidden';
  //  dynamics.setTimeout(showBtn, 500);
});