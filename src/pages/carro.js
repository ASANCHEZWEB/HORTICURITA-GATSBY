import React from "react";
import { getCarrito,deleteCartProduct,addToLocalStorage } from "../components/localStorageService";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import "../styles/cart.css";
import GetImage from "../components/getImage";
import { Link } from "gatsby";

class Carro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arrayProducts: [] };

    this.getCarritoData = this.getCarritoData.bind(this);
    this.deleteProduct=this.deleteProduct.bind(this);
    this.addProduct=this.addProduct.bind(this)
  }

  getCarritoData() {
    this.setState({ arrayProducts: getCarrito() });
  }


deleteProduct(productId){
    deleteCartProduct(productId)
    this.getCarritoData()
}

addProduct(product){
    addToLocalStorage(product,true)
this.getCarritoData()

}




  componentDidMount() {
    this.getCarritoData();
  }
  render() {
    return (
      <>
        <NavBar />
        <main className="mainContainerCart">
          <div className="containerTitleCart">
            <h1>CARRITO</h1>
            <p>
              Puedes modificar cantidades directamente desde aquí o <strong>finalizar el pedido</strong> 😉 .
            </p>
          </div>
          <div className="containerItemsCart">
            <div className="cartList">
            <h2>Productos añadidos</h2>
            <div className="displayItemsContainer">{this.state.arrayProducts.map((element)=>{
                    return <div className="itemCart" key={element.node.id}>
                    <div><button onClick={()=>this.deleteProduct(element.node.id)} type="button" aria-label="Eliminar"><GetImage imageName="icono-eliminar.png" altText="icono eliminar producto"/></button></div>
                    <div className="imageItemCart"> <Link to={element.node.frontmatter.slug}><GetImage imageName={element.node.frontmatter.imageName[0]} altText={element.node.frontmatter.altText}/></Link></div>
                    <div className="displayItemData"><span>PRODUCTO: </span><Link to={element.node.frontmatter.slug}><span>{element.node.frontmatter.name}</span></Link></div>
                    {element.node.frontmatter.formato==="unidades"? <div className="displayItemData"><span>PRECIO/Ud: </span><span>{element.node.frontmatter.price}/Ud</span></div>: <div className="displayItemData"><span>PRECIO/Kg: </span><span>{element.node.frontmatter.price}/Kg</span></div>}
                    <div className="displayItemData">
                    <span>CANTIDAD: </span>
                    
                    <div className="containerButtonsCart"><button>-</button>{element.node.frontmatter.formato==="unidades"? <span>{element.node.frontmatter.agregado}</span>: <span>{element.node.frontmatter.agregado/2}</span>}<button onClick={()=>this.addProduct(element)}>+</button></div>
                    </div>
                    {element.node.frontmatter.formato==="unidades"? <div className="displayItemData"><strong>SUBTOTAL: </strong><span>{element.node.frontmatter.price*element.node.frontmatter.agregado}€</span></div>: <div className="displayItemData"><strong>SUBTOTAL: </strong><span>{(element.node.frontmatter.price*element.node.frontmatter.agregado/2)}€</span></div>}
                    


                    </div>
                })}</div>
                
            </div>
            <div className="totalCartPay"></div>
          </div>
        </main>

        <Footer />
      </>
    );
  }
}

export default Carro;
