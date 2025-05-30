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
import axios from "axios";

const PayPalCheckout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userDetails= useSelector((state:RootState)=>state.users.currentUser)
    const movieDetails= useSelector((state:RootState)=>state.movies.list)
  const navigate = useNavigate()
//   const initialOptions = {
//     clientId: 'test',
//     currency: "EUR",
//     intent: 'capture'
//   };



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
                          value: `${parseInt(userDetails?.seats? userDetails?.seats: '1') * 20 + 0.5}`,
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
            // console.log("Transaction Details:", details);
            // goToStep(5)
            // actions.redirect('http://localhost:5173/success')
            dispatch(setTransactions([{id: details?.id || '', movieId: movieDetails[0]._id || '', seatsBooked: parseInt(userDetails?.seats || '1'), timestamp: details.create_time || '' }]))
            // await axios.
            try {
  const seatCount = userDetails?.seats;
  const userEmail = userDetails?.email;
  const movieId = movieDetails?.[0]?._id;
  const movieTitle = movieDetails?.[0]?.title;

  if (!seatCount || !userEmail || !movieId || !movieTitle) {
    throw new Error('Missing required booking details');
  }

  const [seatRes, emailRes] = await Promise.all([
    axios.put(`http://localhost:4000/movie/${movieId}/seats`, {
      count: seatCount,
    }),
    axios.post('http://localhost:4000/email/send', {
      email: userDetails.email,
      movieTitle: movieDetails[0].title,
      ticketCount: userDetails.seats,
      screeningDate: movieDetails[0].screeningDate,
      screeningTime: movieDetails[0].screeningTime,
    }),
  ]);

  if (seatRes.status === 200 && emailRes.status === 200) {
    dispatch(setStep(5));
    navigate('/success');
  } else {
    throw new Error('One or more operations failed');
  }
} catch (error) {
  console.error('Booking failed:', error);
  dispatch(setStep(6));
  navigate('/failed');
}

            

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
