import "../styles/searchBar.css";
import IconLupa from "../assets/lupa.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/actions";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    setValue(e.target.value);
  };

  const handlerSearch = () => {
    dispatch(setLoading());
    onSearch(value);
    setValue("");
  };

  return (
    <div className="SearchBar">
      <input
        value={value}
        className="SearchBar__input"
        type="text"
        onChange={handlerChange}
      />
      <img
        className="SearchBar__icon"
        src={IconLupa}
        alt="Icono de lupa"
        onClick={handlerSearch}
      />
    </div>
  );
};

export default SearchBar;
