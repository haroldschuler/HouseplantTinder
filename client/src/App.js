import './App.css';
import {Routes,Route, useNavigate} from 'react-router-dom'
import Search from './views/Search';
import MyPlants from './views/MyPlants';
import BrowsePlants from './views/BrowsePlants';
import { Button } from '@mui/material';

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
          <Route path='/search' element={<Search/>} />
          <Route path='/myPlants' element={<MyPlants/>} />
          <Route path='/browse' element={<BrowsePlants/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;