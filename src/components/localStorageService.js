import React ,{useState} from 'react';
import { Link } from "gatsby";
import GetImage from "../components/getImage"


// este componente  solo devuelve el contador del carro para pintarlo en la navbar
 export default function CounterNavBar(props){
  const[counter,setCounter]= useState(0)
 setInterval(() => {
   setCounter(JSON.parse(localStorage.getItem("carrito")).length)
}, 1000);
  return <div className="carrito"><Link to="/carro"><GetImage imageName="icono-carrito-blanco.png" altText="icono carrito"/>( {counter} )</Link></div>
}

// esta función te trae el array que esta en el local storage para jugar con el  añadir modificar y eliminar  elementos del localstorage llamado "carrito"

let getCarrito=()=>{

  return JSON.parse(localStorage.getItem("carrito"))
}


export {getCarrito}