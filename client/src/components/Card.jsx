import "../styles/card.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hook/useLocalStorage";

const Card = ({ image, name, temperaments, weight, id }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { setLocalStorage, removeLocalStorage } = useLocalStorage("FAVS");

  const handlerFavourite = () => {
    if (isFavourite) {
      removeLocalStorage(id);
    } else {
      setLocalStorage({
        image,
        name,
        temperaments,
        weight,
        id,
      });
    }
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="Container" style={{ backgroundImage: `url(${image})` }}>
      <button className="Container__button-fav" onClick={handlerFavourite}>
        {isFavourite ? "💛" : "🤍"}
      </button>
      <div className="Container__info">
        <div className="Info__name">
          <Link
            to={`/details/${id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <p>{name}</p>
          </Link>
        </div>
        <div className="Info__temperament">
          {temperaments?.map((item, index) => {
            return (
              <div key={index} className="temperament__item">
                {item}
              </div>
            );
          })}
        </div>
        <div className="Info__weight">
          <p>
            {weight.length > 1
              ? `${weight[0]} - ${weight[1]} kgs`
              : `${weight[0]} kgs`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
