const mongoose = require("mongoose");

function connect() {
  // Connect to the database
  mongoose.connect("mongodb://localhost/iuidb",
    () => console.log("Connected to iuidb database."),
    (e: Error) => console.error("Error while connecting to iuidb database.", e)
  ) 
}

module.exports=connect;