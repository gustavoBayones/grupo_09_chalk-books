const express = require("express")

const router = express.Router()

const productController = require("../controllers/productController")

router.get ("/carrito", productController.carrito)

router.get ("/detalleProducto", productController.detalleProducto)

router.get ("/crearProducto", productController.crearProducto)
router.post ("/crearProducto", productController.guardarProducto)
router.get ("/editarProducto", productController.editarProducto)

module.exports = router