import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import GetImage from "../components/getImage";
import "../styles/productPage.css";
import React, { useEffect, useState,useCallback } from "react";
import {getCarrito,addToLocalStorage, restProduct} from "../components/localStorageService";

let PageProduct = (props) => {
  const [arrayImages, setArrayImages] = useState([]);
  const[productAgregado,setProductAgregado]=useState(0);


let changeImagePos=(imageName,index)=>{
let arrayImageChange=arrayImages.filter((image,indexPos)=>{
  return indexPos !== index
})
arrayImageChange.unshift(imageName)
setArrayImages(arrayImageChange)

}


const innerFunction = useCallback(() => {
  let findProduct=getCarrito().filter((element)=>{
    return element.node.id===props.data.markdownRemark.id
    
      })
if(findProduct.length===1){
  setProductAgregado(findProduct[0].node.frontmatter.agregado)
}else{
  setProductAgregado(0)
}

},[props.data.markdownRemark.id]);



let restProductAction=(productObj)=>{
  restProduct({node:productObj})
  innerFunction()
  
}

let addProductAction=(productObj)=>{
addToLocalStorage({node:productObj})
  innerFunction()

}



  useEffect(() => {
  setArrayImages(props.data.markdownRemark.frontmatter.imageName);
  innerFunction()
  },[props,innerFunction]);

 
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> My Title </title>
      </Helmet>
      <NavBar />
      <div className="productDetailContainer">
        <div className="containerImagesPd">
          <div className="showImage" aria-label = {`Imagen de producto número 1`}>
            <GetImage imageName={arrayImages[0]} altText={props.data.markdownRemark.frontmatter.altText}/>
          </div>
          <div className="sliderImages">
            {arrayImages.map((element, index) => {
              return index > 0 ? <button  key={index} onClick={()=>changeImagePos(element,index)} type="button" aria-label = {`Imagen de producto número ${index+1}`}><GetImage  imageName={element} altText={props.data.markdownRemark.frontmatter.altText}/></button>:""
            })}
          </div>
        </div>
        <div className="prodDetTitle">
          <h1>{props.data.markdownRemark.frontmatter.name}</h1>
          <span>{props.data.markdownRemark.frontmatter.price}{props.data.markdownRemark.frontmatter.formato==="kg"? "€/Kg":"€/Ud"}</span>
          {props.data.markdownRemark.frontmatter.disponible==="si"? <span><GetImage imageName="icono-stock-disponible.png" altText="icono stock disponible"/>Disponible</span>:<span><GetImage imageName="icono-sin-stock.png" altText="icono stock no disponible" />No disponible</span>}
            
            <div className="buttonsProdDet">
              <button onClick={()=>restProductAction(props.data.markdownRemark)}>-</button>
              <span>{props.data.markdownRemark.frontmatter.formato==="kg"?productAgregado/2:productAgregado}</span>
              <button onClick={()=>addProductAction(props.data.markdownRemark)}>+</button>
            </div>
        </div>
        
      </div>
      <div className="productDetDescription">
          <span>Descripción</span>
         <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.frontmatter.desription }}></div>
          
        </div>
      <Footer />
    </>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      frontmatter {
        altText
        category
        desription
        formato
        imageName
        name
        price
        slug
        disponible
        title
        agregado
      }
    }
  }
`;
export default PageProduct;
