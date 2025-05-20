import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { movieDetails } from "../data/movieDetails";
import { useNavigate } from "react-router";
import { useStep } from "../store/StepContext";



export default function AvailableMovie(){

  const navigate = useNavigate()
  const { nextStep } = useStep();

    return <div className="flex align-middle justify-center m-4">
      <Card sx={{ minWidth: 345, display: 'flex', flexDirection: 'column', padding: '1rem', backgroundColor: '#1e293b'}}>
    <CardMedia
      className="rounded"
      component="img"
      alt="green iguana"
      sx={{height: '16rem'}}
      image={movieDetails.imgURL}
    />
    <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
      <Typography sx={{color: 'whitesmoke', fontWeight: 'bold'}} gutterBottom variant="h5" component="div">
        {movieDetails.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Genre: <i>{movieDetails.genre}</i>
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Screening Date: <i>{movieDetails.date}</i>
      </Typography>
      <Typography variant="body2" sx={{ color: 'whitesmoke', opacity: '0.7' }}>
        Available Seats: <strong>{movieDetails.availaility}</strong>
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