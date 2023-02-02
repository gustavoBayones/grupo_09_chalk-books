const express = require('express');
const router = express.Router();
const path = require('path');

const apiController = require('../controllers/apiController')

// Lista de libros 
router.get('/books', apiController.listBooks)
//Detalle de libro
router.get('/books/detail/:id', apiController.detailBook)
//Buscar libro
router.get('/books/search', apiController.searchBook)
//Ultimos 5 libros
router.get('/books/lastFive', apiController.last5Books)
//Lista de generos
router.get('/genres', apiController.listGenres)

//Lista de autores
router.get('/autors', apiController.listAutores)
/* -------------------- USER API ----------------------*/
//Lista de usuarios
router.get('/users', apiController.listUsers)
//Ultimo Usuario
router.get('/users/lastUser', apiController.lastUser)
module.exports = router;