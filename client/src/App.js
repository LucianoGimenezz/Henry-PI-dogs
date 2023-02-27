import { Landing } from "./pages/Landing";
import { Route, Routes } from 'react-router-dom'
import { ModalProvider } from './context'
import CreateDog from "./pages/CreateDog";
import Home from "./pages/Home";
import Details from "./pages/Details";
import './styles/app.css'

function App() {
  return (
    <ModalProvider>
      <div className="App">
        <Routes>
          <Route exact path="" element={<Landing />} />  
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/createDog" element={<CreateDog />} />
        </Routes>      
      </div>
    </ModalProvider>
  );
}

export default App;
