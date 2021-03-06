import React, { useState } from 'react';
import "../styles/navBar.css";
import { Link } from "gatsby";
import {Helmet} from "react-helmet";
import GetImage from "../components/getImage";
import CounterNavBar from "../components/localStorageService";


 let NavBar= (props)=>{
     //abrir o cerrar menu
const [clase, setClase] = useState("listadoNavBar showList");
const[estadoMenu,setEstadoMenu]=useState('cerrado')

let abrirCerrar=()=>{
if(clase==="listadoNavBar showList"){
    setClase("listadoNavBar")
    setEstadoMenu('abierto')

}
if(clase==="listadoNavBar"){
    setClase("listadoNavBar showList")
    setEstadoMenu('cerrado')
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
    <>
    <Helmet>
    <html lang="es"></html>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
  <meta name="googlebot" content="noindex" />
  
    </Helmet>

    
    <header>
      <nav>
        <div>
        <button className="buttonMenu" onClick={() => abrirCerrar()}>  {estadoMenu==="cerrado" ? <GetImage imageName="menu-cerrado.png" altText="icono menu"/> : <GetImage imageName="cerrar-menu.png" altText="icono cerrar menu"/>}</button>
          <ul className={clase}>
            <li><Link to="/" onClick={() => abrirCerrar()}>INICIO</Link></li>
            <li>
              <button className="buttonProducts" onClick={() => verProductos()}>PRODUCTOS<GetImage imageName="flecha-hacia-abajo.png" altText="flecha hacia abajo"/></button>
              <ul className={claseProducts}>
                <li><Link to="/productos" onClick={() => {verProductos();abrirCerrar()}}>Catálogo completo</Link></li>
                <li><hr/></li>
                <li><Link to="/frutas" onClick={() => {verProductos();abrirCerrar()}}><GetImage imageName="icono-cereza.png" altText="icono cerezas"/>Frutas</Link></li>
                <li><Link to="/verduras" onClick={() => {verProductos();abrirCerrar()}}><GetImage imageName="icono-cebolla.png" altText="icono cebolla"/>Verduras</Link></li>
                <li><Link to="/encurtidos" onClick={() => {verProductos();abrirCerrar()}}><GetImage imageName="icono-encurtidos.png" altText="icono encurtidos"/>Encurtidos</Link></li>
              </ul>
            </li>
            <li><Link to="/sobre-nosotros" onClick={() => abrirCerrar()}>NOSOTROS</Link></li>
            <li><Link to="/contacto" onClick={() => abrirCerrar()}>CONTACTO</Link></li>
            <li className="cartLi"><Link to="/carro" onClick={() => abrirCerrar()}><GetImage imageName="icono-carrito-verde.png" altText="icono carrito verde"/><span>CARRITO ( <CounterNavBar/> )</span></Link></li>
          </ul>
        </div>
        <div> <Link to="/"><GetImage imageName="horticurita-logo.png" altText="logo horticurita"/></Link></div>
        <div className="carrito">
      <Link to="/carro">
        <GetImage
          imageName="icono-carrito-blanco.png"
          altText="icono carrito"
        />
        ( <CounterNavBar/> )
      </Link>
    </div>
      </nav>
    </header>
    </>
  )
};



  export default NavBar;

