const fs = require('fs');
const path = require('path');
const db = require("../database/models")
const Op = db.Sequelize.Op

let apiController = {

    listBooks: function (req, res) {
        db.books.findAll({include: [{ association: "genres_book" }, { association: "autors_book" }]})      //localhost:3030/api/books
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
        db.genres.findAll({include: [{ association: "books_genre" }]})
            .then(function (genres) {
                var data = []
                var countBooksByGenre = []
                for(let i = 0 ; i < genres.length ; i++) {
                    for(let j = 0; j < genres[i].books_genre.length ; j++) {
                        data[i] = {
                            id: genres[i].id,
                            name: genres[i].name
                        }
                        countBooksByGenre[i] = {
                            Genero: genres[i].name,
                            Cantidad: genres[i].books_genre.length
                        }
                }}
                res.json(200, {
                    total: genres.length,
                    data: data,
                    count: countBooksByGenre ,
                    status: 200
                })
            })
    },
    listAutores: function (req, res) { //localhost:3030/api/autors
        db.autors.findAll({include: [{ association: "books_autor" }]})
            .then(function (autors) {
                var countBooksByAutor = []
                var data = []
                for(let i = 0; i < autors.length; i++){
                    data[i] = {
                        id: autors[i].id,
                        name: autors[i].name
                    }
                    countBooksByAutor[i] = {
                        Autor: autors[i].name,
                        Cantidad: autors[i].books_autor.length
                    }
                }
                res.json(200, {
                    total: autors.length,
                    data: data,
                    count: countBooksByAutor,
                    status: 200
                })
            })
    },
    detailBook: function (req, res) { //localhost:3030/api/books/detail/id
        db.books.findByPk(req.params.id, {include: [{ association: "genres_book" }, { association: "autors_book" }]})
            .then(function (book) {
                
                if (book != null) {
                    book.dataValues.urlImage = 'http://localhost:3030/images/portadas/' + book.dataValues.portada;
                    // book.dataValues.genero =  book.genres_book.name
                    // book.dataValues.autor = book.autors_book.name
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
        db.books.findAll({include: [{ association: "genres_book" }, { association: "autors_book" }]},{
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
    },
    last5Books: function (req, res) { //localhost:3030/api/books/lastFive
        db.books.findAll({limit: 5,
            where: {},
        order: [ [ 'id', 'DESC' ]] },
        {include: [{ association: "genres_book" }, { association: "autors_book" }]})
            .then(function (books) {
                for(let i = 0 ; i < books.length ; i++) {
                    books[i].dataValues.urlImage = 'http://localhost:3030/images/portadas/' + books[i].dataValues.portada
                }
                res.json(200, {
                    books : books
                    })
            })
    },
/* ---------------ENDPOINTS USERS-------------------- */
    listUsers: function(req,res){ //localhost:3030/api/users
        db.user.findAll()
            .then(function(users){
                for(let i=0; i < users.length ; i++){
                    delete users[i].dataValues.password
                    delete users[i].dataValues.rol_id
                    users[i].dataValues.urlAvatar = 'http://localhost:3030/images/avatar/' + users[i].dataValues.avatar
                }
                console.log(users)
                res.json(200, {
                    total: users.length,
                    data: users
                })
            })
    },
    lastUser: function(req,res){ //localhost:3030/api/users/lastUser
        db.user.findAll({
            limit: 1,
            where: {},
            order: [['id', 'DESC']]
        })
        .then(function(user){
            user[0].dataValues.urlAvatar = 'http://localhost:3030/images/avatar/' + user[0].dataValues.avatar
            delete user[0].dataValues.password
            delete user[0].dataValues.rol_id
            console.log(user)
            res.status(200).json({
                data: user
            })
        })
    }
}

module.exports = apiController