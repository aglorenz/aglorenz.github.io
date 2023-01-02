// alert("main.js loaded");

// Collapse navbar menu on selection click.  
// Source: https://www.codeply.com/go/XtiWqN3lGn
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

// check if link is local or external
function link_is_external(link_element) {
  return (link_element.host !== window.location.host);
}

// smooth scrolling 
// source:  W3schools.com https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure link is local and this.hash has a value before overriding default behavior
    // Can't scroll smoothly on an external link.  We will just jump to it.
    if (this.hash !== "" && !link_is_external(this)) {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

// Set section  to full height of viewport if content height is smaller so that background
// // color is full height of screen.
// $(window).on('resize scroll', function(e){
//   //give each element a name like projects1, navbar1, etc
//   // loop through the array and adjust as necessary

//   var secH = document.getElementById('projects').clientHeight; // section height
//   var nbH = document.getElementById('navbar').clientHeight; // navbar height
//   var h1H = document.getElementById('h1h').clientHeight; // H1 height
//   var SFH = document.getElementById('sfh').clientHeight; // skills flex height
//   var that = document.getElements
//   var viewPortH = window.innerHeight;
//   console.log("secH = ", secH, "nbh = ", nbH, "h1H = ", h1H, "SFH = ", SFH, "viewPortH = ", viewPortH);

//   if (SFH + 126 > viewPortH) {
//       $('#projects').removeClass('full-height');
//   } else {
//       $('#projects').addClass('full-height');
//   }
// });
// // fake a resize event on window load to call above function
// $(window).trigger('resize');  
