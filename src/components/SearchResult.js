import React, { Component } from 'react';
import axios from 'axios';

import Global from '../Global';
import {NavLink} from 'react-router-dom';

class SearchResult extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null,
        search: null
        
    }


    componentWillMount = () => {

        var busqueda = this.props.buscador;
        
        this.buscar(busqueda);
    
    }

    buscar = (busqued) => {

        axios.get(this.url + "/search/" + busqued)
        .then((res) => {

            this.setState({
                articles: res.data.article,
                status: "success",
                search : busqued

            })
            


        })
        .catch(err => {  // Con esto capturamos el posible error de que no haya busqueda y nos mostrase cargando en lugar de no hay articulos para mostrar
            this.setState({
                articles: [],
                status: "success",
                search : busqued


            })
        })
    }

    render(){

        if (this.state.articles != "") {
            console.log(this.state.articles);
       
            var resultado =  this.state.articles.map((article, i)=> {
                return(
                /*<div key={i} className="row" >
                    <img src={this.url +"/get-image/"+article.image} alt={article.image} className="col-4"/>
                    <h3 className="col-8">{article.title}</h3>
                </div>
                */
               <div key={i} className="row resultado" >
                    <img src={this.url +"/get-image/"+article.image} alt={article.image} className="col-4"/>
                    <h3 className="col-8"><NavLink className="nav-link" to={"/Noticia/"+ article._id}>{article.title}</NavLink></h3>
                    
                   
                </div>
                )
            })

            return(
            /*<section className="container">    
                <div>
                    <h1> Artículos encontrados con {this.state.search}  </h1>
                    <section className = "SectionArticulos">{resultado}</section>
                </div>
            </section>
            */
           <section className="container SectionNoticias">    
                    <div>
                        
                        <h2> Artículos encontrados con {this.state.search}  </h2>
                        <hr></hr>
                        <section className = "SectionArticulos">{resultado}</section>
                    </div>
                </section>
            )

        }

        else{
            return(
            <h1>No hemos encontrado ningún artículo segun la busqueda {this.state.search}</h1>
            )
        }
    }
}
export default SearchResult;