import React from "react";
import NavBar from "../components/navBar";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../styles/home.css";
let Home =(props)=>{

console.log(props)
    return (
      <>

    <NavBar />
    <section><Img
        fluid={props.data.file.childImageSharp.fluid}
        alt="frutas y verduras"
      /></section>
    
    </>
    )
  
}

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "frutas-y-verduras.jpg" }) {
      childImageSharp {
        fluid{
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`


export default Home;
