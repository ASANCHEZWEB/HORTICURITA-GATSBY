module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./public/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `productos`,
        path: `${__dirname}/src/productos`,
      },
    },
    
  ],
}