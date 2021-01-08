import React from "react";
import NavBar from "../components/navBar";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../styles/home.css";
import { Link } from "gatsby"

let Home = (props) => {
  return (
    <>
      <NavBar />
      <section id="sectionTitle">
        <div class="containerTitle">
          <div className="containerGreenText">
            <h1>¡Somos tu frutería online!</h1>
            <p>¡Fruta , verdura , encurtidos , quesos y mas!</p>
            <span>Envíos en 24/48 horas en toda la península</span>
            <button className="buttonSectionOne"><Link to="/productos">COMPRAR</Link></button>
          </div>
        </div>
        <Img
          className="titleImage"
          fluid={props.data.file.childImageSharp.fluid}
          alt="frutas y verduras"
        />
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
