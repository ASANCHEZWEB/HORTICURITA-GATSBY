import React from "react"
import GetImage from "../components/getImage";
import "../styles/nosotros.css"

let SobreNosotros =(props)=>{





    return(
        <>
        <div className="containerNosotros">
  <div className="containerTitleNos"><h1>¿Quienes somos? | Horticurita</h1>
  <p>Somos un grupo de autónomos enfocados en cultivar productos de terreno de alta calidad ofreciendo precios altamente competitivos a nuestros clientes.En horticurita.es no utilizamos abonos artificiales para el cultivo de fruta , verdura y hortalizas .Además de productos de cultivo propio como la fruta y verdura , también colaboramos con distintas empresas  para ofrecer aun más variedad de productos a nuestros clientes, todos probados antes de su publicación en la web para asegurar la maxima calidad de producto con las mejores garantías. <span role="img" aria-label="emoji guiño">😉</span></p>
  <GetImage imageName="huerta.jpg" altText="huerta"/>
  </div>
  <div className="containerCalidadNos">
  <div>
  <h2>Calidad</h2>
  <p> En horticurita nos esforzamos por que nuestros clientes tengan un producto de alta calidad.Cultivamos productos de terreno como se ha cultivado toda la vida sin usar abonos artificiales o alteraciones de producto. Te comes un producto de verdad , con sabor auténtico.<span role="img" aria-label="emoji guiño">👌🏻</span></p>
  </div>
      <GetImage imageName="imagenes-horticurita.png" altText="collage de frutas"/>
  </div>
  <div className="embedMapNos">
      <h3>¿Donde estamos?</h3>
      <p>Estamos ubicados en Calle caballeros 10 , Porzuna, 13120 , Ciudad Real</p>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.2560159986456!2d-4.157751584642298!3d39.14615827953307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6bb14bc5f87d91%3A0x27a037e3c3460ef0!2sCalle%20Caballeros%2C%2010%2C%2013120%20Porzuna%2C%20Cdad.%20Real!5e0!3m2!1ses!2ses!4v1613323504277!5m2!1ses!2ses"  frameborder="0" allowfullscreen="" title="Calle Caballeros 10, Porzuna,13120, Ciudad real"></iframe>
  </div>
        </div>
        </>
    )
}

export default SobreNosotros