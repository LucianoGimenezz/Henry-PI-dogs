import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import { useState, useEffect } from "react";
import {
  getAllDogs,
  getAllTemperaments,
  filterDogs,
  resetFilters,
} from "../redux/actions/";
import { useSelector, useDispatch } from "react-redux";
import "../styles/home.css";

const Home = () => {
  const { filteredDogs, temperaments } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const handlerFilters = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
  };

  const handlerResetFilters = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
  };

  const sendFiltersOptions = () => {
    dispatch(filterDogs(filterOptions));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Home">
      <Header />
      <SearchBar />
      <Filter
        handlerFilters={handlerFilters}
        temperaments={temperaments}
        sendFiltersOptions={sendFiltersOptions}
        resetFilters={handlerResetFilters}
      />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <section className="Home__data">
        <Cards allDogs={filteredDogs[currentPage]} />
      </section>
    </div>
  );
};

export default Home;
