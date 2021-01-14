import React from "react";
import GetProductsService from "../components/getProductsService";
import GetImage from "../components/getImage";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { Link } from "gatsby";
import "../styles/productos.css";

let Productos = (props) => {
  console.log(GetProductsService({ category: "frutas" }));
  return (
    <>
      <NavBar />
      <h1>Productos</h1>
      <p>sleecciona desde medio kilo o desde una unidad!</p>
      <hr></hr>
      <section>
        <div className="productsContainerItems">
          {GetProductsService({ category: "frutas" }).map((element) => {
            return (
              <div key={element.node.id} className="item">
              <div>
                <Link to={element.node.frontmatter.slug}>
                  <GetImage altText={element.node.frontmatter.altText} imageName={element.node.frontmatter.imageName} />
                </Link>
                <Link to={element.node.frontmatter.slug}>
                    <span>{element.node.frontmatter.name}</span>
                </Link>
                {element.node.frontmatter.formato ==="kg" ? <span>{element.node.frontmatter.price}€/Kg</span> : <span>{element.node.frontmatter.price}€/Ud</span>}
                </div>

              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Productos;
