import { Landing } from "./pages/Landing";
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import './styles/app.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="" element={<Landing />} />  
        <Route exact path="/home" element={<Home />} />
      </Routes>      
    </div>
  );
}

export default App;
