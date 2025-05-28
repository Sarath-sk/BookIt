import { Button, Card, TextField } from "@mui/material";
import type { IFormData } from "./interfaces";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { nextStep, prevStep } from "../store/slices/stepSlice";
import { setUser } from "../store/slices/userSlice";

interface ITicketFormProps {
    handleForm: (data:IFormData) => void;
  }
  

export default function TicketForm2({handleForm}:ITicketFormProps) {
  const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        console.log(formData.get("name"))
        console.log(formData.get("email"))
        console.log(formData.get("seats"))
        const payload:IFormData = {
            name: formData.get("name")?.toString() || "",
            email: formData.get("email")?.toString() || "",
            seats: formData.get("seats")?.toString() || ""
        }
        handleForm(payload)
        dispatch(setUser(payload))
        dispatch(nextStep())
        navigate('/summary')
    }

    


    return <div className="flex align-middle justify-center m-4">
        <Card style={{ minWidth: 345, display: 'flex', flexDirection: 'column', gap: '2rem', backgroundColor: '#1e293b', padding: '2rem', alignItems: 'center'}}>
        <h4>Fill the form with correct details</h4>
        <form onSubmit={handleSubmit} className="flex flex-col align-middle justify-center gap-3">
        <TextField
          color="secondary"
          name="name"
          sx={{label: {color: 'whitesmoke', opacity: '0.6'}, input: {color: "whitesmoke"}}}
          required
          id="outlined-required"
          label="Name"
        />
        <TextField
          required
          name="email"
          sx={{label: {color: 'whitesmoke', opacity: '0.6'}, input: {color: "whitesmoke"}}}
          color="secondary"
          id="outlined-required"
          label="Email"
          type="email"
        />
        <TextField
          required
          name="seats"
          sx={{label: {color: 'whitesmoke', opacity: '0.6'}, input: {color: "whitesmoke"}}}
          color="secondary"
          id="outlined-number"
          label="Number of seats"
          type="number"
        />
        <div className="flex align-middle justify-around w-full">
        <Button variant="outlined" sx={{color: '#9c27b0', outlineColor: 'whitesmoke', ":focus": {outlineColor: 'whitesmoke'}}} onClick={()=>{
          dispatch(prevStep())
          navigate('/')
          }}>
Previous
</Button>
        <Button type='submit' variant="contained" sx={{backgroundColor: '#9c27b0'}}>Next</Button>
        </div>
        </form>
    </Card>
    </div>
}