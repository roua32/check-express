const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");
const PORT = 5000;

// Template Engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//timechecker
function timeCheker(req, res, next) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if ((day === 0 || (day >= 1 && day <= 5)) && hour >= 9 && hour < 21) {
    next();
  } else {
    res.sendFile(path.resolve("public", "error.html"));
  }
}
app.use(timeCheker);

// Routes

app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/contact", (req, res) => {
  res.render("Contact");
});

app.get("/services", (req, res) => {
  res.render("services");
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
