import React, { useState } from 'react';
import "../styles/navBar.css";
import { Link } from "gatsby";
import {Helmet} from "react-helmet";



 let NavBar= (props)=>{
     //abrir o cerrar menu
const [clase, setClase] = useState("listadoNavBar showList");
const[imagenMenu,setImagenMenu]=useState('images/menu-cerrado.svg')
let abrirCerrar=()=>{
if(clase==="listadoNavBar showList"){
    setClase("listadoNavBar")
setImagenMenu('https://res.cloudinary.com/dfsni6m2x/image/upload/c_scale,h_23,q_10,w_23/v1593638701/iconosHorticurita/closeMenu_ovofxv.png')

}
if(clase==="listadoNavBar"){
    setClase("listadoNavBar showList")
    setImagenMenu('http://localhost:8000/images/menu-cerrado.svg')
}
}
    //abrir  o cerrar productos
const [claseProducts, setClaseProducts] = useState("showProducts");
let verProductos=()=>{
    if(claseProducts==="showProducts"){
        setClaseProducts("ulProductos")
    }
if(claseProducts==="ulProductos"){
    setClaseProducts("showProducts")
}

}

  return (
    
    <header>
    <Helmet>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
    </Helmet>
      <nav>
        <div>
        <button className="buttonMenu" onClick={() => abrirCerrar()}><img alt="menu cerrado" src={imagenMenu}/></button>
          <ul className={clase}>
            <li><Link to="/">INICIO</Link></li>
            <li>
              <button className="buttonProducts" onClick={() => verProductos()}>PRODUCTOS<img src="https://res.cloudinary.com/dfsni6m2x/image/upload/c_scale,h_15,q_10,w_15/v1593638701/iconosHorticurita/arrowMenu_g1nsml.png" alt="flecha abajo"/></button>
              <ul className={claseProducts}>
                <li><Link to="/productos">Catálogo completo</Link></li>
                <li><hr/></li>
                
                <li><Link to="/frutas"><img alt="icono cerezas" src="https://res.cloudinary.com/dfsni6m2x/image/upload/c_scale,h_22,q_10,w_22/v1593638701/iconosHorticurita/cereza_ufuh5p.png"/>Frutas</Link></li>
                <li><Link to="/verduras"><img alt="icono cebolla" src="https://res.cloudinary.com/dfsni6m2x/image/upload/c_scale,h_22,q_10,w_22/v1593638702/iconosHorticurita/cebolla_xjy7rb.png"/>Verduras</Link></li>
                <li><Link to="/encurtidos">Encurtidos</Link></li>
              </ul>
            </li>
            <li><Link to="/nosotros">NOSOTROS</Link></li>
            <li><Link to="/contacto">CONTACTO</Link></li>
            <li className="cartLi"><Link to="/carro"><img alt="imagen carrito verde" src="https://res.cloudinary.com/dfsni6m2x/image/upload/c_scale,h_40,q_10,w_40/v1593638701/iconosHorticurita/carritomenu_nsscxy.png"/><span>CARRITO (0)</span></Link></li>
          </ul>
        </div>
        <div> <Link to="/"><img alt="horticurita-logo" src="https://horticurita.es/horticurita-logo.png"/></Link></div>
        <div className="carrito"><Link to="/carro"><img alt="icono carrito" src="https://horticurita.es/icono-carrito-blanco.png"/> ( 0 )</Link></div>
      </nav>
    </header>
  )
};



  export default NavBar;

