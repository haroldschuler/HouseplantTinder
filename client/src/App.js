import './App.css';
import {Routes,Route, useNavigate, Navigate } from 'react-router-dom'
import MyPlants from './views/MyPlants';
import BrowsePlants from './views/BrowsePlants';
import { Button } from '@mui/material';
import Login from './components/Login';
import { useState } from 'react';
import Register from './components/Register';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <div className='navbar'>
        <h1>Houseplant Tinder</h1>
        <div>
          <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/browse')}>Browse Plants</Button>
          <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/myPlants')}>View My Plants</Button>
        </div>
      </div>
      <div>
        <Routes>
          <Route path='/myPlants' element={<MyPlants/>} />
          <Route path='/browse' element={<BrowsePlants/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path={'/*'} element={<Navigate to={'/browse'} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;