const fs = require('fs');
const path = require('path');
const db = require("../database/models")
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
        //db.Generos.findAll()
            //.then(function(generos){
          res.render('products/crearProducto');
            },
    guardarProducto: function(req,res){
        console.log(req.body)
        if(req.file){
            console.log(req.file)
            let newProduct = {
                titulo: req.body.nombreProducto,
                autor: req.body.nombreAutor,
                genero: req.body.genero,
                descripcion: req.body.descProducto,
                precio: req.body.price,
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

            res.render('products/products', {listProducts: listProducts})
        }
        else{
            res.render('products/crear-producto')
        }

    },

    formEditarProducto: function(req,res){
        let idProduct = req.params.id - 1;
        let newListproduct = fs.readFileSync(path.join(__dirname, '../data/product.json'), {encoding: 'utf-8'});
        let listProducts = JSON.parse(newListproduct)
        let product = listProducts[idProduct]
        res.render('products/editar-producto', {product: product})
    },

    editarProducto : function(req,res){
        let idProduct = req.params.id - 1;
        let newListproduct = fs.readFileSync(path.join(__dirname, '../data/product.json'), {encoding: 'utf-8'});
        let listProducts = JSON.parse(newListproduct)
        let oldProduct = listProducts[idProduct]
        if (req.file){                              //si no se sube un archivo de imagen vuelvo a la edicion
            let newProduct = {
                titulo: req.body.nombreProducto,
                autor: req.body.nombreAutor,
                genero: req.body.genero,
                descripcion: req.body.descProducto,
                precio: req.body.price,
                stock: req.body.stock,
                portada: req.file.filename,
            }
            // logica de edicion
            let reemplazar = function(objA,objB){
                if(objA == undefined){
                    objA = objB
                }
            }
            reemplazar(newProduct.titulo, oldProduct.titulo)
            reemplazar(newProduct.autor, oldProduct.autor)
            reemplazar(newProduct.genero, oldProduct.genero)
            reemplazar(newProduct.descripcion, oldProduct.descripcion)
            reemplazar(newProduct.precio, oldProduct.precio)
            reemplazar(newProduct.stock, oldProduct.stock)
            reemplazar(newProduct.portada, oldProduct.portada)
            newProduct.id = oldProduct.id
            listProducts[idProduct] = newProduct
            let productsJSON = JSON.stringify(listProducts);
    
            fs.writeFileSync(path.join(__dirname, '../data/product.json'), productsJSON);
    
    
            res.render('products/products', {listProducts: listProducts})
        }
        else {
            let idProduct = req.params.id - 1;
            let newListproduct = fs.readFileSync(path.join(__dirname, '../data/product.json'), {encoding: 'utf-8'});
            let listProducts = JSON.parse(newListproduct)
            let product = listProducts[idProduct]
            res.render('products/editar-producto', {product: product})
        }
        
    },

    borrarProducto: function(req,res){
        let idProduct = req.params.id - 1;
        let newListproduct = fs.readFileSync(path.join(__dirname, '../data/product.json'), {encoding: 'utf-8'});
        let listProducts = JSON.parse(newListproduct)
        let product = listProducts[idProduct]
        let newListProducts = listProducts.filter(products => products != product )
        let productsJSON = JSON.stringify(newListProducts);
    
        fs.writeFileSync(path.join(__dirname, '../data/product.json'), productsJSON);
    
    
        res.render('products/products', {listProducts: newListProducts})

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