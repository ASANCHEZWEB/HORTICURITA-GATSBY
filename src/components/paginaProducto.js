import { graphql,Link } from "gatsby";
import { Helmet } from "react-helmet";
import GetImage from "../components/getImage";
import "../styles/productPage.css";
import React, { useEffect, useState,useCallback } from "react";
import {getCarrito,addToLocalStorage, restProduct} from "../components/localStorageService";



let PageProduct = (props) => {
  //GUARDADO DE ESTADOS
  const [arrayImages, setArrayImages] = useState([]);
  const[productAgregado,setProductAgregado]=useState(0);
  const [arrayRelatedFinal, setarrayRelatedFinal] = useState([]);



//CAMBIAR IMAGEN PRINCIPAL POR  UNA DE LAS PEQUEÑAS SELECCIONADA POR EL USUARIO
let changeImagePos=(imageName,index)=>{
let arrayImageChange=arrayImages.filter((image,indexPos)=>{
  return indexPos !== index
})
arrayImageChange.unshift(imageName)
setArrayImages(arrayImageChange)

}

//BUSCAR LA INFORMACION DEL CARRITO PARA VERIFICAR LA CANTIDAD YA AÑADADIDA(SI LA HAY) Y ASI ACTUALIZARLO
const getCarroData = useCallback(() => {
  let findProduct=getCarrito().filter((element)=>{
    return element.node.id===props.data.markdownRemark.id
    
      })
if(findProduct.length===1){
  setProductAgregado(findProduct[0].node.frontmatter.agregado)
}else{
  setProductAgregado(0)
}

},[props.data.markdownRemark.id]);


//FUNCION QUE EJECUTA OTRA DE LOCALSTORAJE PARA RESTAR 1  A LA CANTIDAD DEL PRODCUCTO EN CARRITO
let restProductAction=(productObj)=>{
  restProduct({node:productObj})
  getCarroData()
  
}
//FUNCION QUE EJECUTA OTRA DE LOCALSTORAJE PARA SUMAR 1  A LA CANTIDAD DEL PRODCUCTO EN CARRITO
let addProductAction=(productObj)=>{
addToLocalStorage({node:productObj})
getCarroData()

}
//CREACION DE UN ARRAY DE ESTADO CON 5 PRODUCTOS ALEATORIOS DE LA MISMA CATEGORIA Y EN CASO DE NO HABER MAS DE 5 DE UNA CATEGORIA , METE PRODUCTOS DE OTRAS .
const getRelatedData = useCallback(() => {
  let arrayProducts = props.data.allMarkdownRemark.edges.filter((element)=>{
    return element.node.id!==props.data.markdownRemark.id && element.node.frontmatter.category===props.data.markdownRemark.frontmatter.category && element.node.frontmatter.disponible ==="si"
})
 let arrayOtherProducts = props.data.allMarkdownRemark.edges.filter((element)=>{
  return element.node.id!==props.data.markdownRemark.id && element.node.frontmatter.category!==props.data.markdownRemark.frontmatter.category && element.node.frontmatter.disponible ==="si"
 })

if(arrayProducts.length>=5){
let arraySelect = []
do {
  let item = arrayProducts[Math.floor(Math.random() * arrayProducts.length)];
  if(arraySelect.indexOf(item) < 0){
    arraySelect.push(item)
  }
} while (arraySelect.length < 5);
  setarrayRelatedFinal(arraySelect)
}
if(arrayProducts.length<5){
  let concatedArrays=arrayProducts.concat(arrayOtherProducts);
  let arraySelect = [...arrayProducts];

  if(concatedArrays.length<=5){
    setarrayRelatedFinal(concatedArrays)
  }else{
    do {
      let item = arrayOtherProducts[Math.floor(Math.random() * arrayOtherProducts.length)];
      if(arraySelect.indexOf(item) < 0){
        arraySelect.push(item)
      }
    } while (arraySelect.length < 5);
      setarrayRelatedFinal(arraySelect)
  }
}

},[props.data.allMarkdownRemark.edges,props.data.markdownRemark.frontmatter.category,props.data.markdownRemark.id]);



//ESTE HOOK DE EFECTO , SE EJECUTA DESPUES DEL RENDER Y GUARDA EL ARRAY DE IMAGENES EN EL ESTADO , 
//OBTIENE DATOS DEL CARRO(SI LO HAY) Y GENERA PRODUCTOS RELACIONADOS.
useEffect(() => {
  setArrayImages(props.data.markdownRemark.frontmatter.imageName);
  getCarroData()
  getRelatedData()
}, [getCarroData,props.data.markdownRemark.frontmatter.imageName,getRelatedData]);
 

 
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> My Title </title>
      </Helmet>
   
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
          <span>{props.data.markdownRemark.frontmatter.price}{props.data.markdownRemark.frontmatter.formato==="kilogramos"? "€/Kg":"€/Ud"}</span>
          {props.data.markdownRemark.frontmatter.disponible==="si"? <span><GetImage imageName="icono-stock-disponible.png" altText="icono stock disponible"/>Disponible</span>:<span><GetImage imageName="icono-sin-stock.png" altText="icono stock no disponible" />No disponible</span>}
            
            <div className="buttonsProdDet">
              <button onClick={()=>restProductAction(props.data.markdownRemark)}>-</button>
              <span>{props.data.markdownRemark.frontmatter.formato==="kilogramos"?productAgregado/2:productAgregado}</span>
              <button  className={productAgregado===0?"animate__animated animate__heartBeat animate__repeat-2":""} onClick={()=>addProductAction(props.data.markdownRemark)}>+</button>
            </div>
        </div>
        
      </div>
      {props.data.markdownRemark.frontmatter.desription!==""?<div className="productDetDescription">
          <span>Descripción</span>
          <hr></hr>
          <hr></hr>
         <div className="divDescriptionProd" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.frontmatter.desription }}></div>
        </div>:""}
      
<div className="relatedProducts">
<span>Productos relacionados</span>
<div className="relatedProdsCont">
{arrayRelatedFinal.map((element)=>{
    return <div key={element.node.id}>
    <Link to={element.node.frontmatter.slug}> <GetImage imageName={element.node.frontmatter.imageName[0]} altText={element.node.frontmatter.altText}/></Link>
    <span>{element.node.frontmatter.name}</span>
    <Link to={element.node.frontmatter.slug}>Ver producto</Link>
    </div>
})}
  </div>
</div>


    
    </>
  );
};


//PEDIMOS LA INFORMACION DEL PRODUCTO EN CONCRETO Y TAMBIEN DE TODOS LOS PRODUCTOS PARA GENERAL LOS DATOS DE PRODCUCTOS RELACIONADOS
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
    },
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
`;



export default PageProduct;
