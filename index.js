const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require("cors");
const bookController = require('./controllers/books')
const app = express()

//middlewares
app.set("view engine", "jsx");
// app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.use('/books', bookController)

const PORT = process.env.PORT

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


// HOME PAGE
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>");
  });
  
// WILD CARD handles errors for paths that don't exist
  app.get("*", (req, res) => {
    res.send("ERROR stub");
  });

app.listen(PORT, console.log(`listening to port ${PORT}`))

module.exports = app