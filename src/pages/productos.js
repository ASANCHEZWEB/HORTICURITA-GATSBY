import React from "react";
import GetProductsService from "../components/getProductsService";
import GetImage from "../components/getImage";
import NavBar from "../components/navBar"
import  Footer from "../components/footer"
let Productos = (props) => {
  console.log(GetProductsService({ category: "frutas" }));
  return (
    <>
     
<NavBar/>
      
          <GetImage altText="mierda" imageName="bananas.jpg"/>
              
                
<Footer/>
           
     
    
    </>
  );
};

export default Productos;
