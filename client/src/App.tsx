import { useEffect, useLayoutEffect, useState } from 'react'
import AvailableMovie from './components/AvailableMovie'
import Summary from './components/Summary';
import TicketForm2 from './components/Form2';
import type { IFormData } from './components/interfaces';
import { Route, Routes } from 'react-router-dom';
import { Main } from './components/Main';
import ProtectedRoute from './helper/ProtectedRoute';
import PayPalCheckout from './components/PayPalGateWay2';
import SuccessScreen from './components/SuccessScreen';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';
import { fetchMovies } from './store/slices/movieSlice';
import FailureScreen from './components/FailureScreen';
const defaultFormData: IFormData = {
  name: "",
  email: "",
  seats: ""
}


function App() {
  const [formData, setFormData] = useState<IFormData>(defaultFormData)
  const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  try {
    dispatch(fetchMovies())
  } catch (err) {
    console.error("Effect failed", err);
  }
}, []);


  const handleForm = (data: IFormData) => {
    setFormData(data)
  }


  return (
      <>
       <Routes>
        <Route path='/' element={<Main><AvailableMovie /></Main>} />
        
          <Route path='/form' element={<ProtectedRoute requiredStep={2}><Main><TicketForm2 handleForm={handleForm}/></Main></ProtectedRoute>} />
        
        <Route path='/summary' element={<ProtectedRoute requiredStep={3}><Main><Summary formData={formData}/></Main></ProtectedRoute>} />
        <Route path='/payment' element={<ProtectedRoute requiredStep={4}><Main><PayPalCheckout /></Main></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute requiredStep={5}><Main><SuccessScreen /></Main></ProtectedRoute>} />
        <Route path='/failed' element={<ProtectedRoute requiredStep={6}><Main><FailureScreen /></Main></ProtectedRoute>} />
        <Route path="*" element={<div>Fallback Route</div>} />

      </Routes>
      </>
  )
}

export default App
