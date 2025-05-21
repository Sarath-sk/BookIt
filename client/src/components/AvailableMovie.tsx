import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useStep } from "../store/StepContext";
import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import type { IFormData, IMovie } from "./interfaces";
import img from "../assets/kingdom.jpg";

const sampleMovie: IMovie = {
  title: "Kingdom",
  availableSeats: 100,
  screeningDate: "2025-06-10",
  screeningTime: "19:30",
  theatreLocation: "PVR Cinemas, Delhi",
  genre: "Action"
};

export default function AvailableMovie(){
  

  const navigate = useNavigate()
  const { nextStep } = useStep();
  const [movieDetails, setMovieDetails] = useState<IMovie>(sampleMovie)
  
     useEffect(()=>{
        async function fetchDetails() {
          axios.get('http://localhost:4000/movie').then(res=>res.data).then(data=>{
            console.log(data.data)
            if(Array.isArray(data.data))
              setMovieDetails(data.data[0])
        })
          
        }
        fetchDetails()
      }, [])

  


    return <div className="flex align-middle justify-center m-4">
      <Card sx={{ minWidth: 345, display: 'flex', flexDirection: 'column', padding: '1rem', backgroundColor: '#1e293b'}}>
    <CardMedia
      className="rounded"
      component="img"
      alt="green iguana"
      sx={{height: '16rem'}}
      image={img}
    />
    <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
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
        Available Seats: <strong>{movieDetails.availableSeats}</strong>
      </Typography>

    </CardContent>
    <div className="flex align-middle justify-center">
    <Button variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>{
      nextStep()
      navigate('/form')}
      }>
  Book Now 
</Button>
    </div>
  </Card>
    </div>
}