const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// using app.use to serve up static CSS files in /assets/ folder when /assets link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use("/assets", express.static("assets"));

app.listen(3000, function() {
  console.log("The Server has started");
});

app.get("/", function(req, res) {
  res.render("home");
});
