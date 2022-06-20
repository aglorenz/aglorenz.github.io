
// --------------------------------------------------------------------------
// This function parses through the pizza menu and checks for elements
// checked/selected by the user, consolidate the info into a 2D array, 
// and displays the receipt to the user.  i.e., user selections, individual price,
// and total price.

function processOrder() {

    //---------------------------------------------------------------------------
    // This 2D array holds list of selected pizza ingredients and prices for the 
    // final receipt.
    //---------------------------------------------
    var namePriceArray = [];  
    
    //---------------------------------------------
    // Data driven program
    // Need dictionaries for size, crust, cheese choices.
	// All others choices not necessary since they are 1$ each; first one free
    // 
    //---------------------------------------------
	
	var menuDict = {
		sizeDict: {
			Personal:       6,
			Medium:         10,
			Large:          14,
			"Extra Large":  16,	
		},
		crustDict: {
			Plain:              0,
			"Garlic Butter":    0,
			"Cheese Stuffed":   3,
			Spicy:              0,
			"Gluten Free":      2,
		},
		sauceDict:  {
			"No Sauce":         0,
            "Marinara Sauce":   0,
			"Pesto Sauce":      0,
            "BBQ Sauce":        0,
            "Fresh Garlic":     0,
            "Red Peppr Flakes": 0,
		},
		cheeseDict: {
			"No Cheese":        0,
			Mozzerella:         0,
			Provolone:          0,
			Goat:               0,
            Cheddar:            1,
            Daiya:              1,
			"Extra Cheese":     1,
		},
		meatDict: {
			Pepperoni:          1,
			Sausage:            1,
			"Canadian Bacon":   1,
			"Ground Beef":      1,
			Chicken:            1,
			"Smoked Chicken":   1,
		},
		veggieDict: {
			Tomatoes:           1,
			"Red Onions":       1,
			Olives:             1,
			"Green Peppers":    1,
			Mushrooms:          1,
			Pineapple:          1,
			Spinach:            1,
			Artichoke:          1,
		}
	}
	          
    var itemArray = [];     // to hold menu items selected by user 

    //---------------------------------------------
    // Add pizza size and price to the cart
    //---------------------------------------------
    itemArray = document.getElementsByName("size");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
			// Add the value attribute from the html radio button (which is also the pizza item name) to the list, 
			// and use it to look up the price from the dictionary
			pizzaSize = itemArray[i].value;
            namePriceArray.push([pizzaSize, menuDict.sizeDict[pizzaSize]]); // size, price
            {break} // only 1 choice, so break when the first is found
        }
    }
    // for (var i = 0; i < itemArray.length; i++) {
        // if (itemArray[i].checked) {
            // namePriceArray.push([sizeArray[i][0], sizeArray[i][1]]); // size, price
            // {break} // only 1 choice, so break when the first is found
        // }
    // }
    
    //---------------------------------------------
    // Add crust selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByName("crust");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
			pizzaCrust = itemArray[i].value;
            namePriceArray.push([pizzaCrust, menuDict.crustDict[pizzaCrust]]); // crust, price
            {break} // only 1 choice, so break when the first is found
        }
    }
    
    //---------------------------------------------
    // Add sauce selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByName("sauce");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
			sauce = itemArray[i].value
            namePriceArray.push([sauce, menuDict.sauceDict[sauce]]); // sauce, price 
        }
    }
    
    //---------------------------------------------
    // Add cheese selection and price to the array
    //---------------------------------------------
    // var noCheese = document.getElementById("no-cheese");
    // var extraCheese = document.getElementById("extra-cheese");
    // Don't allow extra cheese to be checked if no cheese is selected
    validateCheese();
    itemArray = document.getElementsByName("cheese");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
			cheese = itemArray[i].value;
            namePriceArray.push([cheese, menuDict.cheeseDict[cheese]]); // cheese, price
        }
    }

    //---------------------------------------------
    // Add meat selection and price to the array
    //---------------------------------------------
	var meatCount = 0;   // Number of meat items selected
    itemArray = document.getElementsByName("meat");
    for (var i = 0; i < itemArray.length; i++) {
		meat = itemArray[i].value;
        if (itemArray[i].checked)  {
			// meat, price -- first one free
			(meatCount < 1 ) ? namePriceArray.push([meat, 0]) : namePriceArray.push([meat, menuDict.meatDict[meat]]); 
            meatCount++;
        }
    }
    
    //---------------------------------------------
    // Add veggie selection and price to the array
    //---------------------------------------------
    var veggieCount = 0; // Number of veggie items selected
    itemArray = document.getElementsByName("veggies");
    for (var i = 0; i < itemArray.length; i++) {
		veggie = itemArray[i].value;
        if (itemArray[i].checked) {
			// veggie, price ==- first one free
			(veggieCount < 1 ) ? namePriceArray.push([veggie, 0]) : namePriceArray.push([veggie, menuDict.veggieDict[veggie]]);
		    veggieCount++;
        }
    }
    
    //---------------------------------------------
    // Show the receipt to the user
    //---------------------------------------------
    displayReceipt(namePriceArray)
}

