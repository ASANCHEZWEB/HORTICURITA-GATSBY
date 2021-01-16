import React from "react";
import { graphql } from "gatsby";
import GetImage from "../components/getImage";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { Link } from "gatsby";
import "../styles/productos.css";
import { getCarrito,addToLocalStorage,restProduct } from "../components/localStorageService";

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arrayProducts: [] };

    this.getCarritoData = this.getCarritoData.bind(this);
    this.addToLocal = this.addToLocal.bind(this);
    this.restToLocal=this.restToLocal.bind(this);
  }

  
  getCarritoData() {
    // este metodo lo que hace es comprobar las cantidades del carrito con la de graphql para modificar el estado y pintar el valor del carrito en pantalla
    let arrayState = [...this.props.data.allMarkdownRemark.edges];
    let arrayCarrito = getCarrito();
    console.log("ignorar esto",arrayCarrito)


    this.setState({
      arrayProducts: arrayState
    })
  }

  addToLocal(product){
    addToLocalStorage(product)
    this.getCarritoData()
    
  }

  restToLocal(product){
    restProduct(product)
    this.getCarritoData()
  }

  componentDidMount() {
    this.getCarritoData();
  }
  render() {
    return (
      <>
        <NavBar />
        <div className="headerContainerTextProducts">
          <h1>Productos</h1>
          <p>sleecciona desde medio kilo o desde una unidad!</p>
          <hr></hr>
        </div>

        <section>
          <div className="productsContainerItems">
            {this.state.arrayProducts.map((element) => {
              if (element.node.frontmatter.category === "frutas") {
                return (
                  <div key={element.node.id} className="item">
                    <div>
                      <Link to={element.node.frontmatter.slug}>
                        <GetImage
                          imageName={element.node.frontmatter.imageName}
                          altText={element.node.frontmatter.altText}
                        />
                      </Link>
                      <Link to={element.node.frontmatter.slug}>
                        <span>{element.node.frontmatter.name}</span>
                      </Link>
                      {element.node.frontmatter.formato === "kg" ? (
                        <span>{element.node.frontmatter.price}€/Kg</span>
                      ) : (
                        <span>{element.node.frontmatter.price}€/Ud</span>
                      )}
                    </div>
                    <div className="buttonsDivContainer">
                      <button  onClick={()=>{this.restToLocal(element)}}>-</button>
                      <span>{element.node.frontmatter.agregado}</span>
                      <button onClick={()=>{this.addToLocal(element)}}>+</button>
                    </div>
                  </div>
                );
              } else {
                return "";
              }
            })}
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            altText
            category
            desription
            formato
            imageName
            name
            price
            slug
            title
            agregado
          }
        }
      }
    }
  }
`;
export default Productos;
