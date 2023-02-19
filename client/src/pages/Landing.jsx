import "../styles/landing.css";
import feet from "../assets/Mi proyecto.png";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const handlerRoute = () => navigate("/home");
  return (
    <main className="Landing">
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <img src={feet} alt="background" className="Landing-feet" />
      <button onClick={handlerRoute} className="Landing-button">
        Go Home
      </button>
    </main>
  );
};
