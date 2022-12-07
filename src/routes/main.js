const express = require('express');
const router = express.Router();

const multer = require('multer');

const path = require('path');

const mainController = require("../controllers/mainController")

const userController = require("../controllers/userController")

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/avatar'));
    },
    filename: function (req, file, cb) {
        console.log(file)
        const newFileName = 'avatar-' + req.body.username + '-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})


const upload = multer( { storage });


router.get ("/", mainController.index)
// Los /user estan aca porque crashea si lo hago en el router de usuarios
router.get ("/user/login", userController.login)

router.get ("/user/register", userController.register)

router.post ("/user/register", upload.single('avatar'), userController.guardarUsuario)

router.get ("/user/profile/:id", userController.profile)

router.get ("/user/profile/:id/editProfile", userController.editProfile)

router.post("/user/profile/:id/editProfile",upload.single('avatar'), userController.guardarEditProfile)

router.get("/user/profile/:id/editContrasena", userController.editContra)

router.post("/user/profile/:id/editContrasena", userController.guardarEditContra)



module.exports = router;