import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button, Card } from "@mui/material";
import { useStep } from "../store/StepContext";
import { useNavigate } from "react-router";


function PayPalGateWay() {
  const {prevStep} = useStep()
  const navigate = useNavigate()
  const initialOptions = {
    clientId: "test",
    currency: "EUR",
    intent: 'capture'
  };

  return (
    <div className="App">
    <PayPalScriptProvider options={initialOptions}>
        <div className="flex align-middle justify-center m-4">
        <Card sx={{ minWidth: 345, display: 'flex', flexDirection: 'column', padding: '1rem', gap: '2rem' ,backgroundColor: '#1e293b', alignItems: 'center'}}>
            <h2>Please make the payment</h2>
            <PayPalButtons style={{ layout: "vertical", }} />
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
}


export default PayPalGateWay;
