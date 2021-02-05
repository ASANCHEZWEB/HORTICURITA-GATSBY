module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `productos`,
        path: `${__dirname}/src/productos`,
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["CODIGOSDESCUENTO","IVAS","GASTOSENVIO"]
      },
    }
  ],
}