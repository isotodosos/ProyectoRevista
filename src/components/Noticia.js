import React, { Component } from 'react';
import axios from 'axios';

import Global from '../Global';


class Noticia extends Component {

    url = Global.url;

    state = {
        article: {},
        status: null

    }

    componentWillMount = () => {
        var noticia = this.props.solicitada;
        this.cargar(noticia);
    }

    cargar = (noticia) => {
        axios.get(this.url + "/article/" + noticia )
            .then((res) => {

               
               
                this.setState({
                    
                    article: res.data.article,
                    status: res.data.status/*"success"*/

                })


            })
            .catch((err) => {  // Con esto capturamos el posible error de que no haya busqueda y nos mostrase cargando en lugar de no hay articulos para mostrar
                this.setState({

                    status: "success",
                    articles: null

            })
               
        })
    }

    render(){

        var article = this.state.article;

        return(

            <section className="SectionNoticia">
                <img src={this.url + "/get-image/" + article.image} alt={article.title}></img>
                <div className="Info row">
                    <h6>{"Fuente: "+ article.font}</h6>
                    <h6>{"Autor: "+ article.author}</h6>
                </div>
                <h3>{article.title}</h3>
                <p>{article.content}</p>

            </section>

         


        );
    }
}
export default Noticia;
