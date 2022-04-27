function processOrder() {
    // --------------------------------------------------------------------------
    // This function parses through the pizza menu and checks for elements
    // checked/selected by the user, consolidate the info into a 2D array, 
    // and displays the receipt to the user.  i.e., user selections, individual price,
    // and total price.


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
			Personal:		6,
			Medium:			10,
			Large:			14,
			"Extra Large":	16		
		},
		crustDict: {
			Plain:				0,
			"Garlic Butter": 	0,
			"Cheese Stuffed": 	3,
			Spicy:				0,
			"House Special": 	0
		},
		sauceDict:  {
			"Marinara Sauce":	0,
			"White Sauce":		0,
			"BBQ Sauce": 		0,
			"No Sauce":			0
		},
		cheeseDict: {
			"No Cheese":		0,
			"Regular Cheese":	0,
			"Extra Cheese":		3
		},
		meatDict: {
			Pepperoni:			1,
			Sausage:			1,
			"Canadian Bacon":	1,
			"Ground Beef":		1,
			Anchovy:			1,
			Chicken:			1
		},
		veggieDict: {
			Tomatoes:			1,
			Onions:				1,
			Olives:				1,
			"Green Peppers":	1,
			Mushrooms:			1,
			Pineapple:			1,
			Spinach:			1,
			Jalapeno:			1
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
            {break} // only 1 choice, so break when the first is found
        }
    }
    
    //---------------------------------------------
    // Add cheese selection and price to the array
    //---------------------------------------------
    itemArray = document.getElementsByName("cheese");
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i].checked) {
			cheese = itemArray[i].value;
            namePriceArray.push([cheese, menuDict.cheeseDict[cheese]]); // cheese, price
            {break} // only 1 choice, so break when the first is found
        }
    }

    //---------------------------------------------
    // Add meat selection and price to the array
    //---------------------------------------------
	var meatCount = 0;   // Number of meat items selected
    itemArray = document.getElementsByName("meat");
    for (var i = 0; i < itemArray.length; i++) {
		meat = itemArray[i].value;
        if (itemArray[i].checked)  
			// meat, price -- first one free
			(meatCount < 1 ) ? namePriceArray.push([meat, 0]) : namePriceArray.push([meat, menuDict.meatDict[meat]]); 
        meatCount++;
    }
    
    //---------------------------------------------
    // Add veggie selection and price to the array
    //---------------------------------------------
    var veggieCount = 0; // Number of veggie items selected
    itemArray = document.getElementsByName("veggies");
    for (var i = 0; i < itemArray.length; i++) {
		veggie = itemArray[i].value;
        if (itemArray[i].checked)
			// veggie, price ==- first one free
			(veggieCount < 1 ) ? namePriceArray.push([veggie, 0]) : namePriceArray.push([veggie, menuDict.veggieDict[veggie]]);
		veggieCount++;
    }
    
    //---------------------------------------------
    // Show the receipt to the user
    //---------------------------------------------
    displayReceipt(namePriceArray)
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