const path = require('path')
let userController = {
    login: function(req,res){
        res.render('users/login')
    },

    register: function(req,res){
        res.render('users/registro') 
    }
}

module.exports = userController;