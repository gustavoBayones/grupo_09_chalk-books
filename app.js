const { application } = require('express');
const express = require('express');
const app = express();

const path = require('path');

const publicPath = path.resolve (__dirname, './public');

app.use( express.static (publicPath) );

app.listen(3030, ()=>{
    console.log('Servidor corriendo en puerto 3030!');
})

app.get ('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
})

app.get ('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/registro.html'));
})