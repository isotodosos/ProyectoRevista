'use strict'

var validator = require('validator');
var fs = require('fs'); //esta libreria nos permite eliminar archivos de nuestro sistema de ficheros
var path = require('path');// otra libreria de node para sacar la ruta del archivo


var Article = require('../models/article');


var controller = {

    save: ((req, res) => {

        // Recoger parametros por post que nos envia el usuario
        var params = req.body;

        // Validar datos con validator/// Utilizamos el try y el catch para excepciones
        try {
            //validator tiene un monton de opciones para validar emails...
            var validate_title = !validator.isEmpty(params.title);//validate_title dará true cuando NO ESTE VACIO PARAMS TITLE
            var validate_content = !validator.isEmpty(params.content);
            var validate_author = !validator.isEmpty(params.author);
            var validate_category = !validator.isEmpty(params.category);
            var validate_font = !validator.isEmpty(params.font);
        } catch (err) {

            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'

            })
        }

        if (validate_title && validate_content && validate_author && validate_category && validate_font) {

            // Crear el objeto a guardar
            var article = new Article;
            // Asignar valores

            article.title = params.title;
            article.category = params.category;
            article.author = params.author;
            article.content = params.content;
            article.font = params.font;
            article.image = null;


            // Guardar el articulo
            article.save((err, articleStored) => {

                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'

                    })

                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored

                })

            });

        }



    }),//fin del metodo save




    getCurrentArticles: ((req, res) => {

        Article.find({})
        //.limit(3)
        //.sort('category')
        .sort('-date')
        .exec((err, findArticles) => {

            if (err || !findArticles || findArticles == "") {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay ultimas noticias'

                })

            }


            return res.status(200).send({

                status: 'success',
                article: findArticles

            })




        })


    }),//fin del metodo getCurrentArticle




    getArticlesCategory: ((req, res) => {

        var categoryArticle = req.params.category;

        Article.find({ category: categoryArticle })

            .sort('-date')

            .exec((err, findArticles) => {

                if (err || !findArticles || findArticles == "") {

                    return res.status(404).send({
                        status: 'error',
                        message: 'No tenemos articulos en esta categoria'

                    })
                }


                return res.status(200).send({
                    status: 'success',
                    article: findArticles
                })
            })
    }),//fin del metodo getArticlesCategory




    getArticle: ((req, res) => {

        var articleId = req.params.id;

        Article.findById(articleId)
            .exec((err, findArticle) => {

                if (err || !findArticle) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha encontrado'

                    })

                }

                return res.status(200).send({
                    status: 'success',
                    article: findArticle
                })
            })




    }),// fin del metodo getArticle




    updateArticle : ((req, res) => {

        var articleId = req.params.id;

        var params = req.body;

        try {
            //validator tiene un monton de opciones para validar emails...
            var validate_title = !validator.isEmpty(params.title);//validate_title dará true cuando NO ESTE VACIO PARAMS TITLE
            var validate_content = !validator.isEmpty(params.content);
            var validate_author = !validator.isEmpty(params.author);
            var validate_category = !validator.isEmpty(params.category);
            var validate_font = !validator.isEmpty(params.font);
        } catch (err) {

            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'

            })
        }


        if (validate_title && validate_content && validate_author && validate_category && validate_font) {

            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }) 
            .exec((err, articleUpdate) => {

                if(err || !articleUpdate || articleUpdate == ""){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha modificado'

                    })


                }

                return res.status(200).send({
                    status: "success",
                    article: articleUpdate
                })
            })

            

        }

    }),//fin del metodo updateArticles



    deleteArticle : ((req,res)=>{

        var articleId = req.params.id;

        Article.findByIdAndDelete({_id : articleId})
        .exec((err, articleDeleted) =>{

            if(err || !articleDeleted || articleDeleted ==""){

                return res.status(404).send({
                    status: 'error',
                    message: 'El articulo no se ha eliminado'

                })

            }

            return res.status(200).send({
                status: "success",
                article: articleDeleted
            })
        })


    }),//fin del metodo deleteArticle



    uploadImage : ((req,res) => {

        var articleId = req.params.id;

        var file_path = req.files.file0.path;
        //console.log(file_path);

        var file_split = file_path.split('\\');
        //console.log(file_split);

        var file_nombre = file_split[2];
        var extension_split = file_nombre.split('\.');
        var file_ext = extension_split[1];


        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el archivo ya que cada vez que le has dado te lo ha guardado en upload/archives
            fs.unlink(file_path, (err) => {

                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es correcta'
                })
            })
        }

        Article.findOneAndUpdate({_id : articleId}, {image: file_nombre}, {new : true})
        .exec((err, uploadImageArticle) => {

            if(err || !uploadImageArticle){

                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no se ha guardado'
                })
                
            }

            return res.status(200).send({
                status: 'success',
                article: uploadImageArticle
            })


        })


    }),//fin del metodo uploadImage



    getImage : ((req,res) => {

        var nombreImage = req.params.image;
        var path_file = './upload/articles/'+ nombreImage;

        fs.exists(path_file, (exists) => {
        

            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                return res.status(404).send({
                    status: 'success',
                    message: 'La imagen no existe'
                })
            }
        })

        
    }),//fin del metodo getImage


    search : ((req,res) => {

        var searchString = req.params.search;

        Article.find({"$or":[
            {"title": {"$regex": searchString, "$options": "i"}},
            {"content": {"$regex": searchString, "$options": "i"}},
            {"author": {"$regex": searchString, "$options": "i"}},
            {"font": {"$regex": searchString, "$options": "i"}}

        ]})
        .sort([['date', 'descending']])
        .exec((err, articleSearched) => {

            if(err || !articleSearched || articleSearched=="" ){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay resultados de la busqueda'
                })

            }

            return res.status(200).send({
                status: 'success',
                article : articleSearched
            })
        })
    })

}//fin del controller

module.exports = controller;