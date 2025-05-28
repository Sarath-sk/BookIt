// components/PayPalCheckout.tsx

import React, { useState } from "react";
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
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { prevStep, setStep } from "../store/slices/stepSlice";
import { setTransactions } from "../store/slices/transcationSlice";

const PayPalCheckout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userDetails= useSelector((state:RootState)=>state.users.currentUser)
    const movieDetails= useSelector((state:RootState)=>state.movies.list)
    console.log(userDetails)
    console.log(movieDetails)
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
        createOrder={(
          data: CreateOrderData,
          actions: CreateOrderActions
        ): Promise<string> => {
          return actions.order.create({
              purchase_units: [
                  {
                      amount: {
                          value: `${parseInt(userDetails?.seats? userDetails?.seats: '1') * 20}`,
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
            // alert(`Transaction completed by ${name}`);
            console.log("Transaction Details:", details);
            // goToStep(5)
            // actions.redirect('http://localhost:5173/success')
            dispatch(setTransactions([{id: details?.id || '', movieId: movieDetails[0]._id || '', seatsBooked: parseInt(userDetails?.seats || '1'), timestamp: details.create_time || '' }]))
            dispatch(setStep(5))
            navigate('/success')

          }
        }}
        onError={(err: any) => {
          console.error("PayPal error:", err);
          dispatch(setStep(6))
          navigate('/failed')
          
        }}
      />
            <Button variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>{
              dispatch(prevStep())
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
