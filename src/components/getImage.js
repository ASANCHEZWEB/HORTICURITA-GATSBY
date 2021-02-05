import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

let GetImage = (props) => {
 
  const data = useStaticQuery(graphql`
  {
      allImageSharp {
        edges {
          node {
            id
            fluid(quality: 100){
              ...GatsbyImageSharpFluid
              originalName
              base64
              src
              srcSet
              srcSetWebp
              srcWebp
              tracedSVG
              presentationHeight
              presentationWidth
              sizes
              aspectRatio
              originalImg
            }
          }
        }
      }
    }
  `);





  let myImage = data.allImageSharp.edges.filter((element) => {

    return element.node.fluid.originalName === props.imageName;
  })

  if(myImage[0]!==undefined){
    return <Img fluid={myImage[0].node.fluid} alt={props.altText} />;
    
  }else{
    return <p>cargando imagen</p>
  }





    
  
  

  
};

export default GetImage;
