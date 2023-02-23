import "../styles/pagination.css";
import prev from "../assets/angulo-izquierdo.png";
import next from "../assets/angulo-derecho.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const { totalPages } = useSelector((state) => state);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const handlerPaginationNext = () => {
    if (currentPage + 2 === totalPages.length) {
      setLastIndex(totalPages.length);
    } else if (
      currentPage + 1 === lastIndex &&
      lastIndex !== totalPages.length
    ) {
      setFirstIndex(firstIndex + 2);
      setLastIndex(lastIndex + 2);
    }
    setCurrentPage(currentPage + 1);
  };

  const handlerPaginationPrev = () => {
    if (currentPage - 2 === firstIndex && currentPage - 2 !== 0) {
      setFirstIndex(firstIndex - 2);
      setLastIndex(lastIndex - 2);
    }
    setCurrentPage(currentPage - 1);
  };

  const handlerPaginationOne = (e) => {
    if (
      parseInt(e.target.innerHTML) === totalPages.length &&
      parseInt(e.target.innerHTML) !== lastIndex
    ) {
      setFirstIndex(Math.floor(totalPages.length / 2));
      setLastIndex(parseInt(e.target.innerHTML));
      return setCurrentPage(parseInt(e.target.innerHTML));
    }

    if (
      (parseInt(e.target.innerHTML) + 2 === totalPages.length ||
        parseInt(e.target.innerHTML) + 1 === totalPages.length) &&
      lastIndex !== totalPages.length
    ) {
      if (parseInt(e.target.innerHTML) + 2 === totalPages.length) {
        setFirstIndex(firstIndex + 2);
      }
      setLastIndex(totalPages.length);
    } else if (
      parseInt(e.target.innerHTML) === lastIndex &&
      lastIndex !== totalPages.length
    ) {
      setFirstIndex(firstIndex + 2);
      setLastIndex(lastIndex + 2);
    } else if (
      parseInt(e.target.innerHTML) - 1 === firstIndex &&
      parseInt(e.target.innerHTML) !== 1
    ) {
      setFirstIndex(firstIndex - 2);
      setLastIndex(lastIndex - 2);
    }
    setCurrentPage(parseInt(e.target.innerHTML));
  };
  useEffect(() => {
    if (totalPages?.length === 1) {
      setLastIndex(1);
      return;
    }

    setLastIndex(Math.floor(totalPages?.length / 2));
  }, [totalPages]);

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
        {totalPages.slice(firstIndex, lastIndex).map((numero) => {
          if (parseInt(numero) === currentPage) {
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
              <p>{numero}</p>
            </div>
          );
        })}
        {lastIndex !== totalPages.length && (
          <>
            <div className="Pages__item">...</div>
            <div className="Pages__item" onClick={handlerPaginationOne}>
              {totalPages.length}
            </div>
          </>
        )}
      </div>
      <button
        className="Pagination__control"
        disabled={currentPage === totalPages.length ? true : false}
        onClick={handlerPaginationNext}
      >
        <img src={next} alt="Icono de siguiente" />
      </button>
    </div>
  );
};

export default Pagination;
