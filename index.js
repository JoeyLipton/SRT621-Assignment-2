const express = require('express'),
    app = express(),
    controller = require('./controllers/homeController')

const layouts = require("express-ejs-layouts");

const mongoose = require('mongoose'),
    Books = require("./models/books")

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
    MONGO_URI,
    { useUnifiedTopology : true })
    .then((result) => console.log("Server Successfully Launched"))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(layouts);

app.get("/home", controller.getAllBooks, (req, res, next) => {
    res.render("index", { books: req.data }
    )
})

app.get("/", controller.sendIndex);
app.get("/home", controller.sendIndex);
app.get("/books/:bookNumber", controller.sendBook);


`
app.get('/all-blogs', (req, res) => {
    Books.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})
`

app.get('/single-blog', (req, res) => {
    Books.find({
                bookTitle: "Compilers: Principles, Tools, and Techniques"
            })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.listen(3000);

