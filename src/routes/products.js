const express = require("express")

const router = express.Router()

const multer = require('multer');

const path = require('path');

const { body }= require('express-validator')
const validations = [
    body('autors').notEmpty().withMessage('Debes seleccionar un Autor'),
    body('nombreProducto').notEmpty().withMessage('Debes escribir un titulo'),
]

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/portadas'));
    },
    filename: function (req, file, cb) {
        console.log(file)
        const newFileName = 'portada-' + req.body.nombreProducto + '-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const adminMiddle = require('../middlewares/adminMiddle')

const upload = multer( { storage });


const productController = require("../controllers/productController")
router.get('/', productController.index)
router.get ("/carrito", productController.carrito)

router.get ("/detalleProducto/:id", productController.detalleProducto)

router.get ("/crearProducto", productController.crearProducto)
router.post ("/crearProducto", upload.single('portada'),validations, productController.guardarProducto)

router.get ("/detalleProducto/:id/edit", productController.formEditarProducto)
router.put ("/detalleProducto/:id/edit", upload.single('portada'), productController.editarProducto)
router.delete ("/detalleProducto/:id/edit", productController.borrarProducto)

module.exports = router