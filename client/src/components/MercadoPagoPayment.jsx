
import { initMercadoPago,Wallet } from '@mercadopago/sdk-react';
initMercadoPago('TEST-007550c9-5b84-46a3-a625-6da5f4ae30ed');
import { Payment } from '@mercadopago/sdk-react';

//TODO: APRENDER A AGREGAR PAGO DEL PRODUCTO CON MERCADO SDK TANTO EN FRONT COMO BACK
export default function MercadoPagoPayment() {
    const initialization = {
        amount: 100,

        preferenceId: 123,
       };
       const customization = {
        paymentMethods: {
          ticket: "all",
          creditCard: "all",
          debitCard: "all",
          mercadoPago: "all",
        },
       };
       const onSubmit = async (
        { selectedPaymentMethod, formData }
       ) => {
        // callback llamado al hacer clic en el botón enviar datos
        return new Promise((resolve, reject) => {
          fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((response) => {
              // recibir el resultado del pago
              resolve();
            })
            .catch((error) => {
              // manejar la respuesta de error al intentar crear el pago
              reject();
            });
        });
       };
       const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
       };
       const onReady = async () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
       };
              
      
    return(
      <>
   <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
       />   
       <Wallet initialization={{ preferenceId: '123' }} />
      </>
    )
}
