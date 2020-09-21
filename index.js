const express = require("express");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.engine(
  "hbs",
  expressHandlebars({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

// midleware (allows us to read body....)
app.use(express.urlencoded({ extended: true }));
// midleware
const todoRoute = require("./routes/todos");
app.use(todoRoute);
// static files
app.use(express.static(path.join(__dirname, "public")));

async function start() {
  try {
    await mongoose.connect({
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log("Server has been started");
    });
  } catch (e) {
    console.log(e);
  }
}

start();
