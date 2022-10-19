const path = require('path')
const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
let userController = {
    login: function(req,res){
        res.render('login')
    },

    register: function(req,res){
        res.render('./user/registro')
    }
}

module.exports = userController;