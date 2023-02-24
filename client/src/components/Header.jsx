import feetLogo from "../assets/Mi proyecto.png";
import backLogo from "../assets/angulo-izquierdo.png";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = ({ show }) => {
  return (
    <header className="Header">
      <nav className={show ? "Header__nav Header__nav--show" : "Header__nav"}>
        {show && (
          <Link to={`/home`}>
            <img src={backLogo} alt="Boton para vovler atras" />
          </Link>
        )}
        <button className="Header__button">
          <div className="Button_item"></div>
          <div className="Button_item"></div>
          <div className="Button_item"></div>
        </button>
      </nav>
      {!show && (
        <img className="Header__logo" src={feetLogo} alt="Logo de la pagina" />
      )}
    </header>
  );
};

export default Header;
