// este servicio lo que hace es que te  devuelve un array con la info de todos los productos encontrados segun la categoria de producto que tu pidas,
//por ejemplo si le pasas frutas como props pues traera solo array de frutas para pintarlas dinamicamente en el dom de otro componente


import { useStaticQuery, graphql } from "gatsby"

 let GetProductsService=(props)=> {
    const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              category
              name
              price
              slug
              desription
              imageName
              altText
            }
          }
        }
      }
    }
  `).allMarkdownRemark.edges.filter(element=>{
      return element.node.frontmatter.category===props.category
  })
        
      return data
    }

    export default GetProductsService