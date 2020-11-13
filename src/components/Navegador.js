import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Buscador from './Buscador';


class Navegador extends Component {

    render() {

        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="navbar-brand" to="/Inicio">PORTADA</NavLink>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item"> {/*active */}
                            <NavLink className="nav-link" to="/Noticias/Cultura">Cultura <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Noticias/Sociedad">Sociedad</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Noticias/Economía">Economía</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Noticias/Deportes">Deportes</NavLink>
                        </li>
                        <li>
                        <NavLink className="btn btn-outline-primary my-2 my-sm-0" to="/Crear">Crear Artículo</NavLink>
                        </li>
                        
                        
                        
                    </ul>
                    
                    
                    <Buscador/>
                    
                </div>
            </nav>

        );
    }
}

export default Navegador;

