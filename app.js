const express = require("express"); //chama o express
const app = express(); // executa o express
const bodyParser = require("body-parser");

app.set("view engine", "ejs"); //pode ocultar o .ejs abaixo

app.use(bodyParser.urlencoded({ extended: true }));

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use("/views", express.static("views"));

app.listen(3000, function() {
  //porta utilizada, conecta com o servidor
  console.log("The Server has started");
});

//Landing  page
app.get("/", function(req, res) {
  res.render("home");
});
