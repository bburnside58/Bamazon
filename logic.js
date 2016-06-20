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


//look into separating these 2 questions
var selectItem = function() {
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "Choose product ID",
    }]).then(function(answer) {
        var query = 'SELECT * FROM Products WHERE ?';
        connection.query(query, {ItemID: answer.ID}, function(err, res) {
        	console.log(res);
            // for (var i = 0; i < res.length; i++) {
            // 	console.log("Hi");
            //     // console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Artist: " + res[i].artist + " || Year: " + res[i].year);
            // }
        })
    })
};

/*
, {
        name: "quantity",
        type: "input",
        message: "How many would you like?",
    }
*/













