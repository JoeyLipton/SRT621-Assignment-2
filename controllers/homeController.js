const path = require("path");

const mongoose = require('mongoose'),
    Books = require("../models/books")

const controller = require('./homeController');

exports.getAllBooks = (req, res, next) => {
    Books.find({}, (err, books) => {
        if (err) next(err);
        req.data = books;
        next();
    });
};

exports.sendHome = (req, res) => {
    res.redirect("/home");
}

exports.sendIndex = (req, res) => {
    res.render("index");
}

exports.addBookPage = (req, res) => {
    res.render("addBook")
}

exports.delBookPage = (req, res) => {
    res.render("delBook")
}

exports.bookCreate = (req, res) => {
    const book = new Books({
        bookTitle: req.body.titleForm,
        authorName: req.body.authorForm,
        amazonLink: req.body.amazonLinkForm
    });
    book.save();
    res.redirect("/home");
    res.redirect("/home");
}


exports.bookDelete = (req, res, next) => {
    const bookData = req.params.bookData;
    console.log(bookData);
    Books.findOneAndDelete({
        bookTitle: bookData,
    }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Book: ", docs);
        }
    });
    res.redirect("/home");
}


exports.sendBook = (req, res, next) => {
    const bookNumber = req.params.bookNumber;
    switch (bookNumber) {
        case "1":case "2":case "3":case "4":
            //const bookTitle = Books.find({
            //    bookTitle: "Data Structures and Algorithms in Java "
            //})
            Books.find({}, function(err, workplz) {
                if (!err) {
                    const bookTitle = workplz[bookNumber - 1]
                    console.log(bookTitle);
                    res.render(bookNumber, {
                        book: bookTitle
                    });
                } else {
                    console.log("This is not working 1")
                };
            });
            
            break;
        default:
            res.redirect('/home');
            break;
    }
    // res.render(bookNumber);
}