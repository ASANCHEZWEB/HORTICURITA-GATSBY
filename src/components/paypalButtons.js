
import React, { useState, useRef, useEffect } from 'react';



function PaypalButtons(props) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const paypalRef = useRef();


   





  useEffect(() => {
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

    



    
    
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create(objectTwo);
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      }).render(paypalRef.current)
      



    
    },[props]);
    
    




  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought priductos!</h1>
      </div>
    );
  }


  return (
  
    <div>
    
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
    

<div className="prueba" ref={paypalRef}/>

       

      
    </div>
  );
}





export default PaypalButtons
