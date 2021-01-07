import React from "react";
import NavBar from "../components/navBar";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../styles/home.css";
let Home = (props) => {
  console.log(props);
  return (
    <>
      <NavBar />
      <section>
        <div className="containerTextHeader">
          <div className="containerTitleText">
            <h1>¡Somos tu frutería online!</h1>
          </div>
          <div className="containerTitleText">
            <h1>¡Somos tu frutería online!</h1>
          </div>
          <div className="containerTitleText">
            <h1>¡Somos tu frutería online!</h1>
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
