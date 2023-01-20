const path = require('path')
const fs = require('fs');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');



let userController = {
    compareID:function(id1,id2){
        if(id1 != id2){
            return res.send('NOT EQUALS ID')
        }
    return true;
    },

    login: function(req,res){
        res.render('users/login')
    },

    loginProcess: function(req,res){
        let userToLogin = User.findByField('email', req.body.email);
        if(!userToLogin){
            return res.render('users/login', {
                errors : {
                    email :{
                        msg: 'Email o contraseña incorrecta'
                    }
                }
            })
        }

        if(userToLogin){
            let passwordCompare = bcrypt.compareSync( req.body.password, userToLogin.password ); //lautaro
            if(passwordCompare) {
                delete userToLogin.password
                req.session.userLogged = userToLogin
                if(req.body.remember){
                    res.cookie( 'emailUsuario' , req.body.email , { maxAge : ((1000*60) * 1800)} )
                }
                
                res.redirect('/')
            } else {
                return res.render('users/login', {
                    errors : {
                        email :{
                            msg: 'Email o contraseña incorrecta'
                        }
                    }
                })
            }
        }
    },


    register: function(req,res){
        res.render('users/registro') 
    },

    guardarUsuario: function(req,res){
        const resultValidation = validationResult(req)
        if(resultValidation.errors.length > 0){
            return res.render('users/registro', {
                errors: resultValidation.mapped(),
                data: req.body
            })
        }

        let userInDB = User.findByField('email', req.body.email)
        if (userInDB){
            return res.render('users/registro', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                data: req.body
            })
        }

        User.create(req)
        
        res.redirect('/');
        /*let newUser = {
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
            res.redirect('/');*/

            
    },

    profile: function(req,res){
        /*let id = req.params.id -1;         //PROCESO DE VISTA ANTIGUO SIN SESSION

        let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]*/



        res.render('users/profile', {user: req.session.userLogged})
    },

    editProfile: function(req,res){
        console.log(req.session.userLogged)
        /*let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]*/
        res.render('users/editProfile', {user: req.session.userLogged})
    },
    guardarEditProfile: function(req,res){
        let id = req.session.userLogged.id
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
            user.avatar = req.session.userLogged.avatar
        }
        listUsers[id] = user;
        let userJSON = JSON.stringify(listUsers)
        fs.writeFileSync(path.join(__dirname, '../data/users.json') , JSON.stringify(listUsers, null, ' '));
        res.redirect("/")
    },

    editContra: function(req,res){
        let id = req.session.userLogged.id;
        res.render('users/editContra', {id: id})

    },

    guardarEditContra: function(req,res){
        console.log(req.params.id)
        console.log(req.body) 
        let id = req.session.userLogged.id
        let newListUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding: 'utf-8'});
        let listUsers = JSON.parse(newListUsers)
        let user = listUsers[id]
        console.log(user.password)
        user.password = bcrypt.hashSync(req.body.password, 10)
        listUsers[id] = user
        fs.writeFileSync(path.join(__dirname, '../data/users.json') , JSON.stringify(listUsers, null, ' '));
        res.redirect("/")
    },

    listUsers: function(req,res){
        res.render('users/listUser')
    },

    logout: function(req, res) {
        res.clearCookie('emailUsuario')
        req.session.destroy()
        return res.redirect("/")
    }


    

}
module.exports = userController;