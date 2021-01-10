import React from "react";
import NavBar from "../components/navBar";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../styles/home.css";
import { Link } from "gatsby";
import gifFrutas from "../images/categoria-frutas.gif";
import gifVerduras from "../images/categoria-verduras.gif";
import gifEncurtidos from "../images/categoria-encurtidos.gif";
import gifQuesos from "../images/categoria-quesos.gif";
import {Helmet} from "react-helmet";

let Home = (props) => {
  //console.log(props.data.file.childImageSharp.fluid)
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Horticurita| Comprar fruta , verdura , encurtidos , quesos y mas 24 horas</title>
                <meta name="description" content="fruta y verdura al mejor precio " />
    </Helmet>
      <NavBar />
      <section id="sectionTitle">
        <div className="containerTitle">
          <div className="containerGreenText ">
            <h1>¡Somos tu frutería online!</h1>
            <p>¡Fruta , verdura , encurtidos , quesos y mas!</p>
            <span>Envíos en 24/48 horas en toda la península</span>
            <Link
              className="buttonSectionOne animate__animated animate__pulse animate__infinite"
              to="/productos"
            >
              COMPRAR
            </Link>
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
            <img alt="frutas" src={gifFrutas} />
            <span>Frutas</span>
            <p>
              ¡Melones,pitahaya,kiwis,sandías,albaricoques,naranjas,fresas y
              más!
            </p>
            <button>Ver frutas</button>
          </div>
          <div className="categoryItem">
            <img alt="verduras" src={gifVerduras} />
            <span>Verduras</span>
            <p>¡Tomates,lechugas,calabazas,patatas,calabacín y más!</p>
            <button>Ver verduras</button>
          </div>
          <div className="categoryItem">
            <img alt="encurtidos" src={gifEncurtidos} />
            <span>Encurtidos</span>
            <p>
              ¡Pepinillos en vinagre,cebolla en vinagre,pinchos variados y más!
            </p>
            <button>Ver encurtidos</button>
          </div>
          <div className="categoryItem">
            <img alt="quesos" src={gifQuesos} />
            <span>Quesos</span>
            <p>
              ¡Quesos de oveja , de cabra o mixto en queso entero medio o cuña!
            </p>
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
          base64
          tracedSVG
          srcWebp
          srcSetWebp
          originalImg
          originalName
          sizes
          src
          srcSet
          presentationHeight
          presentationWidth
        }
      }
    }
  }
`;

export default Home;
