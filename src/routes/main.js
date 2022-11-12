const express = require('express');
const router = express.Router();
const multer = require('multer');
const mainController = require("../controllers/mainController")
const userController = require("../controllers/userController")
const productController = require("../controllers/productController")

router.get ("/", mainController.index)
router.get ("/login", userController.login)
router.get ("/register", userController.register)






module.exports = router;