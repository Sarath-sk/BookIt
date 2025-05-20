// components/PayPalCheckout.tsx

import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { Button, Card } from "@mui/material";
import { useStep } from "../store/StepContext";
import { useNavigate } from "react-router";

const PayPalCheckout: React.FC = () => {
    const {prevStep} = useStep()
  const navigate = useNavigate()
  const initialOptions = {
    clientId: 'test',
    currency: "EUR",
    intent: 'capture'
  };

  return (
        <div className="App">
    <PayPalScriptProvider options={{
    clientId: 'test',
    currency: "EUR",
    intent: 'capture'
  }}>
        <div className="flex align-middle justify-center m-4">
        <Card sx={{ minWidth: 345, display: 'flex', flexDirection: 'column', padding: '1rem', gap: '2rem' ,backgroundColor: '#1e293b', alignItems: 'center'}}>
            <h2>Please make the payment</h2>
            <PayPalButtons
        style={{ layout: "vertical" }}
        forceReRender={["10.00", "USD"]}
        createOrder={(
          data: CreateOrderData,
          actions: CreateOrderActions
        ): Promise<string> => {
          return actions.order.create({
              purchase_units: [
                  {
                      amount: {
                          value: "10.00", // Static amount
                          currency_code: "EUR"
                      },
                  },
              ],
              intent: "CAPTURE"
          });
        }}
        onApprove={async (
          data: OnApproveData,
          actions: OnApproveActions
        ) => {
          const details = await actions.order?.capture();
          if (details) {
            const name = details.payer?.name?.given_name;
            alert(`Transaction completed by ${name}`);
            console.log("Transaction Details:", details);
          }
        }}
        onError={(err: any) => {
          console.error("PayPal error:", err);
        }}
      />
            <Button variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>{
              prevStep()
              navigate('/summary')
            }}>
Previous
</Button>
            </Card>
            
        </div>
        </PayPalScriptProvider>
        </div>
      
  );
};

export default PayPalCheckout;
