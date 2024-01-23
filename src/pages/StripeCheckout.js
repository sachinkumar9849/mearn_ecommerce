import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OXnvISDADgYURU2ugUk4C7dsb9FNE8FhIPmFafXCYbYq6Nrt5QmwQSfgFxDb7YrdWaDDdLwqLFCBzOw2hO18GjX00tOwSrKma"
);

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
          }
        );

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [currentOrder.items]);

  const options = {
    // Remove clientSecret from here
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={{ ...options, clientSecret }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
