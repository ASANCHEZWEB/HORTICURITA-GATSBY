import React from "react"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
let PageProduct=(props)=>{


   
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{props.data.markdownRemark.frontmatter.slug}</h1>
            <h1>{props.data.markdownRemark.frontmatter.name}</h1>
            <h1>{props.data.markdownRemark.frontmatter.price}</h1>
            </div>
        </div>
        </>
      )
}

  




export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        name
        price
      }
    }
  }
`
export default PageProduct;