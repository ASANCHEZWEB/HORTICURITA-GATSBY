import React from "react";
import { graphql } from "gatsby";
import GetImage from "../components/getImage";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { Link } from "gatsby";
import "../styles/productos.css";
import { getCarrito } from "../components/localStorageService";

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arrayProducts: [], carrito: [] };

    this.getProducts = this.getProducts.bind(this);
    this.getCarrito = this.getCarrito.bind(this);
  }

  getProducts() {
    let productos = [...this.props.data.allMarkdownRemark.edges];
    this.setState({ arrayProducts: productos });
  }
  getCarrito() {
      console.log(getCarrito())
    this.setState({ carrito: getCarrito() });
  }

  componentDidMount() {
    this.getProducts();
    this.getCarrito();
  }
  render() {
    return (
      <>
        <NavBar />
        <h1>Productos</h1>
        <p>sleecciona desde medio kilo o desde una unidad!</p>
        <hr></hr>
        <section>
          <div className="productsContainerItems">
            {this.state.arrayProducts.map((element) => {
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
                </div>
              );
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
          }
        }
      }
    }
  }
`;
export default Productos;
