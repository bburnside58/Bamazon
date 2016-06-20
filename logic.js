var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user:"root", //Your username
	password:"", //Your password
	database:"Bamazon_db"})

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected");
})

connection.query('SELECT * FROM Products', function(err, res){
			console.log(res);
			selectItem();
})


//
var selectItem = function() {
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "Choose product ID you would like:",
    }]).then(function(answer) {
        var query = 'SELECT * FROM Products WHERE ?';
        connection.query(query, {ItemID: answer.ID}, function(err, res) {
        	if (res[0].StockQuantity == 0) {
        		console.log("Insufficient quantity");
        	} else {
        		console.log(res);
        		var itemChosen = answer.ID;
        		selectQuantity(itemChosen);
        	}
        })
    })
};


var selectQuantity = function(itemChosen) {
    inquirer.prompt([{
        name: "quantity",
        type: "input",
        message: "How many would you like?",
    }]).then(function(answer) {
        connection.query('SELECT * FROM Products WHERE ItemID=?', itemChosen, function(err, res) {
        	if (res[0].StockQuantity < answer.quantity) {
        		console.log("Insufficient quantity");
        	} else {
        		
        		var totalCost = (answer.quantity * res[0].Price).toFixed(2);
        		console.log("Your total comes out to be $" + totalCost);
        		var quantityChosen = answer.quantity;
        		connection.query('UPDATE Products SET StockQuantity = "'+(res[0].StockQuantity - quantityChosen)+'" WHERE ItemID = "'+itemChosen+'"');
        		connection.query('SELECT * FROM Products WHERE ItemID=?', itemChosen,function(err, res){
        			console.log("The store now has an inventory of " + res[0].StockQuantity + " for " + res[0].ProductName);
        			selectItem();
        		})   		
        	}
        })    
    })
};















