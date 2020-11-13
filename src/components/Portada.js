import React, { Component } from 'react';
import axios from 'axios';


import Global from '../Global';
import {NavLink} from 'react-router-dom';

class Portada extends Component {


    url = Global.url;

    state = {
        status: null,
        articles: null,
        resultado: null
    }

    componentWillMount = () => {
        this.cargar();
    }
    seleccionar = (res) => {
        
        var todoRes = res;

        var ultimaHora = [];

        var artEco = todoRes.find(elem => elem.category == "Economía");
        //console.log(artEco);
        var artDep = todoRes.find(elem => elem.category == "Deportes");
       // console.log(artDep);
       var artCul = todoRes.find(elem => elem.category == "Cultura");
      // var artSal = todoRes.find(elem => elem.category == "Salud");
       var artSoc = todoRes.find(elem => elem.category == "Sociedad");
      // var artMed = todoRes.find(elem => elem.category == "Medio Ambiente");


        ultimaHora.push(artEco, artSoc, artDep, artCul /*, artSal, artMed*/);

        this.setState({

            status: "success",
            resultado: ultimaHora

        })

        //console.log(ultimaHora);
        

    }

    cargar = () => {

        axios.get(this.url + "/articles")
            .then((res) => {

               
               
                this.setState({

                    status: res.data.status/*"success"*/,
                    articles: res.data.article

                })

                
                this.seleccionar(res.data.article);
                
                //console.log(this.state.articles);


            })
            .catch((err) => {  // Con esto capturamos el posible error de que no haya busqueda y nos mostrase cargando en lugar de no hay articulos para mostrar
                this.setState({

                    status: "success",
                    articles: null

                })
                //console.log(this.state.status);
            })




    }

   



render() {


    var PStyle = {
        width: 18 + "rem"
    };

    
    return (
        <section className="SectionPortada container">
            <div>
                <h2 className="col-12">Últimas Noticias</h2>
                <div className="card-deck">
                

                    {/*this.state.articles &&*/}
                    {this.state.resultado &&
                        //this.state.articles.map((article) => {
                        this.state.resultado.map((article, i) => {    
                            return (
                                
                                <div className="card " style={PStyle} key={i}>   
                                    <img src={this.url + "/get-image/" + article.image} className="card-img-top" alt={article.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.category}</p>
                                        {/*<a href="#" className="btn btn-primary">Leer Noticia</a>*/}
                                        <NavLink className="nav-link" to={"/Noticia/"+ article._id}>Leer Noticia</NavLink>
                                    </div>
                                    


                                </div>


                            )
                        })}
                </div>
                
            </div>
        </section>
    );







}
}
export default Portada;