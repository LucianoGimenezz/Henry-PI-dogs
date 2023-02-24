import { Landing } from "./pages/Landing";
import { Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import './styles/app.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="" element={<Landing />} />  
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/details/:id" element={<Details />} />
      </Routes>      
    </div>
  );
}

export default App;
