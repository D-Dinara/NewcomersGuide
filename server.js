const express = require("express");
const bodyParser = require("body-parser");
const services = require("./services");
const events = require("./events");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get(`/services`,services.searchNearbyPlaces);
app.get(`/events`,events.searchNearbyEvents);
app.get(`/location`,services.getLocationFromAddress);


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
