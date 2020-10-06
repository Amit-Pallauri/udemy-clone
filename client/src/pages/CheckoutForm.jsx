import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const CheckoutForm = () => {
  const publishableKey = "pk_test_51HUEyCDOfBXcEuEsVmMIMEMQrIYISOFotjKzya4LE7mX7P7XxeZjO2wxwK0JTCKhRnMI4xqq4BsTi7Ywalju0Hmz00ockhzAbW";
   
  const onToken = token => {
    const body = {
      amount: 999,
      token: token
    };

    axios
      .post("http://localhost:1234/", body)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log("Payment Error: ", error);
      });
  };

  return (
    <StripeCheckout
      label="Buy the Course" //Component button text
      name="Business LLC" //Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Go Premium" //Submit button in modal
      amount={999} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
    />
  );
};

export default CheckoutForm;