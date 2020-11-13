'use strict'

var mongoose = require ('mongoose');

var Schema = mongoose.Schema;///cada schema es una coleccion en mongo db. Coleccion que define la forma que va a tener el documento.

var ArticleSchema = new Schema({

    category: String,
    title: String,
    author: String,
    font : String,
    content: String,
    date: { type:Date, default: Date.now},
    image: String
});

module.exports = mongoose.model('Article', ArticleSchema );
//articles--> mongoose guarda documentos de este tipo y con esta estructura dentro de la colección