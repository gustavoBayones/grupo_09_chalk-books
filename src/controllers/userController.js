const path = require('path')
const fs = require('fs');
let userController = {
    login: function(req,res){
        res.render('users/login')
    },

    register: function(req,res){
        res.render('users/registro') 
    },

    guardarUsuario: function(req,res){
        if(req.file){
            let newUser = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: "123456",
                rol: "viewer",
                avatar: req.file.filename

            }
        }
        else {
            let newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: "123456",
            rol: "viewer",
            avatar: "./img/avatar/default.png"
            }
            }
            let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
            let listUsers = JSON.parse(newListUsers)
            let newID = listUsers[listUsers.length - 1].id + 1;
            newUser.id = newID;
            listUsers.push(newUser)
            let userJson = JSON.stringify(listUsers)
            fs.writeFileSync(path.join(__dirname, '../data/users.json'), userJson);
            res.redirect('/');

    },

    profile: function(req,res){
        let id = req.params.id -1;

        let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]



        res.render('users/profile', {user: user})
    }

    

}
module.exports = userController;