import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const navigate=useNavigate(null);

  useEffect(()=>{
    navigate('/home');
  },[]);

  return (
    <>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='user/dashboard/:_id' element={<Dashboard/>}/>
    </Routes>

    <Toaster position='top-right' reverseOrder={false}/>
    </>
  )
}

export default App