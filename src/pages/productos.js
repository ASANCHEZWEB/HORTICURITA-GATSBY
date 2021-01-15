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

    this.getProducts = this.getProducts.bind(this);
    this.getCarritoData = this.getCarritoData.bind(this);
    this.addToLocal = this.addToLocal.bind(this);
    this.restToLocal=this.restToLocal.bind(this);
  }

  getProducts() {
    let productos = [...this.props.data.allMarkdownRemark.edges];
    this.setState({ arrayProducts: productos });
    return productos
  }
  
  getCarritoData() {

    let arrayCarritoLS = getCarrito();
    let arrayState = this.getProducts();

    let newArrayState = arrayState.map((elementState) => {
      let producto = elementState;
      arrayCarritoLS.forEach((element) => {
        if (element.node.id === elementState.node.id) {
          producto = element;
        }
      })
      return producto
    })
    this.setState({arrayProducts: newArrayState})
  }

  addToLocal(product){
    addToLocalStorage(product)
    this.getCarritoData()
    
  }

  restToLocal(product){
    restProduct(product)
    
  }

  componentDidMount() {
    this.getProducts();
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
