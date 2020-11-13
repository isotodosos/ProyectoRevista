import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';



import Header from './components/Header';
import Navegador from './components/Navegador';
import Footer from './components/Footer';
import Portada from './components/Portada';
import Noticias from './components/Noticias';
import Creador from './components/Creador';
import SearchResult from './components/SearchResult';
import Noticia from './components/Noticia';



                   



class Router extends Component {

    render() {

        return (

            <BrowserRouter>
                <Header />
                <Navegador />
                
                <Switch>
                    <Route exact path="/" component={Portada} />
                    <Route exact path="/Inicio" component={Portada} />
                    <Route exact path="/Noticias/:category" render={(props) =>{
                        var category = props.match.params.category;
                        //console.log(category);
                        return(
                            <Noticias title = {category} />
                        );
                    }}/>
                    <Route exact path="/Noticias/Busqueda/:search" render={(props) =>{
                        var palabra = props.match.params.search;
                        
                        return(
                            <SearchResult buscador = {palabra} />
                        );
                    }}/>
                    <Route exact path = "/Noticia/:id" render = {(props) => {
                        var id = props.match.params.id;
                        return(
                            <Noticia solicitada = {id}/>
                        );
                    }} />
                    <Route exact path="/Crear" component={Creador} />
                    <Route exact path="/redirect/:search" render={(props) =>{
                        var search = props.match.params.search;
                        return(
                            <Redirect to={"/Noticias/Busqueda/" + search}/>
                        );
                    }}/>

                    
                    
                    
                    
                    
                   
                    
                   
                    
                </Switch>
                <Footer />
            </BrowserRouter>

        );
    }
}
export default Router;