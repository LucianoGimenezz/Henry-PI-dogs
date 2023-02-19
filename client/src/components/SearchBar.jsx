import "../styles/searchBar.css";
import IconLupa from "../assets/lupa.png";

const SearchBar = () => {
  return (
    <div className="SearchBar">
      <input className="SearchBar__input" type="text" />
      <img className="SearchBar__icon" src={IconLupa} alt="Icono de lupa" />
    </div>
  );
};

export default SearchBar;
