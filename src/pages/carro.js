import React from "react";
import { getCarrito,deleteCartProduct,addToLocalStorage,restProduct } from "../components/localStorageService";
import "../styles/cart.css";
import GetImage from "../components/getImage";
import { Link } from "gatsby";
import Product from "../components/paypalButtons"
class Carro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arrayProducts: [] ,modalInfo:"",ivas:{},codigoCupon:"",discountCodes:[],discountApply:"",totalCarrito:{}};

    this.getCarritoData = this.getCarritoData.bind(this);
    this.deleteProduct=this.deleteProduct.bind(this);
    this.addProduct=this.addProduct.bind(this);
    this.restProd=this.restProd.bind(this);
    this.deleteModal=this.deleteModal.bind(this)
    this.cerrarModal=this.cerrarModal.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTotalCartObj=this.createTotalCartObj.bind(this)
  }


  getCarritoData() {
    this.setState({ arrayProducts: getCarrito().map((element)=>{element.node.delete=false;return element}),ivas:JSON.parse(process.env.IVAS)},()=>this.createTotalCartObj());
    
  }




deleteProduct(productId){
    deleteCartProduct(productId)
    this.getCarritoData()
}




deleteModal(product,type){
let arrayDeleteBox= this.state.arrayProducts.map((element)=>{
    if(element.node.id===product.node.id){element.node.delete=true}else{element.node.delete=false}
    return element
})
this.setState({arrayProducts:arrayDeleteBox,modalInfo:type})
}



addProduct(product){
    addToLocalStorage(product,true)
    this.getCarritoData()

}


cerrarModal(element, deleteElement) {
    if (deleteElement === false) {
        this.getCarritoData()
    }
    if (deleteElement === true) {
        this.deleteProduct(element.node.id)
    }
}



restProd(product){
    if(product.node.frontmatter.agregado!==1){
        restProduct(product,true)
        this.getCarritoData()
    }else{
        this.deleteModal(product,"rest")
    }
}




handleChange(event) {
  this.setState({codigoCupon: event.target.value});
}



handleSubmit(event) {
  event.preventDefault();
let descuento=this.state.discountCodes.filter((element)=>{
  return(element.namecode===this.state.codigoCupon)
})
if(descuento.length!==0){
  this.setState({discountApply:descuento[0]})
}else{
  this.setState({discountApply:0})
}
}


