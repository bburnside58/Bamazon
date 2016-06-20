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