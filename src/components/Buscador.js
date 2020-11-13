import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Buscador extends Component {

    searchRef = React.createRef();

    state = {
        search : "",
        redirect : false
    }

    searchWord = (e) => {

        e.preventDefault();

        this.setState({
            search : this.searchRef.current.value,
            redirect: true

        })
        
    }





    render(){
        
        if(this.state.search && this.state.redirect){
            
            return(
                <React.Fragment>
                    <Redirect to={"/redirect/" + this.state.search}/>
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.searchWord}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Buscar" ref={this.searchRef} aria-label="Search" />
                    
                        <button type="submit" className="btn btn-outline-primary my-2 my-sm-0">Buscar</button>
                    </form>
                </React.Fragment>
                
            
            )
        }



        return(
            
            <form className="form-inline my-2 my-lg-0" onSubmit={this.searchWord}>
                <input className="form-control mr-sm-2" type="search" placeholder="Buscar" ref={this.searchRef} aria-label="Search" />
               
                <button type="submit" className="btn btn-outline-primary my-2 my-sm-0">Buscar</button>
            </form>

            
            
        )
    }
}
export default Buscador;
