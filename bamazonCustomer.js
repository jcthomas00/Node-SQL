var mysql = require('mysql'),
	inquirer = require('inquirer');
	connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'madonna',
		database: 'bamazon'
	});
require ('console.table');


var Bamazon = function(){};

Bamazon.prototype.queryProducts = function(sql = "select * from products", callback, options){
	connection.connect((error)=> {
			connection.query(sql, (error, data)=>{
				if (error){console.log(error);} else{
					if(typeof callback === "function"){
						if (options){
							callback(data, options);
						} else{
							callback(data);
							this.buySomething();
						}
					}
				}
			});
	});
}

Bamazon.prototype.stockCheck = function(dataset, parameters) {
	if(dataset.length > 0){
		let query = `Update products set stock_quantity = ${dataset[0].stock_quantity-parameters.quantity} where item_id = ${parameters.id}`;
		parameters.self.queryProducts(query);
		console.log(`Your order total is: $${parameters.quantity*dataset[0].price}`);
	}else{
		console.log("Insufficient quantity or invalid product. Please try again.");
	}
}

Bamazon.prototype.buySomething = function() {
	inquirer.prompt([
		{
			name: "productID",
			message: "Please enter the item id you would like to purchase:"
		},
		{
			name: "productQuantity",
			message: "How many would you like?"
		}
	]).then((res)=>{
		let query = `select * from products where item_id = ${res.productID} AND stock_quantity > ${res.productQuantity-1}`;
		this.queryProducts(query, this.stockCheck, {'quantity':res.productQuantity, 'id':res.productID, 'self': this});
	});
};

var bamazon = new Bamazon();
bamazon.queryProducts(undefined , console.table);
