// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var customers = [
  {
    customerName: "Hans",
    phoneNumber: "7605992393",
    customerEmail: "hans@yahoo.com",
    customerID: "13"
  },
  {
    customerName: "Michael",
    phoneNumber: "7830347094",
    customerEmail: "michael@gmail.com",
    customerID: "mike"
  },
  {
    customerName: "Jennifer",
    phoneNumber: "7649820394",
    customerEmail: "jennifer@hotmail.com",
    customerID: "jen"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/customerData", function(req, res) {
  res.json(customers);
});


// // Get all customers
// app.get("/reservation", function(req, res) {
//   res.json(customers);
// });

// app.get("/tables", function(req, res) {
//   res.json(customers);
// });


// Search for Specific customer (or all characters) - provides JSON
// app.get("/api/:customers?", function(req, res) {
//   var chosen = req.params.characters;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < customers.length; i++) {
//       if (chosen === customers[i].routeName) {
//         return res.json(customers[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(customers);
// });

// Create New customers - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newcustomer = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcustomer.customerName = newcustomer.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newcustomer);

  customers.push(newcustomer);

  res.json(newcustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
