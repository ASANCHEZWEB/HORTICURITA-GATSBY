import React, { useState } from "react";
import { Link } from "gatsby";
import GetImage from "../components/getImage";

// este componente  solo devuelve el contador del carro para pintarlo en la navbar
export default function CounterNavBar(props) {
  const [counter, setCounter] = useState(0);
  setInterval(() => {
    setCounter(JSON.parse(localStorage.getItem("carrito")).length);
  }, 1000);
  return (
    <div className="carrito">
      <Link to="/carro">
        <GetImage
          imageName="icono-carrito-blanco.png"
          altText="icono carrito"
        />
        ( {counter} )
      </Link>
    </div>
  );
}

// esta función te trae el array que esta en el local storage para jugar con el , añadir modificar y eliminar  elementos del localstorage llamado "carrito"

let getCarrito = () => {
  return JSON.parse(localStorage.getItem("carrito"));
};

let addToLocalStorage = (product) => {
  //primero busco si ya existe en el LS para actualizarlo
  let carritoArray = getCarrito();

  let test =carritoArray.filter((element) => {return product.node.id === element.node.id}).length === 0;

  if (test === true) {
    // en caso de que no exista lo pushea al array
    product.node.frontmatter.agregado++;
    carritoArray.push(product);
    localStorage.setItem("carrito", JSON.stringify(carritoArray));
  } else {
    //en caso de que exista lo cogemos y le sumamos uno y actualizamos el array
    carritoArray = carritoArray.map((element) => {
      if (element.node.id === product.node.id) {
        element.node.frontmatter.agregado++;
        return element;
      } else {
        return element;
      }
    });
    localStorage.setItem("carrito", JSON.stringify(carritoArray));
  }
};

//exportación de funciones para uso externo
export { getCarrito, addToLocalStorage };
