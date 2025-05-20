import { Button } from "@mui/material";

interface INavButtonsProps {
    nextBtnText?: string;
    handleCurrentStep: (type: string) => void
  }

export default function NavButtons({handleCurrentStep, nextBtnText}: INavButtonsProps){
    return <div className="flex align-middle justify-around w-full">
    <Button variant="outlined" sx={{color: '#9c27b0', outlineColor: 'whitesmoke', ":focus": {outlineColor: 'whitesmoke'}}} onClick={()=>handleCurrentStep("DEC")}>
Previous
</Button>
<Button type="button" variant="contained" sx={{backgroundColor: '#9c27b0'}} onClick={()=>handleCurrentStep("INC")}>
{nextBtnText ? nextBtnText: "Next"}
</Button>
    </div>
}