import React, { Component } from 'react';
import axios from 'axios';

import Global from '../Global';


class Noticia extends Component {

    render(){

        return(
        <h1>Estas dentro de la noticia{this.props.solicitada}</h1>


        );
    }
}
export default Noticia;
