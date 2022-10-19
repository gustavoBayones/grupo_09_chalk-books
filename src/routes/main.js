const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController")
const userController = require("../controllers/userController")
const productController = require("../controllers/productController")

router.get ("/", mainController.index)
router.get ("/login", userController.login)
router.get ("/register", userController.register)

router.get ("/carrito", productController.carrito)
router.get ("/detalleProducto", productController.detalleProducto)
router.get ("/crearProducto", productController.crearProducto)
router.get ("/editarProducto", productController.editarProducto)


module.exports = router;