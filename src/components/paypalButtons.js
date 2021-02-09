import React from "react";
import ReactDOM from "react-dom"









function PaypalButtons(props) {
  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

  
  let subTotal=0;
  let totalTax=0;
  
  let nombre="";

  let arrayItems=props.stateCart.arrayProducts.map((element,index)=>{

subTotal+=element.node.frontmatter.price*element.node.frontmatter.agregado;
totalTax+=Number(((element.node.frontmatter.price*props.stateCart.ivas[element.node.frontmatter.category])/100).toFixed(2))*element.node.frontmatter.agregado;

if(element.node.frontmatter.formato==="kilogramos"){
  nombre=`${element.node.frontmatter.name} (0.5 Kgs)`
}else{
  nombre=`${element.node.frontmatter.name} (1 Ud)`
}

    return {
      name: nombre,
      description: `IVA (${props.stateCart.ivas[element.node.frontmatter.category]}%)`,
      sku: `${index+=1}`,
      unit_amount: {
        currency_code: "EUR",
        value: element.node.frontmatter.price
      },
      tax: {
        currency_code: "EUR",
        value: ((element.node.frontmatter.price*props.stateCart.ivas[element.node.frontmatter.category])/100).toFixed(2)
      },
      quantity: element.node.frontmatter.agregado,
      category: "PHYSICAL_GOODS"
    }
  })

  let total=(subTotal+totalTax+props.stateCart.totalCarrito.gastosEnvio)-props.stateCart.totalCarrito.descuento;









let objectTwo={
purchase_units: [{
  reference_id: "PUHF",
  description: "Compra online horticurita.es",

  custom_id: "HORTICURITA",
  soft_descriptor: "Sin descripción",
  amount: {
    currency_code: "EUR",
    value: total.toFixed(2),
    breakdown: {
      item_total: {
        currency_code: "EUR",
        value: subTotal.toFixed(2)
      },
      shipping: {
        currency_code: "EUR",
        value: props.stateCart.totalCarrito.gastosEnvio
      },
      handling: {
        currency_code: "EUR",
        value: "0"
      },
      tax_total: {
        currency_code: "EUR",
        value: totalTax.toFixed(2)
      },
      shipping_discount: {
        currency_code: "EUR",
        value: props.stateCart.totalCarrito.descuento
      }
    }
  },
  //primero calcular el impuesto por cada articulo del array haciendo tax.value * quantity
  items: arrayItems
}]
}

console.log(objectTwo)

  const createOrder = (data, actions) =>{
    return actions.order.create(objectTwo);
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
<>
<PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />

    
    </>
  );
}

export default PaypalButtons