import feetLogo from "../assets/Mi proyecto.png";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="Header">
      <nav className="Header__nav">
        <button className="Header__button">
          <div className="Button_item"></div>
          <div className="Button_item"></div>
          <div className="Button_item"></div>
        </button>
      </nav>
      <img className="Header__logo" src={feetLogo} alt="Logo de la pagina" />
    </header>
  );
};

export default Header;
