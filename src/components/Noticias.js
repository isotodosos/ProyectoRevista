import React, { Component } from 'react';
import axios from 'axios';




import Global from '../Global';
import { withRouter } from 'react-router-dom';
import {NavLink} from 'react-router-dom';

class Noticias extends Component {

    /*constructor(props) {
        super(props);

        this.url = Global.url;

        this.state = {
            articles: [],
            status: null,
            prueba: null
            
            

            
        }
        
    }*/

    url = Global.url;

    state = {
        articles: [],
        status: null,
        prueba: null
        
    }

   

    componentWillMount = () => {
        var category = this.props.title;
        //console.log(category);

        switch (category) {
            case 'Cultura':
              this.mostrar(category);
              break;
            case 'Sociedad':
                this.mostrar(category);
              break;
            case 'Economía':
                this.mostrar(category);
              break;
            case 'Deportes':
                this.mostrar(category);
              break;
            
            default:
              console.log('Lo lamentamos, por el momento no disponemos de esta categoria ');
          }

    }



    componentWillReceiveProps = (nextProps, prevState) => {
        if(prevState !== nextProps){
            //console.log(prevState);
           // console.log(nextProps.title);

            
            this.mostrar(nextProps.title);
            
           
           
        }

        return null;
    }


    

    mostrar = (categor) => {

        
       // console.log(categor);
    
        axios.get(this.url + "/articles/" + categor)
        .then((res) => {

            this.setState({
                articles: res.data.article,
                status: "success",
                prueba: categor

            })
           // console.log(this.state.prueba);


        })
        .catch(err => {  // Con esto capturamos el posible error de que no haya busqueda y nos mostrase cargando en lugar de no hay articulos para mostrar
            this.setState({
                articles: [],
                status: "success"

            })
            
        })
    }

    

    


    render(){

        
       var prueba = this.state.prueba;
        

       
        if (this.state.articles != "") {
           // console.log(this.state.articles);
       
            var resultado =  this.state.articles.map((article, i)=> {
                return(
                <div key={i} className="row resultado" >
                    <img src={this.url +"/get-image/"+article.image} alt={article.image} className="col-4"/>
                    <h3 className="col-8"><NavLink className="nav-link" to={"/Noticia/"+ article._id}>{article.title}</NavLink></h3>
                    
                   
                </div>
                
                )
            });

            
            return(
                <section className="container SectionNoticias">    
                    <div>
                        
                        <h2> Sección {prueba /*this.state.articles[2].category*/} </h2>
                        <hr></hr>
                        <section className = "SectionArticulos">{resultado}</section>
                    </div>
                </section>
            )
            

            

            

            
            

        }

        else{
            return(
            <h1>No hay articulos en esta categoría</h1>
            )
        }

        

        


       
        
    }
}
export default Noticias;