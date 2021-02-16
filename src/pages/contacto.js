import React from "react";
import "../styles/contactPage.css";
import GetImage from "../components/getImage"
let Contacto = (props) => {
  return (
    <>
      <div className="contactContainer">
      

<div className="mapAndContact">
<div>
<h1>Contáctanos</h1>
  <p>Si tienes alguna pregunta acerca de nuestros productos o servicios, por favor contacta a través de los siguientes medios, <strong>clickea </strong>sobre ellos<span aria-label="icono guiño" role="img">😉</span>. También nos puedes llamar en horarios de oficina. ¡Respondemos rápido!</p>
  <span>
  Contacto
  </span>
  
  <a className="contactIcons" href="tel:+34641479907"><GetImage imageName="icono-telefono-negro.png" altText="icono telefono negro"/>  641 479 907</a>
  <a className="contactIcons" href="https://api.whatsapp.com/send?phone=34641479907&lang=es"><GetImage imageName="icono-whatsapp.png" altText="icono whatsapp"/>  Whatsapp</a>
  <a className="contactIcons" target="_blank" href="https://www.instagram.com/horticurita.es/" rel="noreferrer"><GetImage imageName="instagram-icono.png" altText="icono instagram"/>Instagram</a>
  <a  className="contactIcons" target="_blank" href="https://www.facebook.com/horticurita.es" rel="noreferrer"><GetImage imageName="icono-facebook.png" altText="icono facebook"/>Facebook</a>
  <a className="contactIcons"  target="_blank" href="https://twitter.com/horticurita_es" rel="noreferrer" > <GetImage imageName="icono-twitter.png" altText="icono twitter"/>Twitter</a>
  <button className="contactIcons"><GetImage imageName="icono-chat.png" altText="icono chat"/>Chat en línea</button>
  
  <span>
  Horario
  </span>
  <p>Lunes-Viernes: 9h - 20:00h</p>
  <p>Sabado-Domingo: 9h - 14:00h</p>
  
</div>
<div>
<span>Ubicación</span>
<p>Calle Caballeros 10, 13120 ,Porzuna,Cdad. Real</p>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.2560159986456!2d-4.157751584642298!3d39.14615827953307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6bb14bc5f87d91%3A0x27a037e3c3460ef0!2sCalle%20Caballeros%2C%2010%2C%2013120%20Porzuna%2C%20Cdad.%20Real!5e0!3m2!1ses!2ses!4v1613476989907!5m2!1ses!2ses"  allowFullScreen="" style={{border:"none",width:"320px",height: "400px"}} title="Mapa ubicación">Mapa ubicación</iframe>
</div>




</div>





      </div>
    </>
  );
};

export default Contacto;
