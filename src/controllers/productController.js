let productController = {

    index: function(req,res){
        res.render('products/products');
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
            res.send('se subio el archivo')
        }
        else{
            res.render('products/crear-producto')
        }

    },

    editarProducto: function(req,res){
        res.render('products/editar-producto')
    },

    detalleProducto: function(req,res){
        res.render('products/detalle-producto')
    }
}

module.exports = productController;