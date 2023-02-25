import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import {
  getAllDogs,
  getAllTemperaments,
  filterDogs,
  resetFilters,
  getDogByName,
} from "../redux/actions/";
import { useSelector, useDispatch } from "react-redux";
import "../styles/home.css";

const Home = () => {
  const { filteredDogs, temperaments, loading } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const handlerFilters = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
  };

  const onSearch = (name) => {
    dispatch(getDogByName(name));
    setCurrentPage(1);
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
    if (filteredDogs?.length === 0) {
      dispatch(getAllDogs());
      dispatch(getAllTemperaments());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Home">
      <Header setOpenModal={setOpenModal} />
      <SearchBar onSearch={onSearch} />
      <Filter
        handlerFilters={handlerFilters}
        temperaments={temperaments}
        sendFiltersOptions={sendFiltersOptions}
        resetFilters={handlerResetFilters}
      />
      {openModal && <Modal setOpenModal={setOpenModal} />}
      {loading && <Loader />}
      {!loading && (
        <>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <section className="Home__data">
            <Cards allDogs={filteredDogs[currentPage]} />
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
