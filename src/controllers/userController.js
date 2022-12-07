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
        let newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.password,
            rol: "viewer"
        }
        if(req.file){
            console.log(req.file)
            newUser.avatar = req.filename
        }
        else {
            newUser.avatar = "default.png"
            
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
    },

    editProfile: function(req,res){
        let id = req.params.id -1;
        let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]
        res.render('users/editProfile', {user:user})
    },
    guardarEditProfile: function(req,res){
        let id = req.params.id -1;
        let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]
        user.nombre = req.body.nombre;
        user.apellido = req.body.apellido;
        user.email = req.body.email;
        if(req.file)                                //Comprobamos si se subio una imagen, sino dejamos por defecto
        {
            user.avatar = req.file.filename
        }
        else{
            user.avatar = "default.png"
        }
        listUsers[id] = user;
        let userJSON = JSON.stringify(listUsers)
        fs.writeFileSync(path.join(__dirname, '../data/users.json') , userJSON);
        res.redirect("/")
    },

    editContra: function(req,res){
        let id = req.params.id -1;
        let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]
        res.render('users/editContra', {user: user})

    },

    guardarEditContra: function(req,res){
        console.log(req.body) //devuelve undefined :( 
        let id = req.params.id -1;
        let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]
        user.password = req.body.password
        listUsers[id] = user
        let userJSON = JSON.stringify(listUsers)
        fs.writeFileSync(path.join(__dirname, '../data/users.json') , userJSON);
        res.redirect("/")
    }


    

}
module.exports = userController;