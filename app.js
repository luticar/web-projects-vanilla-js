const express = require("express"); //chama o express
const app = express(); // executa o express
const bodyParser = require("body-parser");

app.set("view engine", "ejs"); //pode ocultar o .ejs abaixo

app.use(bodyParser.urlencoded({ extended: true })); //copiar para colar em outros casos

app.listen(3000, function() {
  //porta utilizada, conecta com o servidor
  console.log("The Server has started");
});

//Landing  page
app.get("/", function(req, res) {
  res.render("home");
});
