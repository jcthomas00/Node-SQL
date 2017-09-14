var mysql = require('mysql'),
	inquirer = require('inquirer');
	connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'madonna',
		database: 'bamazon'
	});							//Get dependencies
require ('console.table');		//Easy display of mySQL data in table format

var Bamazon = function(){};		//Because objects are cool

/*************		Method to get data from mySQL and pass it to the callback		***************/
Bamazon.prototype.queryProducts = function(sql = "select * from products", callback, options){
	connection.connect((error)=> {
			//execute the sql passed in
			connection.query(sql, (error, data)=>{
				if (error){console.log(error);} else{
					//do the callback if it was passed in
					if(typeof callback === "function"){
						//send options to the callback if passed in
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

/*************		Method to check the dataset for validity and place order 		***************/
Bamazon.prototype.stockCheck = function(dataset, parameters) {
	if(dataset.length > 0){
		let query = `Update products set stock_quantity = ${dataset[0].stock_quantity - parameters.quantity} 
					where item_id = ${parameters.id}`;
		//subtract the number ordered from the product's quantity
		parameters.self.queryProducts(query);
		//print user total
		console.log(`Your order total is: $${parameters.quantity * dataset[0].price}`);
	}else{
		//either user entered invalid id or we don't have enough stock
		console.log("Insufficient quantity or invalid product. Please try again.");
	}
}

/*************				Method to ask user to buy something				***************/
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
		//look for user entered product and try to place order
		this.queryProducts(query, this.stockCheck, {'quantity':res.productQuantity, 'id':res.productID, 'self': this});
	});
};

//create a new bamazon store object to destroy Bezos and beg users to order
var bamazon = new Bamazon();
bamazon.queryProducts(undefined , console.table);
