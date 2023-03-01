import "../styles/landing.css";
import feet from "../assets/Mi proyecto.png";
import logo from "../assets/Puppy-Dog-Face-PNG-Photos.png";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const handlerRoute = () => navigate("/home");
  return (
    <main className="Landing">
      {/* <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" /> */}
      <img src={logo} alt="Logo de un perro" className="Landing__logo" />
      <button onClick={handlerRoute} className="Landing-button">
        Empezar
      </button>
    </main>
  );
};
