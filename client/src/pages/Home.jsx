import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import "../styles/home.css";

const Home = () => {
  const [filterOptions, setFilterOptions] = useState({});
  const handlerFilters = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
  };
  return (
    <div className="Home">
      <Header />
      <SearchBar />
      <section className="Home__filters">
        <select onChange={handlerFilters} name="temperament">
          <option value="null">Temperamentos:</option>
        </select>
        <select onChange={handlerFilters} name="origin">
          <option value="null">Origen:</option>
          <option value="api">API</option>
          <option value="bd">BD</option>
        </select>
        <select onChange={handlerFilters} name="order">
          <option value="null">Orden:</option>
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
        </select>
        <select onChange={handlerFilters} name="weight">
          <option value="null">Peso:</option>
          <option value="menor">menor-mayor</option>
          <option value="mayor">mayor-menor</option>
        </select>
        <button>Filtrar</button>
      </section>
    </div>
  );
};

export default Home;