createTotalCartObj(){
let subtotal=Number([...this.state.arrayProducts.map(element=>{
if(element.node.frontmatter.formato==="kilogramos"){
  return (element.node.frontmatter.price*element.node.frontmatter.agregado)/2
}else{
  return element.node.frontmatter.price*element.node.frontmatter.agregado
}
})].reduce((valorAnterior, valorActual)=>{
  return valorAnterior + valorActual;
}, 0).toFixed(2))


let impuestos=Number([...this.state.arrayProducts.map(element=>{
  if(element.node.frontmatter.formato==="kilogramos"){
    return (((element.node.frontmatter.price*element.node.frontmatter.agregado)/2)*this.state.ivas[element.node.frontmatter.category])/100;
  }else{
    return ((element.node.frontmatter.price*element.node.frontmatter.agregado)*this.state.ivas[element.node.frontmatter.category])/100;
  }
  })].reduce((valorAnterior, valorActual)=>{
    return valorAnterior + valorActual;
  }, 0).toFixed(2))


  let descuento=0;

let gastosEnvio=JSON.parse(process.env.GASTOSENVIO);



let total=Number(((subtotal+impuestos+gastosEnvio)-descuento).toFixed(2));




  this.setState({totalCarrito:{subTotal:subtotal,impuestos:impuestos,descuento:descuento,gastosEnvio:gastosEnvio,total:total}});
  
  
}




  componentDidMount() {
    this.getCarritoData();
    this.setState({discountCodes:JSON.parse(process.env.CODIGOSDESCUENTO)})
    
  }






  render() {
    return (
      <>
      
        

        <main className="mainContainerCart">
          <div className="containerTitleCart">
            <h1>CARRITO</h1>
            <p>
              Puedes modificar cantidades directamente desde aquí o{" "}
              <strong>finalizar el pedido</strong> 😉 .
            </p>
          </div>
          {this.state.arrayProducts.length===0?
          <div className="carroVacio">
          <h1>Tu carrito está vacío</h1>
          <GetImage imageName="icono-carro-vacio.png" altText="icono carro vacio"/>
          <Link className="animate__animated animate__pulse animate__infinite" to="/productos">VER PRODUCTOS</Link>
          </div>
          
          
          
          
          :<div className="containerItemsCart">
          
            <div className="cartList">
            <h2>Productos añadidos</h2>
            <div className="displayItemsContainer">
                {this.state.arrayProducts.map((element, index) => {
                  return element.node.delete === false ? (
                    <div className="itemCart" key={element.node.id}>
                      <div>
                        <button onClick={() => this.deleteModal(element, "delete")} type="button" aria-label="Eliminar">
                          <GetImage imageName="icono-eliminar.png" altText="icono eliminar producto"/>
                        </button>
                      </div>
                      <div className="imageItemCart">
                        {" "}
                        <Link to={element.node.frontmatter.slug}>
                          <GetImage imageName={element.node.frontmatter.imageName[0]} altText={element.node.frontmatter.altText}/>
                        </Link>
                      </div>
                      <div className="displayItemData">
                        <span>PRODUCTO: </span>
                        <Link to={element.node.frontmatter.slug}>
                          <span>{element.node.frontmatter.name}</span>
                        </Link>
                      </div>
                      {element.node.frontmatter.formato === "unidades" ? (
                        <div className="displayItemData">
                          <span>PRECIO/Ud: </span>
                          <span>{element.node.frontmatter.price}€/Ud</span>
                        </div>
                      ) : (
                        <div className="displayItemData">
                          <span>PRECIO/Kg: </span>
                          <span>{element.node.frontmatter.price}€/Kg</span>
                        </div>
                      )}
                      <div className="displayItemData">
                        <span>CANTIDAD: </span>
                        <div className="containerButtonsCart">
                          <button
                            onClick={() =>
                              this.restProd(element, index, "modal")
                            }
                          >
                            -
                          </button>
                          {element.node.frontmatter.formato === "unidades" ? (
                            <span>{element.node.frontmatter.agregado}</span>
                          ) : (
                            <span>{element.node.frontmatter.agregado / 2}</span>
                          )}
                          <button onClick={() => this.addProduct(element)}>
                            +
                          </button>
                        </div>
                      </div>
                      {element.node.frontmatter.formato === "unidades" ? (
                        <div className="displayItemData">
                          <strong>SUBTOTAL: </strong>
                          <span>
                            {(element.node.frontmatter.price *element.node.frontmatter.agregado).toFixed(2)}
                            €
                          </span>
                        </div>
                      ) : (
                        <div className="displayItemData">
                          <strong>SUBTOTAL: </strong>
                          <span>
                            {((element.node.frontmatter.price *element.node.frontmatter.agregado) /2).toFixed(2)}
                            €
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      key={element.node.id}
                      className="modalDeleteCart animate__animated animate__pulse animate__infinite"
                    >
                      <Link to={element.node.frontmatter.slug}>
                        <GetImage imageName={element.node.frontmatter.imageName[0]} altText={element.node.frontmatter.altText}/>
                      </Link>
                      <strong role="img" aria-labelledby="imagen asombro">
                        {this.state.modalInfo === "delete"
                          ? "¿Está seguro?"
                          : "¿Cantidad 0 ?😱"}
                      </strong>
                      <span>
                        ¿Desea eliminar {element.node.frontmatter.name} del
                        carrito?
                      </span>
                      <div>
                        <button
                          onClick={() => this.cerrarModal(element, false)}
                          type="button"
                          aria-label="Eliminar"
                        >
                          ¡No!
                        </button>
                        <button
                          onClick={() => this.cerrarModal(element, true)}
                          type="button"
                          aria-label="Eliminar"
                        >
                          ¡Sí!
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="totalCartPay">
              <div className="containerDescuento">
                <form onSubmit={this.handleSubmit}>
                  <div><GetImage imageName="icono-descuento.png" altText="icono cupon descuento"/><span>Código descuento o influencer</span><GetImage imageName="icono-descuento.png" altText="icono cupon descuento"/></div>
                  <input placeholder="Si tienes un código aplícalo aquí!😉" type="text" value={this.state.codigoCupon} onChange={this.handleChange}/>
                  <button type="submit">APLICAR</button>
                
                  
                  {this.state.discountApply===0?<div className="notificationDesc animate__animated animate__shakeX"><GetImage imageName="icono-sin-stock.png" altText="icono sin stock"/><span>Código no encontrado</span></div>:""}
                  {this.state.discountApply.namecode!==undefined?<div className="notificationDesc animate__animated animate__shakeY"><GetImage imageName="icono-stock-disponible.png" altText="icono stock"/><span>¡Código aplicado!</span></div>:""}
                </form>
               
              </div>
              <div className="containerResumenCart">
                <h3>TOTAL CARRITO</h3>
                <hr></hr>
                <div><span>Subtotal:</span><span>{this.state.totalCarrito.subTotal}€</span></div>
                <div><span>Impuestos(IVA):</span><span>{this.state.totalCarrito.impuestos}€</span></div>
                <div><span>Descuento:</span><span>-{this.state.totalCarrito.descuento}€</span></div>
                <div><span>Gastos de envío:</span><span>{this.state.totalCarrito.gastosEnvio}€</span></div>
                <hr></hr>
                <div><strong>TOTAL:</strong><span>{this.state.totalCarrito.total}€</span></div>
              </div>
              {/* <button className="finalizarCompraButton animate__animated animate__pulse animate__infinite" id="paypal-button-container">FINALIZAR COMPRA</button> */}
             
              
              <Product/>
              
              

        

              
            </div>
          </div>}
        </main>

        
      </>
    );
  }
}

export default Carro;
