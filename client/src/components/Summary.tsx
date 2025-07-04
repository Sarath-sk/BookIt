import { Button, Card, Divider } from "@mui/material";
import type { IFormData } from "./interfaces";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { nextStep, prevStep } from "../store/slices/stepSlice";

interface ISummaryProps {
    formData: IFormData;
}

export default function Summary({formData}: ISummaryProps){
    const dispatch = useDispatch<AppDispatch>();
    const userDetails= useSelector((state:RootState)=>state.users.currentUser)
    
    const navigate = useNavigate()
    const platformFee = 0.5;

//     const handlePayment = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     //   window.location.href = "http://localhost:8000/payment";
//   };

//     const handlePayment = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get("http://localhost:8000/payment");
//       if (res && res.data) {
//         window.location.href = res.data.links[1].href;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };


    return <div className="flex align-middle justify-center m-4">   
    <Card sx={{ minWidth: 345, display: 'flex', flexDirection: 'column', gap: '2rem', backgroundColor: '#1e293b', padding: '2rem', alignItems: 'center'}}>
    <h4>Summary</h4>
    <div className="flex flex-col align-middle w-full gap-3">
        <div className="flex align-middle justify-between w-full">
            <div className="flex flex-col align-top justify-start"><span>Ticket/s Price</span><span className="text-xs opacity-75">{formData.seats} x 120$</span></div>
            <span>${parseInt(userDetails?.seats || '1') * 20}</span>
        </div>
        <Divider sx={{backgroundColor: 'whitesmoke', opacity: '0.7'}} />
        <div className="flex align-middle justify-between w-full">
            <span>Platform fee</span>
            <span>${platformFee}</span>
        </div>
        <Divider sx={{backgroundColor: 'whitesmoke', opacity: '0.7'}} />
        <div className="flex align-middle justify-between w-full">
            <span>Total Price</span>
            <span>${parseInt(userDetails?.seats || '1') * 20 + platformFee}</span>
        </div>
    </div>
    <div className="flex align-middle justify-around w-full">
<Button variant="outlined" sx={{color: '#9c27b0', outlineColor: 'whitesmoke', ":focus": {outlineColor: 'whitesmoke'}}} onClick={()=>{
    dispatch(prevStep())
    navigate('/form')
}}>
Previous
</Button>
    <Button type="button" variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>{dispatch(nextStep()); navigate('/payment')}}>Proceed to Pay</Button>
    </div>
    </Card>
    </div>
}