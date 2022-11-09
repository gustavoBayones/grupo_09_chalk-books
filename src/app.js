const express = require('express');
const mainRoutes = require("./routes/main")
const productsRoutes = require("./routes/products")

const app = express();

const path = require('path');

const publicPath = path.resolve (__dirname, '../public');

app.use( express.static (publicPath) );

app.set('view engine', 'ejs');

app.listen(3030, ()=>{
    console.log('Servidor corriendo en puerto 3030!');
})

app.set('views', path.join(__dirname, 'views'));


/*app.get ('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
})

app.get ('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/registro.html'));
})

app.get ('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/log-in.html'));
})

app.get ('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));
})

*/

app.use('/', mainRoutes);

app.use('/products', productsRoutes);

