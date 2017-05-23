// Customer Object
var Customer = function (customerInfo) {
  //  1. id (string or number)
  //  2. name (string)
  //  3. carRented (object) (null by default)
  this.id = customerInfo.id
  this.name = customerInfo.name
  this.carRented = null
};

// Car Object
var Car = function (carInfo) {
  this.id = carInfo.id;
  this.producer = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPrice;
  this.available = true;
  this.customer = {};
  this.rentalDuration = 0;

  this.quotePrice = function(rentalDuration){
    return rentalPrice * rentalDuration
  }
  this.reserve =  function(customer, rentalDuration){
    if (this.available === true){
      this.available=false;
      this.customer = customer;
      this.rentalDuration = rentalDuration;
      return true
    }else {return false;}

  }
  this.return = function(){
    if (this.available === true){
      return ("Sorry, this car have already been returned.")}
      else {this.available === true;
            this.customer = null;
            this.rentalDuration = null;}
    }

}
// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.addCar = function(carObj){
    if (this.getCar(carObj.id) === true ) {
      return console.log("ID already exists");
    }else {this.cars.push(carObj);}
  }

  this.addCustomer = function(customerObj){
    if (this.getCustomer(customerObj.id) === false) {
      return console.log("ID already exists");
    }else{ this.customers.push(customerObj);}
  }

  this.removeCar = function (carID){
    if(this.findCarIndex(carID) >= 0){
      this.cars.splice(this.findCarIndex(carID));
      console.log("Car deleted")
    }else console.log("Car not found")
  }

  this.removeCustomer = function (customerID){
    if(this.findCustomerIndex(customerID) >= 0){
      this.customers.splice(this.findCustomerIndex(customerID),1);
      console.log("Customer deleted");
    }else console.log("Customer not found");
  }

this.availableCars = function (){
  return this.cars.filter(function(car){
  return car.available === true;}
  );
};


this.rentCar = function(customerID,rentalDuration){
var LOAC = this.availableCars();
if ( LOAC.length === 0){
  console.log("All our cars have been rented");
}else{
  var customer = this.getCustomer(customerID)
}
  if (customer === true){
    customer.carRented = this.availableCars[0]; // copy by reference , object
    this.availableCars()[0].reserve(customerID, rentalDuration);
    console.log("The car has been reserved");
  }else{
    console.log("Please provide a valid customerID")
  }
}

this.returnCar = function(customerID){
  customer = this.getCustomer(customerID);
  if (customer.id() === customerID){
    customer.carRented = null;
    console.log( "Thank you for using our service");
  }else{console.log("Please provide a valid customerID")}
}


this.totalRevenue = function () {
  return this.cars.reduce(function(prevSum, currCar){
    console.log(prevSum, currCar);
    return prevSum + (currCar.rentalDuration * currCar.rentalPricePerDay);
  }, 0);

};
};


// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};
var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};

var carA = new Car(carInfo);

var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);

console.log(vendor.availableCars());
vendor.addCar(carA);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);
