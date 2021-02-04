
import React, { useState, useRef, useEffect } from 'react';


function Product(props) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
      
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              reference_id: "PUHF",
              description: "Compra online horticurita.es",

              custom_id: "HORTICURITA",
              soft_descriptor: "Sin descripción",
              amount: {
                currency_code: "EUR",
                value: "230.00",
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: "180.00"
                  },
                  shipping: {
                    currency_code: "EUR",
                    value: "30.00"
                  },
                  handling: {
                    currency_code: "EUR",
                    value: "10.00"
                  },
                  tax_total: {
                    currency_code: "EUR",
                    value: "20.00"
                  },
                  shipping_discount: {
                    currency_code: "EUR",
                    value: "10"
                  }
                }
              },
              items: [{
                  name: "T-Shirt",
                  description: "Green XL",
                  sku: "sku01",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "90.00"
                  },
                  tax: {
                    currency_code: "EUR",
                    value: "10.00"
                  },
                  quantity: "1",
                  category: "PHYSICAL_GOODS"
                },
                {
                  name: "Shoes",
                  description: "Running, Size 10.5",
                  sku: "sku02",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "45.00"
                  },
                  tax: {
                    currency_code: "EUR",
                    value: "5.00"
                  },
                  quantity: "2",
                  category: "PHYSICAL_GOODS"
                }
              ],
              // shipping: {
              //     method: "United States Postal Service",
              //     address: {
              //         name: {
              //             full_name: "John",
              //             surname: "Doe"
              //         },
              //         address_line_1: "123 Townsend St",
              //         address_line_2: "Floor 6",
              //         admin_area_2: "San Francisco",
              //         admin_area_1: "CA",
              //         postal_code: "94107",
              //         country_code: "ES"
              //     }
              // }
            }]
          });
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
      })
      .render(paypalRef.current);
  }, []);

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
      <div ref={paypalRef} />
    </div>
  );
}





export default Product
