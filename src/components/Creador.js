import React, { Component } from 'react';
import Global from '../Global';

import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

import { Redirect } from 'react-router-dom';

class Creador extends Component {

    titleRef = React.createRef();
    authorRef = React.createRef();
    fontRef = React.createRef();
    categoryRef = React.createRef();
    contentRef = React.createRef();
    fileRef = React.createRef();

    url = Global.url;

    state = {
        article: {},
        status: null,
        selectedFile: null

    }

    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
              required: 'Este campo es obligatorio'//personalizamos el mensaje de esta forma
             
            }
        });  /// validator se utiliza como una propiedad

        
    }

   

    


    verificar = () => {

        //console.log(this.contentRef.current.value);

        this.setState({
            article: {
                title: this.titleRef.current.value,
                author: this.authorRef.current.value,
                font: this.fontRef.current.value,
                category: this.categoryRef.current.value,
                content: this.contentRef.current.value
                
                
            }

        });

       

        this.validator.showMessages();
        this.forceUpdate();
       
       
        
        

        
        
    }

    

    fileChange = (event) => {
        //console.log(event.target.files[0]);

        this.setState({
            selectedFile: event.target.files[0]
        })
        
    }



    crear = (e) => {

        e.preventDefault();

        this.verificar();
        

       

        if (this.validator.allValid()) {
            
            
            axios.post(this.url + "/save", this.state.article)
            .then((res) => {
                //console.log(res);
                this.setState({
                    article: res.data.article,
                    status: "waiting"
                })
                console.log("Se ha ido por el correcto");
            
                swal(  // para distintos tipos de pop up visitar la pagina swal
                    'Articulo creado',
                    'El articulo se ha creado correctamente',
                    'success',
                    
                );
                
                if(this.state.selectedFile != null){

                    //sacar el id del articulo guardado
                    var articleId = this.state.article._id;

                    //crear form data y añadir fichero
                    const formData = new FormData();//creamos un formulario y le adjuntamos el archivo
                    formData.append(//con append le vinculamos un fichero
                        'file0',//el nombre del fichero que vinculamos
                        this.state.selectedFile, //el fichero que envio
                        this.state.selectedFile.name //con que nombre se envia 
                    );


                    axios.post(this.url + "/upload-image/" + articleId, formData)
                    .then((res) => {
                        if (res.data.article) {
                            this.setState({
                                article: res.data.article,
                                status: "success"
                            })
                        }
                        else {
                            this.setState({
                                article: res.data.article,
                                status: "failed"
                            })
                        }
                    })
                }
                // si no hay fichero cambio el waiting por success
                else{
                    this.setState({
                        status: "success"
                    })
                }
            })
            // si no hay respuesta del metodo guardar..
            .catch((err) => {
                this.setState({
                    article: false,
                    status: "failed"
                })
            })
            
         
        }
        // si no esta todo validado..
        else{
            this.setState({
                
                status: "failed"
                
            })
            console.log("Se ha ido por el else");
            this.validator.showMessages();
            this.forceUpdate();
        }

        
    }
    

    render(){
        

        if (this.state.article && this.state.status === "success") {
            return (<Redirect to="/Inicio" />);

        }
        

        return(

            
            
            <section className="container SectionCreador">
                <h2> Crear artículo </h2>
                <hr></hr>
                <form onSubmit = {this.crear}>
                    
                    
                    <div className="form-group ">
                        
                        <input placeholder="titulo" onChange={this.verificar} name="title" ref={this.titleRef} className="col-10" required />
                        {/*this.validator.message('title', this.state.article.title, 'required|min:20|max:150')*/}
                        <input placeholder="Autor" onChange={this.verificar} name="author" ref={this.authorRef} className="col-6" required/>
                        <input placeholder="Fuente" onChange={this.verificar} name="font" ref={this.fontRef} className="col-3" required/>
                        
                    </div>

                    <div className="form-group">

                        
                        <select  className="form-control" onChange={this.verificar} name="category" ref={this.categoryRef} id="exampleFormControlSelect1" className="col-10" required>
                            {/*<option>Selecciona la categoría del artículo</option>*/}
                            <option>Cultura</option>
                            <option>Sociedad</option>
                            <option>Economía</option>
                            <option>Deportes</option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Contenido</label>
                        <textarea className="form-control" onChange={this.verificar} name="content" ref={this.contentRef} id="exampleFormControlTextarea1" rows="30" required></textarea>
                    </div>

                    <div className="form-group ">
                        <label className="col-5">Adjuntar imagen al artículo:</label>
                        <input type="file"name="file0" ref={this.fileRef} onChange={this.fileChange} className="col-6"/>
                    </div>

                    <button type="submit" className="btn btn-outline-primary my-2 my-sm-0">Publicar</button>
                </form>
            </section>
        )
    }
}
export default Creador;