import "./src/styles/global.css"

// or:
if(localStorage.getItem("carrito")===null){
    localStorage.setItem("carrito","[]")
}


let divCarro=document.createElement('div')
divCarro.setAttribute("class", "cartNoti");


document.querySelector('body').appendChild(divCarro)

