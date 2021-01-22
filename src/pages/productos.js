import React from "react";
import { graphql } from "gatsby";
import GetImage from "../components/getImage";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { Link } from "gatsby";
import "../styles/productos.css";
import { addToLocalStorage,restProduct,filtrarPorDisponibles } from "../components/localStorageService";
import {Helmet} from "react-helmet";

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arrayProducts: [] };

    this.getCarritoData = this.getCarritoData.bind(this);
    this.addToLocal = this.addToLocal.bind(this);
    this.restToLocal=this.restToLocal.bind(this);
    
  }

  
    
  
  getCarritoData() {
    this.setState({arrayProducts:filtrarPorDisponibles(this.props.data.allMarkdownRemark.edges)})
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
      <Helmet>
<meta charSet="utf-8" />
<title>Horticurita| Productos</title>
<meta name="description" content="¡Compra desde medio kilo o por unidad!" />
</Helmet>
        <NavBar />
        <div className="headerContainerTextProducts">
        <GetImage imageName="frutas-page-background.jpg" altText="frutas y verduras"/>
        <div> 
        <h1>Productos</h1>
        <p>Compra frutas , verduras , encurtidos , quesos y más .Puedes ver todo nuestro catálogo completo en esta página o si lo prefieres , ¡navega por nuestro menú clickeando<button onClick={()=>{document.querySelector('.buttonMenu').click();document.querySelector('.buttonProducts').click()}}>AQUÍ</button>!</p>
       </div>
         
        </div>

        <section>
        <div className="headerContainerTextProducts">
          <h2>Frutas</h2>
          <hr></hr>
          <p>Comprar fruta a domicilio</p>
        
        </div>


          <div className="productsContainerItems">
            {this.state.arrayProducts.map((element) => {
              if (element.node.frontmatter.category === "frutas") {
                return (
                  <div key={element.node.id} className="item">
                    <div>
                      <Link to={element.node.frontmatter.slug}>
                        <GetImage
                          imageName={element.node.frontmatter.imageName[0]}
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
                      {element.node.frontmatter.disponible==="si"? <span><GetImage
                          imageName="icono-stock-disponible.png"
                          altText="icono stock disponible"
                        />Disponible</span>:<span><GetImage
                          imageName="icono-sin-stock.png"
                          altText="icono stock no disponible"
                        />No disponible</span>}
                    </div>
                    <div className="buttonsDivContainer">
                      <button  onClick={()=>{this.restToLocal(element)}}>-</button>
                      <span>{element.node.frontmatter.formato==="kg"?element.node.frontmatter.agregado/2:element.node.frontmatter.agregado}</span>
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
        <section>
        <div className="headerContainerTextProducts">
          <h2>Verduras</h2>
          <hr></hr>
          <p>Comprar verduras a domicilio</p>
        
        </div>


          <div className="productsContainerItems">
            {this.state.arrayProducts.map((element) => {
              if (element.node.frontmatter.category === "verduras") {
                return (
                  <div key={element.node.id} className="item">
                    <div>
                      <Link to={element.node.frontmatter.slug}>
                        <GetImage
                          imageName={element.node.frontmatter.imageName[0]}
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
                      {element.node.frontmatter.disponible==="si"? <span><GetImage
                          imageName="icono-stock-disponible.png"
                          altText="icono stock disponible"
                        />Disponible</span>:<span><GetImage
                          imageName="icono-sin-stock.png"
                          altText="icono stock no disponible"
                        />No disponible</span>}
                    </div>
                    <div className="buttonsDivContainer">
                      <button  onClick={()=>{this.restToLocal(element)}}>-</button>
                      <span>{element.node.frontmatter.formato==="kg"?element.node.frontmatter.agregado/2:element.node.frontmatter.agregado}</span>
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
        <section>
        <div className="headerContainerTextProducts">
          <h3>Encurtidos</h3>
          <hr></hr>
          <p>Comprar encurtidos a domicilio</p>
        
        </div>


          <div className="productsContainerItems">
            {this.state.arrayProducts.map((element) => {
              if (element.node.frontmatter.category === "encurtidos") {
                return (
                  <div key={element.node.id} className="item">
                    <div>
                      <Link to={element.node.frontmatter.slug}>
                        <GetImage
                          imageName={element.node.frontmatter.imageName[0]}
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
                      {element.node.frontmatter.disponible==="si"? <span><GetImage
                          imageName="icono-stock-disponible.png"
                          altText="icono stock disponible"
                        />Disponible</span>:<span><GetImage
                          imageName="icono-sin-stock.png"
                          altText="icono stock no disponible"
                        />No disponible</span>}
                    </div>
                    <div className="buttonsDivContainer">
                      <button  onClick={()=>{this.restToLocal(element)}}>-</button>
                      <span>{element.node.frontmatter.formato==="kg"?element.node.frontmatter.agregado/2:element.node.frontmatter.agregado}</span>
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
        <section>
        <div className="headerContainerTextProducts">
          <h4>Quesos</h4>
          <hr></hr>
          <p>Comprar quesos a domicilio</p>
        
        </div>


          <div className="productsContainerItems">
            {this.state.arrayProducts.map((element) => {
              if (element.node.frontmatter.category === "quesos") {
                return (
                  <div key={element.node.id} className="item">
                    <div>
                      <Link to={element.node.frontmatter.slug}>
                        <GetImage
                          imageName={element.node.frontmatter.imageName[0]}
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
                      {element.node.frontmatter.disponible==="si"? <span><GetImage
                          imageName="icono-stock-disponible.png"
                          altText="icono stock disponible"
                        />Disponible</span>:<span><GetImage
                          imageName="icono-sin-stock.png"
                          altText="icono stock no disponible"
                        />No disponible</span>}
                    </div>
                    <div className="buttonsDivContainer">
                      <button  onClick={()=>{this.restToLocal(element)}}>-</button>
                      <span>{element.node.frontmatter.formato==="kg"?element.node.frontmatter.agregado/2:element.node.frontmatter.agregado}</span>
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
            disponible
            title
            agregado
          }
        }
      }
    }
  }
`;
export default Productos;
