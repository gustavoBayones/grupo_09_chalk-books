const fs = require('fs');
const path = require('path');
let productController = {

    index: function(req,res){
        let newListproduct = fs.readFileSync(path.join(__dirname, '../data/product.json'), {encoding: 'utf-8'});
        let listProducts = JSON.parse(newListproduct)
        res.render('products/products', {listProducts: listProducts});
    },


    carrito: function(req,res){
        res.render('products/carrito')
    },

    crearProducto: function(req,res){
        res.render('products/crear-producto')
        
    },
    guardarProducto: function(req,res){
        console.log(req.body)
        if(req.file){
            console.log(req.file)
            let newProduct = {
                nombreProducto: req.body.nombreProducto,
                nombreAutor: req.body.nombreAutor,
                descProducto: req.body.descProducto,
                price: req.body.price,
                stock: req.body.stock,
                portada: req.file.filename,
            }
            let newListproduct = fs.readFileSync(path.join(__dirname, '../data/product.json'), {encoding: 'utf-8'});
            let listProducts = JSON.parse(newListproduct)
            let newID = listProducts[listProducts.length - 1].id + 1;
            newProduct.id = newID;
            listProducts.push(newProduct);
            
            let productsJSON = JSON.stringify(listProducts);

            fs.writeFileSync(path.join(__dirname, '../data/product.json'), productsJSON);

            res.render('products/products')
        }
        else{
            res.render('products/crear-producto')
        }

    },

    editarProducto: function(req,res){
        res.render('products/editar-producto')
    },

    detalleProducto: function(req,res){
        let idProduct = req.params.id - 1;
        let newListproduct = fs.readFileSync(path.join(__dirname, '../data/product.json'), {encoding: 'utf-8'});
        let listProducts = JSON.parse(newListproduct)
        let product = listProducts[idProduct]
        res.render('products/detalle-producto', {product : product})
    }
}

module.exports = productController;