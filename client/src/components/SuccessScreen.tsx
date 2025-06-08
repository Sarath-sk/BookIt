import { Card, CardContent, Typography, Button } from "@mui/material"
// import type { movieDetails } from "../data/movieDetails"
import type { IMovie } from "./interfaces";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { resetStep } from "../store/slices/stepSlice";

const movieDetails: IMovie = {
  title: "Kingdom",
  availableSeats: 100,
  screeningDate: "2025-06-10",
  screeningTime: "19:30",
  theatreLocation: "PVR Cinemas, Delhi",
  genre: "Action"
};

export default function SuccessScreen(){
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const transactionDetails= useSelector((state:RootState)=>state.transactions.list)
    // console.log(transactionDetails)


    return <div className="flex align-middle justify-center m-4">
      <Card sx={{ minWidth: 345, display: 'flex', flexDirection: 'column', padding: '1rem', backgroundColor: '#1e293b'}}>
        <div className="flex align-middle justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 50 50" width="150px" height="150px"><path d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M35.827,16.562 L24.316,33.525l-8.997-8.349c-0.405-0.375-0.429-1.008-0.053-1.413c0.375-0.406,1.009-0.428,1.413-0.053l7.29,6.764l10.203-15.036 c0.311-0.457,0.933-0.575,1.389-0.266C36.019,15.482,36.138,16.104,35.827,16.562z"/></svg>
        </div>
        <div className="flex align-middle justify-center">
            <p className="text-lg font-bold">Payment Successfull</p>
        </div>
    <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '0.4rem'}}>
      <Typography sx={{color: 'whitesmoke', fontWeight: 'bold'}} gutterBottom variant="h5" component="div">
        {movieDetails.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Genre: <i>{movieDetails.genre}</i>
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Screening Date: <i>{movieDetails.screeningDate}</i>
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Screening Time: <i>{movieDetails.screeningTime}</i>
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Booked Seats: <strong>{transactionDetails[0].seatsBooked}</strong>
      </Typography>
       <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Ticket ID: <strong>{transactionDetails[0].id}</strong>
      </Typography>
      

    </CardContent>
    <div className="flex align-middle justify-center">
    <Button variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>{
      dispatch(resetStep())
      navigate('/')}
      }>
  Book Again 
</Button>
    </div>
  </Card>
    </div>
}