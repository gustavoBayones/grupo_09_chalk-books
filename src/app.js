const express = require('express');
const mainRoutes = require("./routes/main")
const productsRoutes = require("./routes/products")

const app = express();

const path = require('path');

const publicPath = path.join(__dirname, '../public');

app.use( express.static (publicPath) );

app.set('view engine', 'ejs');

app.listen(3030, ()=>{
    console.log('Servidor corriendo en puerto 3030!');
})

app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRoutes);

app.use('/products', productsRoutes);

