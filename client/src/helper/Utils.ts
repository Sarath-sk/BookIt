import { useStep } from "../store/StepContext"

const {prevStep, nextStep} = useStep()

export const handleStep = (type: string)=> {
      if(type === 'DEC'){
        prevStep()
      }else if(type === 'INC'){
        nextStep()
      }
    }