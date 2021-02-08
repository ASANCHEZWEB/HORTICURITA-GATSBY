import React from "react";
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });







function PaypalButtons(props) {

  let arrayItems=props.stateCart.arrayProducts.map((element,index)=>{

    let unitPrice=0;
    let impuestoCalc=0;
    if(element.node.frontmatter.formato==="kilogramos"){
      impuestoCalc=Number(((Number((element.node.frontmatter.price/2).toFixed(2))*props.stateCart.ivas[element.node.frontmatter.category])/100).toFixed(2))
      unitPrice= (element.node.frontmatter.price/2).toFixed(2)
    }else{
      unitPrice=(element.node.frontmatter.price).toFixed(2)
      impuestoCalc=Number(((element.node.frontmatter.price*props.stateCart.ivas[element.node.frontmatter.category])/100).toFixed(2))
    }




      return {
        name: element.node.frontmatter.name,
        description: `IVA (${props.stateCart.ivas[element.node.frontmatter.category]}%)`,
        sku: `${index+=1}`,
        unit_amount: {
          currency_code: "EUR",
          value: unitPrice
        },
        tax: {
          currency_code: "EUR",
          value: `${impuestoCalc}`
        },
        quantity: `${element.node.frontmatter.agregado}`,
        category: "PHYSICAL_GOODS"
      }

    })


let objectTwo={
purchase_units: [{
  reference_id: "PUHF",
  description: "Compra online horticurita.es",

  custom_id: "HORTICURITA",
  soft_descriptor: "Sin descripción",
  amount: {
    currency_code: "EUR",
    value: `${props.stateCart.totalCarrito.total}`,
    breakdown: {
      item_total: {
        currency_code: "EUR",
        value: `${props.stateCart.totalCarrito.subTotal}`
      },
      shipping: {
        currency_code: "EUR",
        value: `${props.stateCart.totalCarrito.gastosEnvio}`
      },
      handling: {
        currency_code: "EUR",
        value: "0"
      },
      tax_total: {
        currency_code: "EUR",
        value: `${props.stateCart.totalCarrito.impuestos}`
      },
      shipping_discount: {
        currency_code: "EUR",
        value: `${props.stateCart.totalCarrito.descuento}`
      }
    }
  },
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
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PaypalButtons