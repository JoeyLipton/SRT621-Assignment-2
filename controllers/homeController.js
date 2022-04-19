const path = require("path");

const mongoose = require('mongoose'),
    Books = require("../models/books")

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
    res.redirect("/home")
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


exports.sendBook = (req, res) => {
    const bookNumber = req.params.bookNumber;
    switch (bookNumber) {
        case "1":
            const bookTitle1 = Books.find({
                bookTitle: "Compilers: Principles, Tools, and Techniques"
            })
            bookTitle1.exec((err, data) => {
                if (!err) {
                    res.render(bookNumber, {
                        book: data
                    });
                }
                else {
                    return handleError(err);
                }
            })
            break;
        case "2":
            const bookTitle2 = Books.find({
                bookTitle: "Data Structures and Algorithms in Java "
            })
            bookTitle2.exec((err, data) => {
                if (!err) {
                    res.render(bookNumber, {
                        book: data
                    });
                }
                else {
                    return handleError(err);
                }
            })
            break;
        case "3":
            const bookTitle3 = Books.find({
                bookTitle: "The Cat in the Hat"
            })
            bookTitle3.exec((err, data) => {
                if (!err) {
                    res.render(bookNumber, {
                        book: data
                    });
                }
                else {
                    return handleError(err);
                }
            })
            break;
        default: 
            Books.find({bookTitle: "Compilers: Principles, Tools, and Techniques"})
                .then((result) => {
                    res.render(bookNumber);
                })
                break;
    }
    // res.render(bookNumber);
}