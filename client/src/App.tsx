import { useState } from 'react'
import AvailableMovie from './components/AvailableMovie'
import Summary from './components/Summary';
import TicketForm2 from './components/Form2';
import type { IFormData } from './components/interfaces';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Main } from './components/Main';
import { StepProvider } from './store/StepContext';
import ProtectedRoute from './helper/ProtectedRoute';
import PayPalCheckout from './components/PayPalGateWay2';
const defaultFormData: IFormData = {
  name: "",
  email: "",
  seats: ""
}


function App() {
  const [formData, setFormData] = useState<IFormData>(defaultFormData)


  const handleForm = (data: IFormData) => {
    setFormData(data)
  }


  return (
    <StepProvider>
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Main><AvailableMovie /></Main>} />
        
          <Route path='/form' element={<ProtectedRoute requiredStep={2}><Main><TicketForm2 handleForm={handleForm}/></Main></ProtectedRoute>} />
        
        <Route path='/summary' element={<ProtectedRoute requiredStep={3}><Main><Summary formData={formData}/></Main></ProtectedRoute>} />
        <Route path='/payment' element={<ProtectedRoute requiredStep={4}><Main><PayPalCheckout /></Main></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute requiredStep={5}><Main><div>Success</div></Main></ProtectedRoute>} />
        <Route path='/failed' element={<ProtectedRoute requiredStep={6}><Main><div>Failure</div></Main></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
    </StepProvider>
  )
}

export default App
