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




let myVar;
function myFunction() {
  myVar = setTimeout(function(){ 
    
    document.querySelector('.cartNoti').setAttribute("class","cartNoti animate__animated animate__fadeOutRightBig")
  }, 4000);
}

let mostrarCuadro=(info)=>{
  clearTimeout(myVar);
let elementoNoti=document.querySelector('.cartNoti')
let formato =""
let alDel=""
if(info.producto.node.frontmatter.formato==="kg"){
  formato = "0.5 Kgs"
}else{
  formato= "1 Ud"
}
if(info.operacion==="Eliminado"){
  alDel="del"
}else{
  alDel="al"
}
let contenidoitem=`
<button id="demo">X</button>
<img src="../../${info.producto.node.frontmatter.imageName[0]}"></img>
<div><span>${info.operacion} ${formato} de ${info.producto.node.frontmatter.name} ${alDel} carrito</span>
<a href="/carro">Ver Carrito</a>
</div>

`

elementoNoti.innerHTML = contenidoitem
elementoNoti.setAttribute("style",`display:flex`)
elementoNoti.setAttribute("class","cartNoti animate__animated animate__bounceInLeft")

myFunction()
document.getElementById("demo").addEventListener("click", function() {
  document.querySelector('.cartNoti').setAttribute("class","cartNoti animate__animated animate__fadeOutRightBig")
});
}








// esta función te trae el array que esta en el local storage para jugar con el , añadir modificar y eliminar  elementos del localstorage llamado "carrito"
let getCarrito = () => {
  return JSON.parse(localStorage.getItem("carrito"));
};


let addToLocalStorage = (product,fromCart) => {

  if(product.node.frontmatter.disponible==="si"){

    if(fromCart!==true){mostrarCuadro({producto:product,operacion:"Añadido"})} 
    
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
  }
  

};



let restProduct = (product) => {
  let carritoLocalStorage = getCarrito();
  //BUSCAR EXISTENCIA DE PRODUCTO EN LOCALSTORAGE
  let encontrado = carritoLocalStorage.filter((elementLs) => {return elementLs.node.id === product.node.id}).length === 1;
  //SI ESTA DENTRO DEL LOCAL STORAGE LE RESTAMOS UNO Y ACTUALIZAMOS EL LS
  if (encontrado) {
    mostrarCuadro({producto:product,operacion:"Eliminado"})
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


let filtrarPorDisponibles = (arrayState) => {
  // este metodo lo que hace es comprobar las cantidades del carrito con la de graphql para modificar el estado y pintar el valor del carrito en listado
  let arrayCarrito = getCarrito();
  let nuevoArray = arrayState.map((elementState) => {
    let producto = elementState;
    arrayCarrito.forEach((elementLs) => {
      if (elementState.node.id === elementLs.node.id) {
        producto = elementLs
      }
    })
    return producto
  })
  //ahora cogemos los disponibles en un array y luego los no en otro y los junto para que esten los disponibles primero y los no como segundos
  let disponibles = []
  let noDisponibles = []
  nuevoArray.forEach((element) => {
    if (element.node.frontmatter.disponible === "si") {
      disponibles.push(element)
    } else {
      noDisponibles.push(element)
    }

  })
  //devuelvo un array de productos ordenador por disponibilidad
  return disponibles.concat(noDisponibles)
}



let deleteCartProduct =(productId)=>{
localStorage.setItem("carrito", JSON.stringify(getCarrito().filter((element)=>{
  return element.node.id!==productId
})))
}





//exportación de funciones para uso externo
export { getCarrito, addToLocalStorage, restProduct,filtrarPorDisponibles,deleteCartProduct };
