import './App.css';
import {Routes,Route} from 'react-router-dom'
import Search from './views/Search';
import MyPlants from './views/MyPlants';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/search' element={<Search/>} />
        <Route path='/myPlants' element={<MyPlants/>} />
      </Routes>
    </div>
  );
}

export default App;