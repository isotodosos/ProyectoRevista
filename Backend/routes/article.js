'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');


var router = express.Router();

var multipart = require ('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/articles'});// el conectmultiparty nos da un midelware que es una funcionalidad que se ejecuta antes del metodo de nuestro controlador 


///rutas Útiles///
router.post('/save', ArticleController.save );
router.get('/articles', ArticleController.getCurrentArticles);
router.get('/articles/:category', ArticleController.getArticlesCategory);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.updateArticle );
router.delete('/article/:id', ArticleController.deleteArticle );
router.post('/upload-image/:id', md_upload, ArticleController.uploadImage);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;    