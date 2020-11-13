'use strict'

var mongoose = require ('mongoose');
var app = require('./app');
var port = 3700;



mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost:27017/api_rest_revista', {useNewUrlParser: true,  useUnifiedTopology: true })
.then(()=>{
    console.log("conectado!!");

    app.listen(port, ()=>{
        console.log('servidor funcionando corriendo en http://localhost:'+port);
    });
})