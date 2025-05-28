import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useReducer, useRef, useState } from "react";
import img from "../assets/kingdom.jpg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { nextStep } from "../store/slices/stepSlice";

export default function AvailableMovie(){
  

  const navigate = useNavigate()
  
  const movies = useSelector((state:RootState) => state.movies.list)
    const dispatch = useDispatch<AppDispatch>();
    console.log('available')


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
        {movies[0].title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Genre: <i>{movies[0].genre}</i>
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Screening Date: <i>{movies[0].screeningDate}</i>
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Available Seats: <strong>{movies[0].availableSeats}</strong>
      </Typography>

    </CardContent>
    <div className="flex align-middle justify-center">
    <Button variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>{
      dispatch(nextStep())
      navigate('/form')}
      }>
  Book Now 
</Button>
    </div>
  </Card>
    </div>
}