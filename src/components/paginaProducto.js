import React from "react"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
let PageProduct=(props)=>{


   
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <meta name="robots" content="noindex" />
            </Helmet>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{props.data.markdownRemark.frontmatter.slug}</h1>
           
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
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        number
      }
    }
  }
`
export default PageProduct;