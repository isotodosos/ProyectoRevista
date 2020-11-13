'use strict'

/*Cargar modulos*/
var express = require('express');
var bodyParser = require('body-parser');



/*Ejecutar express para poder trabajar http*/
var app = express();


/*Cargar ficheros rutas*/
var article_routes = require('./routes/article');

/*Cargar MiddLewares*/
app.use(bodyParser.urlencoded({ extended: false }));//esto es para poder utilizar el bodyparser
app.use(bodyParser.json());//convierte cualquier peticion en un json


/*Cors (para permitir peticiones desde el frontend)*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/*Añadir prefijos a rutas/ Cargar rutas*/
app.use('/api', article_routes);

/*Exportar modulo fichero actual*/
module.exports = app;