import { Card, CardContent, Typography, Button } from "@mui/material"
// import type { movieDetails } from "../data/movieDetails"
import type { IMovie } from "./interfaces";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { nextStep, setStep } from "../store/slices/stepSlice";

const movieDetails: IMovie = {
  title: "Kingdom",
  availableSeats: 100,
  screeningDate: "2025-06-10",
  screeningTime: "19:30",
  theatreLocation: "PVR Cinemas, Delhi",
  genre: "Action"
};

export default function FailureScreen(){
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    return <div className="flex align-middle justify-center m-4">
      <Card sx={{ minWidth: 345, display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', backgroundColor: '#1e293b'}}>
        <div className="flex align-middle justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#dc2f02" width="150px" height="150px"><path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42 C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29 c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29 c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"/></svg>
        </div>
        <div className="flex align-middle justify-center">
            <p className="text-lg font-bold">Payment Failed</p>
        </div>
    <div className="flex align-middle justify-center">
    <Button variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>{
      dispatch(setStep(2))
      navigate('/form')}
      }>
  Try Again 
</Button>
    </div>
  </Card>
    </div>
}