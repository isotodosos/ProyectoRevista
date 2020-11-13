import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Footer extends Component {

    render() {

        return (
            <section className="SectionFooter">
                <div className="row">

                    <NavLink className="linkFooter col-3" to="/Noticias/Cultura">CULTURA</NavLink>
                    <NavLink className="linkFooter col-3" to="/Noticias/Sociedad">SOCIEDAD</NavLink>
                    <NavLink className="linkFooter col-3" to="/Noticias/Economia">ECONOMIA</NavLink>
                    <NavLink className="linkFooter col-3" to="/Noticias/Deportes">DEPORTES</NavLink>

                    <h3 className="linkFooter col-12"><NavLink to="/Inicio">@_Diario Comarcal</NavLink></h3>

                    <NavLink className="linkFooter col-4" to="#" >Redes Sociales</NavLink>
                    <NavLink className="linkFooter col-4" to="#" >Empleo</NavLink>
                    <NavLink className="linkFooter col-4" to="#" >Contáctanos</NavLink>

                </div>

            </section>
        );
    }
}

export default Footer;