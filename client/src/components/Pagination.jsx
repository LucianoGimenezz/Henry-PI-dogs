import "../styles/pagination.css";
import prev from "../assets/angulo-izquierdo.png";
import next from "../assets/angulo-derecho.png";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const { totalPages } = useSelector((state) => state);
  const mid = Math.floor((totalPages - 1) / 2) - 3;
  const pages = [];
  for (let i = 1; i <= totalPages - 1; i++) {
    pages.push(i);
  }
  console.log(pages);
  const handlerPaginationNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlerPaginationPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlerPaginationOne = (e) => {
    setCurrentPage(parseInt(e.target.innerHTML));
  };
  return (
    <div className="Pagination">
      <button
        className="Pagination__control"
        disabled={currentPage === 1 ? true : false}
        onClick={handlerPaginationPrev}
      >
        <img src={prev} alt="Icono de regresar" />
      </button>
      <div className="Pagination__pages">
        {pages.slice(0, 7).map((numero) => {
          if (numero === currentPage) {
            return (
              <div
                key={numero}
                className="Pages__item active"
                onClick={handlerPaginationOne}
              >
                <p>{numero}</p>
              </div>
            );
          }
          return (
            <div
              key={numero}
              className="Pages__item"
              onClick={handlerPaginationOne}
            >
              {numero}
            </div>
          );
        })}
        <div className="Pages__item">...</div>
        <div className="Pages__item" onClick={handlerPaginationOne}>
          {totalPages - 1}
        </div>
      </div>
      <button
        className="Pagination__control"
        disabled={currentPage === totalPages - 1 ? true : false}
        onClick={handlerPaginationNext}
      >
        <img src={next} alt="Icono de siguiente" />
      </button>
    </div>
  );
};

export default Pagination;
