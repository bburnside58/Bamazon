//necessary npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');

//var for connection to Bamazon database
var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user:"root", //Your username
	password:"", //Your password
	database:"Bamazon_db"})

//in case connection fails
connection.connect(function(err) {
	if (err) throw err;
	console.log("connected");
})

//prints entire inventory for selection
connection.query('SELECT * FROM Products', function(err, res){
			console.log(res);
			selectItem();
})

//function to select wanted item
var selectItem = function() {
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "Choose product ID you would like:",
    }]).then(function(answer) {
    	//in case user does not enter an item ID the program will exit node
    	if (answer.ID == "") {
    		process.exit();
    	} else {
	        var query = 'SELECT * FROM Products WHERE ?';
	        connection.query(query, {ItemID: answer.ID}, function(err, res) {
	        	//in case the user chooses an item ID that does not exist
	        	if (res[0] === undefined) {
	        		console.log("Invalid item ID choose again.")
	        		selectItem();
	        	//If there are no more of said item
	        	} else if (res[0].StockQuantity == 0) {
	        		console.log("Insufficient quantity");
	        		selectItem();
	        	//if selection is valid, proceed to ask how many they would like in selectQuantity function
	        	} else {
	        		console.log(res);
	        		var itemChosen = answer.ID;
	        		selectQuantity(itemChosen);
	        	}
	        })
	    }
    })
};

//User selects how many they want of item
var selectQuantity = function(itemChosen) {
    inquirer.prompt([{
        name: "quantity",
        type: "input",
        message: "How many would you like?",
    }]).then(function(answer) {
        connection.query('SELECT * FROM Products WHERE ItemID=?', itemChosen, function(err, res) {
        	//if the user chooses an amount that is larger than what is available
        	if (res[0].StockQuantity < answer.quantity) {
        		console.log("Insufficient quantity");
        	//prints total cost of purchase and then updates the database of the new quantity available
        	} else {
        		var totalCost = (answer.quantity * res[0].Price).toFixed(2);
        		console.log("Your total comes out to be $" + totalCost);
        		var quantityChosen = answer.quantity;
        		//updating the database
        		connection.query('UPDATE Products SET StockQuantity = "'+(res[0].StockQuantity - quantityChosen)+'" WHERE ItemID = "'+itemChosen+'"');
        		//printing out the current inventory of last altered item
        		connection.query('SELECT * FROM Products WHERE ItemID=?', itemChosen,function(err, res){
        			console.log("The store now has an inventory of " + res[0].StockQuantity + " for " + res[0].ProductName);
        			selectItem();
        		})   		
        	}
        })    
    })
};