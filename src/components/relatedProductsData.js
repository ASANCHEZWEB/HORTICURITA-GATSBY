import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import "../styles/relatedProducts.css"
import GetImage from "../components/getImage"

const RelatedProducts = (props) => {

  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              imageName
              altText
              category
              slug
              disponible
              name
            }
          }
        }
      }
    }
  `)

let arrayProducts = data.allMarkdownRemark.edges.filter((element)=>{
    return element.node.id!==props.idProduct && element.node.frontmatter.category===props.category && element.node.frontmatter.disponible ==="si"
})
let arrayOtherProducts = data.allMarkdownRemark.edges.filter((element)=>{
    return element.node.id!==props.idProduct && element.node.frontmatter.category!==props.category && element.node.frontmatter.disponible ==="si"
})
let arrayFinal = arrayProducts;


do {
    let item = arrayOtherProducts[Math.floor(Math.random() * arrayOtherProducts.length)];
    if(arrayFinal.indexOf(item) < 0){
       arrayFinal.push(item)
    }
  } while (arrayFinal.length < 5);

   

  return (<div className="relatedProdsCont">
{arrayFinal.map((element)=>{
    return <div key={element.node.id}>
    <GetImage imageName={element.node.frontmatter.imageName[0]} altText={element.node.frontmatter.altText}/>
    <span>{element.node.frontmatter.name}</span>
    <Link to={element.node.frontmatter.slug}>Ver producto</Link>
    </div>
})}
  </div>)
}

export default RelatedProducts
