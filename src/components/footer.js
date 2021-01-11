import React from "react";
import "../styles/footer.css"
import GetImage from "../components/getImage"
import { Link } from "gatsby"
let Footer =(props)=>{




    return(
        <footer>
        <div className="contactoFooter">
        <span>Contacto</span>
        <div>
              <a href="tel:+34612345678">
                  <GetImage imageName="icono-telefono-negro.png" altText="icono telefono negro"/>
                  Teléfono
              </a>
              <a href="https://api.whatsapp.com/send?phone=34612345678">
                  <GetImage imageName="icono-whatsapp.png" altText="icono whatsapp"/>
                  Whatsapp
              </a>
             <button>
             <GetImage imageName="icono-chat.png" altText="icono chat"/>
             Chat en línea
             </button></div>
            
        </div>
        <div className="contactoFooter">
        <span>Redes sociales</span>
        <div>
        <a target="_blank" href="https://www.instagram.com/horticurita.es/" rel="noreferrer">
                  <GetImage imageName="instagram-icono.png" altText="icono instagram"/>
                  Instagram
              </a>
              <a target="_blank" href="https://www.facebook.com/Horticurita-110947830690065" rel="noreferrer">
                  <GetImage imageName="icono-facebook.png" altText="icono facebook"/>
                  Facebook
              </a>
              <a  target="_blank" href="https://twitter.com/horticurita.es" rel="noreferrer" >
                  <GetImage imageName="icono-twitter.png" altText="icono twitter"/>
                  Twitter
              </a>
              
            </div>
            
        </div>
        <div className="categoriesFooter">
        <span>Categorías</span>
        <div>
        <ul>
            <li><Link to="/frutas">Frutas</Link></li>
            <li><Link to="/verduras">Verduras</Link></li>
            <li><Link to="/encurtidos">Encurtidos</Link></li>
            <li><Link to="/quesos">Quesos</Link></li>
        </ul>
            </div>
        </div>
        <div className="informacionFooter">
        <span>Información</span>
        <div>
        <ul>
            <li><Link to="/aviso-legal">Aviso legal</Link></li>
            <li><Link to="/politica-de-privacidad-y-cookies">Política de privacidad y cookies</Link></li>
            <li><Link to="/condiciones-generales">Condiciones generales</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
        </ul>
            </div>
        </div>
      </footer>
    )
}


export default Footer