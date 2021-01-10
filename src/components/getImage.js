import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'

let GetImage =(props)=>{
    const data= useStaticQuery(graphql`
    {
      allImageSharp {
        edges {
          node {
            id
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
    }
  `)
  
   let myImage= data.allImageSharp.edges.filter(element => {
 return(element.node.fluid.originalName === props.imageName)
     
 
    
 })[0].node.fluid


    return(
        
        <Img fluid={myImage} alt={props.altText}/>
    )
}

export default GetImage;