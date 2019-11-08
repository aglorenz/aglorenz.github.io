// External JS: JS Helper Functions
// External JS: Dynamics JS
// 10/25/2019 Andrew Lorenz Modified to work for multiple modals
// 6/7/2019   Andrew Lorenz Modified to add:
//    Tuning of animation to personal taste
//    Animation of faded background with correct timing
//    Y-scrolling bar after modal display (if needed)
//    X-click to close modal
//    Close modal on ouside click and fix to work on Safari

// Original inspiration for modal animation by Phillip Rappold https://codepen.io/rppld/pen/vOvdyQ
// Original code for multiple modals found on https://jsfiddle.net/2kmvktpj/ 
//  pointed to by Paul_Wilkins on Stack Overflow at 
//  https://www.sitepoint.com/community/t/how-to-get-this-script-to-work-for-multiple-modal-popups/252443/11

//alert("modalV2.js loaded");

//Imediately Invoked Function Expression
(function () { 
  // execute code in srict mode.
  // e.g., can't use undeclared vars
  "use strict"; 
  
  function toggleClasses(modalBg) {
  toggleClass(modalBg, 'is-active'); // hide/display modal background
  }

  //------------------ Show Modal Functions -----------------//

  // added by Andrew Lorenz
  function fadeInModalBg(modalBg) {
    // Animate to final properties
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
      scale: 0.4
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
      });

      // Animate to final properties
      dynamics.animate(item, {
        opacity: 1,  
        translateY: 0
      }, {
        type: dynamics.spring,
        frequency: 300, // 250
        friction: 250,  // 400
        duration: 1000,  // 1000
        delay: 100 + i * 40
      });
    } 
  }

  //------------------ Hide Modal Functions -----------------//

  function fadeOutModalBg(modalBg) {
    // Animate to final properties from existing opacity of 1
    dynamics.animate(modalBg, {
      opacity: 0
  //    background: rgba(0, 0, 0, 1)
    }, {
      type: dynamics.linear,
      duration: 500
    });
  }

  function slideOutModal(modal) {
    /* Slide the modal down off screen */
    dynamics.animate(modal, {
      opacity: 0,  // 0
      translateY: 300  // 100
    }, {
      type: dynamics.spring,
      frequency: 50,
      friction: 600,
      duration: 2000
    });
  }

  ///////////////////////////////
  // Find the closest parent element that matches the selector. Ex: Find the ancestor of a modal's 
  // close button so we can set display = 'none' on the enclosing modal element.
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

  ///////////////////////////////
  // Close the modal (animated)
  function hideModal(modalBg, modal) {
    fadeOutModalBg(modalBg);
    slideOutModal(modal);
    /* Pause to allow modal to slide down before setting modalBg to display: none */
    dynamics.setTimeout(function () {
      toggleClasses(modalBg);
    }, 450);
    // Below line of code breaks when adding parameter.  Use above method instead.
    // dynamics.setTimeout(toggleClasses(modalBg), 450); 
    
    /* Turn off the Y-scrollbar on the Modal <-- move scrolling to outer div*/
    dynamics.setTimeout(function () {
      modal.style.overflowY='';
      document.body.style.paddingRight = "";
      document.body.style.overflow = "auto"; // ADD THIS LINE
    }, 450);
    // document.body.style.height = "auto"; // ADD THIS LINE
    // document.querySelector('.xmodal-content').style.overflowY='hidden';
  }


  //----------------  Event Listeners -----------------------//

  ///////////////////////////////
  // Get a list of all buttons with class='xmodal-open'
  var modalBtns = document.querySelectorAll(".xmodal-open");

  // Add a 'click' event listener for each open modal button
  // The function called by event listener, retrieves the unique 
  // value associated with the custom attribute 'data-xmodal-target'
  // This value identifies the modal which is then displayed.
  modalBtns.forEach(function addBtnClickEvent(btn) {
    btn.onclick = function showModal() {
      var modalDataAttribute = btn.getAttribute("data-xmodal-target");
      var modal = document.getElementById(modalDataAttribute);
      var modalBg = modal.parentElement;
      document.body.style.overflow = "hidden"; // ADD THIS LINE
      document.body.style.paddingRight = "17px";
      // document.body.style.height = "100%"; // ADD THIS LINE
      toggleClass(modalBg, 'is-active'); // hide/display modal background
      fadeInModalBg(modalBg); 
      /* delay modal animation to allow time for background fade in */
      dynamics.setTimeout(bounceInModal(modal), 150);
      dynamics.setTimeout(bounceInModalChildren(modal.children), 150);
      /* Pause so modal displays fully before adding Y-scrollbar.  Otherwise, get ugly text bounce during animation */
      //document.querySelector('.xmodal-content').style.overflowY='auto';
      dynamics.setTimeout(function () {
        modal.style.overflowY='auto';
      }, 700);
    };
  });

  ////////////////////////////////
  // // get a list of all elements with the 'xmodal-close' class
  var closeBtns = document.querySelectorAll(".xmodal-close");

  // For each 'xmodal-close' element found, create an event listener
  // on-click. The function invoked will search for the nearest
  // ancestor element with the 'modal' class.  When found, that
  // modal is closed.
  closeBtns.forEach(function addCloseclickEvent(btn) {
    btn.onclick = function setupHideModal() {
      var modal = closestEl(btn, ".xmodal-content");
      var modalBg = modal.parentElement;
      hideModal(modalBg, modal);
    };
  });

  ////////////////////////////////
  // Close the modal on modal background click
  window.onclick = function closeOnClick(event) {
    //alert(event.target.className);  
    if (event.target.className === 'xmodal-bg is-active') {
      var modalBg = event.target;
      var modal = modalBg.firstElementChild;
      hideModal(modalBg, modal);
    } /*else { alert(event.target.className);*/
    /*console.log('not modalBg',event.target);*/
  }
}());