// --------------------------------------------------------------------------
// Checks if No Cheese and Extra Cheese are selected.  If so, cancel the extra 
// cheese selection and show a tooltip telling user to select a cheese first 
function validateCheese() {
    var noCheese = document.getElementById("no-cheese");
    var extraCheese = document.getElementById("extra-cheese");
    var toolText = document.getElementById("cheese-tip")
    if (noCheese.checked && extraCheese.checked) {
        extraCheese.checked = false;
        // set tooltip visible for a short period
        toolText.style.visibility="visible";
        setTimeout(function () { toolText.style.visibility="hidden";}, 1700);
    }
}

function scrollToTotal() {
    var element = document.getElementById('tot-prc');
    // element.scrollIntoView();
    element.scrollIntoView({behavior: "smooth"});
}

// --------------------------------------------------------------------------
// Cancel the Extra cheese selection when user clicks on No Cheese
function cancelExtraCheese() {
    var extraCheese = document.getElementById("extra-cheese");
    extraCheese.checked = false;
}

//-----------------------------------------------------------------
// Given a 2D list of items and prices:
// 1) create two HTML formatted strings separated by line breaks.  
//    One for items selected, one for the corresponding prices.
// 2) Calculate total price along the way
// 3) Inject all 3 into the cart.
//-----------------------------------------------------------------
function displayReceipt(namePriceArray) {
 
    // To hold a list of pizza items and their respective prices
    var itemNameList = "";
    var itemPriceList = "";
    var totalPrice = 0;

    // loop through the 2D Name/Price array and format the text lists 
    // for final output.  Calculte the total price.
    for (var i = 0; i < namePriceArray.length; i++) {
        itemNameList += namePriceArray[i][0] + "<br>";
        itemPriceList += "$" + namePriceArray[i][1] + ".00" + "<br>";
        totalPrice += namePriceArray[i][1];
    }
    document.getElementById("cart").style.opacity=.90; // turn on the cart
    document.getElementById("itm-sel").innerHTML=itemNameList;
    document.getElementById("itm-prc").innerHTML=itemPriceList;
    document.getElementById("tot-prc").innerHTML="<h3>$"+totalPrice+".00"+"</h3>";
}

function clearSelections() {
    document.getElementById("menuForm").reset();
	processOrder();
}

// show cart right at the start
processOrder();


// restart wings animation when clicking on pizza halo
// https://codepen.io/chriscoyier/pen/EyRMoJ
"use strict";

// retrieve the element
var element = document.getElementById("restart");

// reset the transition by...
element.addEventListener("click", function(e){
  e.preventDefault;
  
  // -> removing the class
  var anim = document.querySelectorAll('.leftwing, .rightwing');
  anim[0].classList.remove("leftwing");
  anim[1].classList.remove("rightwing");
  
  // -> triggering reflow /* The actual magic */
  // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
  // This was, from the original tutorial, will not work in strict mode. Thanks Felis Phasma! The next uncommented line is the fix.
  // element.offsetWidth = element.offsetWidth;
  
  void anim[0].offsetWidth;
  void anim[1].offsetWidth;
  
  // -> and re-adding the class
  anim[0].classList.add("leftwing");
  anim[1].classList.add("rightwing");
}, false);

// play stop wings animation
// var anim = document.querySelectorAll('.leftwing, .rightwing');
// document.getElementById('play-stop').onclick = function () {
//     for (var i = 0; i < anim.length; i++) {
//         if (anim[i].style.animationPlayState == 'paused') {
//             anim[i].style.animationPlayState = 'running';
//         }
//         else {
//             anim[i].style.animationPlayState = 'paused';
//         }
//     }
// }


// smooth scrolling 
// source:  W3schools.com https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
$(document).ready(function(){
    // Add smooth scrolling to all links
    $("div.buttonnnnnnnnnnnnn").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
    //   if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = "#tot-prc";
        // var hash = this.hash;
        
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
          console.log("done");
        });
    //   } // End if
    });
});
//http://jsfiddle.net/loktar/yhQZu/18/
function checkIfInView(element){
    var offset = element.offset().top - $(window).scrollTop();

    if(offset > window.innerHeight){
        // Not in view so scroll to it
        $('html,body').animate({scrollTop: offset}, 1000);
        return false;
    }
   return true;
}

