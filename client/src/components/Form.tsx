import { Button, Card, TextField } from "@mui/material";
import NavButtons from "./Buttons";

interface ITicketFormProps {
    handleCurrentStep: (type: string) => void
  }
  

export default function TicketForm({handleCurrentStep}:ITicketFormProps) {

    const handleSubmit = (e:React.FormEvent)=>{
        console.log(e.target)
    }


    return <div className="flex align-middle justify-center m-4">
        
        <form method="POST" style={{ minWidth: 345, display: 'flex', flexDirection: 'column', gap: '2rem', backgroundColor: '#1e293b', padding: '2rem', alignItems: 'center'}}  onSubmit={handleSubmit}>
        <TextField
          color="secondary"
          sx={{label: {color: 'whitesmoke', opacity: '0.6'}, input: {color: "whitesmoke"}}}
          required
          id="outlined-required"
          label="Name"
        />
        <TextField
          required
          sx={{label: {color: 'whitesmoke', opacity: '0.6'}, input: {color: "whitesmoke"}}}
          color="secondary"
          id="outlined-required"
          label="Email"
          type="email"
        />
        <TextField
          required
          sx={{label: {color: 'whitesmoke', opacity: '0.6'}, input: {color: "whitesmoke"}}}
          color="secondary"
          id="outlined-number"
          label="Number of seats"
          type="number"
        />
        <NavButtons handleCurrentStep={handleCurrentStep} />
    </form>
    </div>
}