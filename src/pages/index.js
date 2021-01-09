import React from "react";
import NavBar from "../components/navBar";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../styles/home.css";
import { Link } from "gatsby";

let Home = (props) => {
  console.log(props);
  return (
    <>
      <NavBar />
      <section id="sectionTitle">
        <div className="containerTitle">
          <div className="containerGreenText ">
            <h1>¡Somos tu frutería online!</h1>
            <p>¡Fruta , verdura , encurtidos , quesos y mas!</p>
            <span>Envíos en 24/48 horas en toda la península</span>
            <button className="buttonSectionOne animate__animated animate__pulse animate__infinite">
              <Link to="/productos">COMPRAR</Link>
            </button>
          </div>
        </div>
        <Img
          className="titleImage"
          fluid={props.data.file.childImageSharp.fluid}
          alt="frutas y verduras"
        />
      </section>
      <section id="sectionTwoHome">
        <div className="categories">
          <h2>Categorías</h2>
          <hr></hr>
        </div>
        <div className="containerCategories">
          <div className="categoryItem">
            <img alt="frutas gif" src="../images/categoria-frutas.gif"/>
            <span>Frutas</span>
            <p>¡Melones,pitahaya,kiwis,sandías,albaricoques,naranjas,fresas y más!</p>
            <button>Ver frutas</button>
          </div>
          <div className="categoryItem">
            <img alt="verduras gif" src="../images/categoria-verduras.gif"/>
            <span>Verduras</span>
            <p>¡Tomates,lechugas,calabazas,patatas,calabacín y más!</p>
            <button>Ver verduras</button>
          </div><div className="categoryItem">
            <img alt="encurtidos gif" src="../images/categoria-encurtidos.gif"/>
            <span>Encurtidos</span>
            <p>¡Pepinillos en vinagre,cebolla en vinagre,pinchos variados y más!</p>
            <button>Ver encurtidos</button>
          </div><div className="categoryItem">
            <img alt="quesos gif" src="../images/categoria-quesos.gif"/>
            <span>Quesos</span>
            <p>¡Quesos de oveja , de cabra o       mixto en queso entero medio o cuña!</p>
            <button>Ver quesos</button>
          </div>
        </div>
      </section>
    </>
  );
};

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "frutas-verduras.jpg" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Home;
