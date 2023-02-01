const fs = require('fs');
const path = require('path');
const db = require("../database/models")
const Op = db.Sequelize.Op

let apiController = {

    listBooks: function (req, res) {
        db.books.findAll()      //localhost:3030/api/books
            .then(function (books) {
                for(let i = 0 ; i < books.length ; i++) {
                    books[i].dataValues.detail = 'localhost:3030/products/detalleProducto/' + books[i].id
                    books[i].dataValues.urlImage = 'http://localhost:3030/images/portadas/' + books[i].dataValues.portada
                }
                console.log(books)
                res.json(200, {
                    total: books.length,
                    data: books,
                    status: 200
                })
            })
    },
    listGenres: function (req, res) {   //localhost:3030/api/genres
        db.genres.findAll()
            .then(function (genres) {
                res.json(200, {
                    total: genres.length,
                    data: genres,
                    status: 200
                })
            })
    },
    listAutores: function (req, res) { //localhost:3030/api/autors
        db.autors.findAll()
            .then(function (autors) {
                res.json(200, {
                    total: autors.length,
                    data: autors,
                    status: 200
                })
            })
    },
    detailBook: function (req, res) { //localhost:3030/api/books/detail/id
        db.books.findByPk(req.params.id)
            .then(function (book) {
                
                if (book != null) {
                    book.dataValues.urlImage = 'http://localhost:3030/images/portadas/' + book.dataValues.portada
                    console.log(book)
                    res.json(200, {
                        libro: book,
                        status: 200
                    })
                } else {
                    res.json(400, 'No existe el libro')
                }
            })
    },
    searchBook: function (req, res) {   //localhost:3030/api/books/search?title=
        db.books.findAll({
            where: { 
                title : {[Op.like]: '%' + req.query.title + '%'}
            }
        })
            .then(function (book) {
                if(book.length > 0) {
                for(let i = 0 ; i < book.length ; i++) {
                    book[i].dataValues.detail = 'localhost:3030/products/detalleProducto/' + book[i].id
                    book[i].dataValues.urlImage = 'http://localhost:3030/images/portadas/' + book[i].dataValues.portada
                }
                console.log(book)
                res.json(200, {
                    total: book.length,
                    book: book
                })} else {
                    res.json(400, {error: 'No existen libros con ese titulo'})
                }
            })
    } 

}
module.exports = apiController