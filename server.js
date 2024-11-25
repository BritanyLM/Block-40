require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
const auth = require("./api/auth");
app.use("/users", auth);



app.use(express.json());

function authenticate(req, res, next) {
  if (req.user) {
      next();

  } else {
      next({ status: 401, message: " You must be logged in"});

  }
}

app.use("/users", require("./api/auth"));
app.use("/products", require("./api/products"));
app.use("/orders", authenticate, require("./api/orders"));

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
