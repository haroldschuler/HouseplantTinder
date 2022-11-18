import './App.css';
import {Routes,Route, Navigate } from 'react-router-dom'
import MyPlants from './views/MyPlants';
import BrowsePlants from './views/BrowsePlants';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <div className="App">
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