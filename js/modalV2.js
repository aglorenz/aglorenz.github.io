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
// var btnOpen = select('.xmodal-open'); // trigger to open modal
// var modalBg = null;   // modal background
// var modal = select('.xmodal-content'); // element containing the current modal
//var modalChildren = modal.children;  // modal children to animate individually
// var btnClose = select('.xmodal-close'); // close modal on Close btn click
// var xClose = select('.xclose'); // close modal on X click

function toggleClasses() {
//  toggleClass(btnOpen, 'is-active');  
//  toggleClass(modal, 'is-active');
  toggleClass(modalBg, 'is-active'); // hide/display modal background
}

//------------------ Show Modal Functions -----------------//

// added by Andrew Lorenz
function fadeInModalBg(modalBg) {
  // Animate to final properties
  console.log('modalBg is', modalBg);
  dynamics.animate(modalBg, {
    opacity: 1
//    background: rgba(0, 0, 0, 1) // doesn't animate
  }, {
    type: dynamics.linear,
    duration: 250
  });
}

function bounceInModal(modal) {
  // Define initial properties
  dynamics.css(modal, {
    opacity: 0.1, // 0
    scale: 0.5
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

function bounceInModalChildren(modalChildren) {
  // Animate each child separately
  for (var i=0; i<modalChildren.length; i++) {
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

// function showModal() {
//   toggleClasses(); /* set display: flex  from 'none' */
//   fadeInModalBg(); 
//   /* delay modal animation to allow time for background fade in */
//   dynamics.setTimeout(bounceInModal, 150);
//   dynamics.setTimeout(bounceInModalChildren, 150);
//   /* Pause so modal displays fully before adding Y-scrollbar.  Otherwise, get ugly text bounce during animation */
//   dynamics.setTimeout(function () {
//     document.querySelector('.xmodal-content').style.overflowY='auto';
//     }, 700);
// }

//------------------ Hide Modal Functions -----------------//

function fadeOutModalBg(modalBg) {
  // Animate to final properties from existing opacity of 1
  dynamics.animate(modalBg, {
    opacity: 0
//    background: rgba(0, 0, 0, 1)
  }, {
    type: dynamics.linear,
    duration: 250
  });
}

function slideOutModal(modal) {
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


function closestEl(el, selector) {
  var doc = el.document || el.ownerDocument;
  var matches = document.querySelectorAll(selector);
  var i;
  while (el) {
      i = matches.length - 1;
      while (i >= 0) {
          if (matches.item(i) === el) {
              return el;
          }
          i -= 1;
      }
      el = el.parentElement;
  }
// in theory, this section should never be reached
  return el;
}

function hideModal(modalBg, modal) {
  fadeOutModalBg(modalBg);
  slideOutModal(modal);
  /* Pause to allow modal to slide down before hiding it */
  dynamics.setTimeout(toggleClasses, 450);
  /* Turn off the Y-scrollbar */
  document.querySelector('.xmodal-content').style.overflowY='hidden';
}


//----------------  Event Listeners -----------------------//

///////////////////////////////
// Open the respective modal on button click - handles multiple modals
var modalBtns = document.querySelectorAll(".xmodal-open");

modalBtns.forEach(function addBtnClickEvent(btn) {
    btn.onclick = function showModal() {
        var modalDataAttribute = btn.getAttribute("data-xmodal-target");
        modal = document.getElementById(modalDataAttribute);
        modalBg = modal.parentElement;
        console.log('opening modalBg = ',modalBg);
        toggleClass(modalBg, 'is-active'); // hide/display modal background
        //toggleClasses(); /* set modal to display: flex from 'none' */
        fadeInModalBg(modalBg); 
        /* delay modal animation to allow time for background fade in */
        dynamics.setTimeout(bounceInModal(modal), 150);
        dynamics.setTimeout(bounceInModalChildren(modal.children), 150);
        /* Pause so modal displays fully before adding Y-scrollbar.  Otherwise, get ugly text bounce during animation */
        dynamics.setTimeout(function () {
            document.querySelector('.xmodal-content').style.overflowY='auto';
        }, 700);
        //document.getElementById(modal).style.display = "block";
    };
});

////////////////////////////////
// Open modal on button click - for single modal
// btnOpen.addEventListener('click', function(e) {
//   console.log(e.target.attributes['data-target']);
//   showModal();
// });

////////////////////////////////
// Close modal on Close button or X click
var closeBtns = document.querySelectorAll(".xmodal-close");
console.log('close buttons = ',closeBtns);

closeBtns.forEach(function addCloseclickEvent(btn) {
    btn.onclick = function myHideModal() {
      var modal = closestEl(btn, ".xmodal-content");
      var modalBg = modal.parentElement;
      hideModal(modalBg, modal);
        // var modal = closestEl(btn, ".xmodal-content");
        // var modalBg = modal.parentElement;
        // fadeOutModalBg(modalBg);
        // slideOutModal(modal);
    /* Pause to allow modal to slide down before hiding it */
    // dynamics.setTimeout(toggleClasses, 450);
    /* Turn off the Y-scrollbar */
    // document.querySelector('.xmodal-content').style.overflowY='hidden';
        //modal.style.display = "none";
    };
});

// btnClose.addEventListener('click', function(e) {
//   hideModal();  
// });

////////////////////////////////
// Close modal on X click

// xClose.addEventListener('click', function(e) {
//   hideModal();  
// });

////////////////////////////////
// Close Modal on modal background click
window.onclick = function closeOnClick(event) {
  //alert(event.target.className);  
  if (event.target.className === 'xmodal-bg is-active') {
    var modalBg = event.target;
    var modal = modalBg.firstElementChild;
    hideModal(modalBg, modal);
  } /*else { alert(event.target.className);*/
  /*console.log('not modalBg',event.target);*/
}
