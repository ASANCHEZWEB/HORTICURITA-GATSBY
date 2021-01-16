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
  let carritoLocalStorage = getCarrito();
  //BUSCAR EXISTENCIA DE PRODUCTO EN LOCALSTORAGE
  let encontrado = carritoLocalStorage.filter((elementLs) => {return elementLs.node.id === product.node.id}).length === 0;
  if (encontrado) {
    //SI NO SE ENCUENTRA EN EL CARRO , LE SUMAMOS UNO Y LO METEMOS
    let copiaElemento = {...product};
    copiaElemento.node.frontmatter.agregado = 1
    carritoLocalStorage.push(copiaElemento)
    localStorage.setItem("carrito", JSON.stringify(carritoLocalStorage))
    product.node.frontmatter.agregado = 0;
  } else {
    //SI YA ESTA EN LOCAL STORAGE LO BUSCAMOS EN LS Y LE RESTAMOS UNO A AGREGADO
    let buscadoyAtualizado = carritoLocalStorage.map((elementLs) => {
      let producto = "";
      if (elementLs.node.id === product.node.id) {
        elementLs.node.frontmatter.agregado++
        producto = elementLs
      } else {
        producto = elementLs
      }
      return producto
    })
    localStorage.setItem("carrito", JSON.stringify(buscadoyAtualizado))
  }
};



let restProduct = (product) => {
  let carritoLocalStorage = getCarrito();
  //BUSCAR EXISTENCIA DE PRODUCTO EN LOCALSTORAGE
  let encontrado = carritoLocalStorage.filter((elementLs) => {return elementLs.node.id === product.node.id}).length === 1;
  //SI ESTA DENTRO DEL LOCAL STORAGE LE RESTAMOS UNO Y ACTUALIZAMOS EL LS
  if (encontrado) {
    //buscamos el producto y miramos que cantidad tiene actualmente para restarle 1 o eliminarlo directamente
    let agregadoCount = carritoLocalStorage.filter((elementLs) => {return elementLs.node.id === product.node.id})[0].node.frontmatter.agregado;

    if (agregadoCount === 1) {
      let newCarrito = carritoLocalStorage.filter((elementLs) => {
        return elementLs.node.id !== product.node.id
      })
      localStorage.setItem("carrito", JSON.stringify(newCarrito))
    } else {
      //aqui lo que vamos a hacer solo es restar uno al producto y  actualizar el carrito en local storage y listo 
      let newCarrito = carritoLocalStorage.map((elementLs) => {
        let producto = ""
        if (elementLs.node.id === product.node.id) {
          elementLs.node.frontmatter.agregado--
          producto = elementLs
        } else {
          producto = elementLs
        }
        return producto
      })
      localStorage.setItem("carrito", JSON.stringify(newCarrito))
    }
  }
}




//exportación de funciones para uso externo
export { getCarrito, addToLocalStorage, restProduct };
