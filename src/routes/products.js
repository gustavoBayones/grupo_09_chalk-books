const express = require("express")

const router = express.Router()

const productController = require("../controllers/productController")

router.get("/create", productController.crearProducto)

router.post("/create", productController.guardarProducto)

module.exports = router