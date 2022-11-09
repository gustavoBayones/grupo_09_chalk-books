let productController = {
    carrito: function(req,res){
        res.render('products/carrito')
    },

    crearProducto: function(req,res){
        res.render('products/crear-producto')
    },
    guardarProducto: function(req,res){
        console.log(req.body)
    },

    editarProducto: function(req,res){
        res.render('products/editar-producto')
    },

    detalleProducto: function(req,res){
        res.render('products/detalle-producto')
    }
}

module.exports = productController;