// window.addEventListener('scroll', function(ev) {

//     var someDiv = document.getElementById('tot-prc-hdr');
//     var distanceToTop = someDiv.getBoundingClientRect().top;
 
//     console.log(distanceToTop);
//  });

function scrollUntilVisible(id, duration) {
    const  el = document.getElementById(id);
    const topOfDiv = el.getBoundingClientRect().top + window.pageYOffset; // distance from top of webpage to top of element (visible or not)
    const divHeight = document.getElementById(id).clientHeight;  // height of element
    const botOfDiv = topOfDiv + divHeight; // top of webpage to bottom of element
    // const scrollDistance = botOfDiv - window.innerHeight - window.pageYOffset
    // console.log("topOfDiv = " + topOfDiv);
    // console.log("div height = " + divHeight);
    // console.log("window.pageYOffset = " + window.pageYOffset); // y-scroll offset of page 
    // console.log("window.innerHeight = " + window.innerHeight); // height of window
    // console.log("scrollDistance = " + scrollDistance); 

    var y = $(window).scrollTop(); // current y position
    // $('html, body').animate({ scrollTop: y + scrollDistance },duration, 'swing');
    $('html, body').animate({ scrollTop: botOfDiv - window.innerHeight }, duration, 'swing');
}


function scrollUntilVisibleOld(id, duration) {
    // This is not as smooth as animated scrolling.  Not going to use it.
    // const endPoint = typeof id === 'string' ? document.getElementById(id).offsetTop : id.offsetTop;
    // const endPoint = typeof id === 'string' ? document.getElementById(id).scrollTop : id.scrollTop;
    // endPoint = id.getBoundingClientRect().top
    const  el = document.getElementById(id);
    const topOfDiv = el.getBoundingClientRect().top + window.pageYOffset; // distance from top of webpage to top of element (visible or not)
    const divHeight = document.getElementById(id).clientHeight;  // height of element
    const botOfDiv = topOfDiv + divHeight; // top of webpage to bottom of element
    console.log("topOfDiv = " + topOfDiv);
    console.log("div height = " + divHeight);
    console.log("window.pageYOffset = " + window.pageYOffset); // y-scroll offset of page 
    console.log("window.innerHeight = " + window.innerHeight); // height of window

    const scrollDistance = botOfDiv - window.innerHeight - window.pageYOffset,
        rate = ((scrollDistance * 4) / duration) < 1 ? 1 : (scrollDistance * 4) / duration, // px/4ms
        interval = setInterval(scrollIncrement, 4); //4ms is minimum interval for browser
    console.log("distance = " + scrollDistance);
    // var itemPriceList = "";
    // itemPriceList += "topDiv = " + topOfDiv + "<br>";
    // itemPriceList += "distance = " + scrollDistance + "<br>";
    // itemPriceList += "rate = " + rate + "<br>";
    // itemPriceList += "interval = " + interval + "<br>";
    // document.getElementById("itm-prc").innerHTML=itemPriceList;


    // used in below function to determine if we have stopped scrolling 
    var prevYOffset = -1; // initialize previous y - offset to something not possible

    function scrollIncrement() {
        // const yOffset = Math.ceil(window.pageYOffset);
        const yOffset = (window.pageYOffset);
            // document.getElementById("tot-prc").innerHTML="<h3>YO = "+yOffset+"</h3>";
            // document.getElementById("tot-prc-hdr").innerHTML="<h3>PY = "+prevYOffset+"</h3>";

        // itemPriceList += "yOffset = " + yOffset + "<br>";

        if (
            (yOffset + window.innerHeight >= botOfDiv && rate >= 0) ||  // scrolling down
            // (yOffset == prevYOffset) ||  // or stop when we can't scroll anymore like when target is near bottom of page
            (yOffset  + window.innerHeight <= botOfDiv && rate <= 0)  // scrolling up
        ) {
            clearInterval(interval)
        } else {
            prevYOffset = yOffset;  // Save current offset for next time this function is called.
            
            //keep in mind that scrollBy doesn't work with decimal pixels < 1 like 0.4px, so
            //if duration is too big, function won't work. rate must end up being >= 1px
            window.scrollBy(0, rate);
            console.log("rate = " + rate);
        } 
    }
}
