import "../styles/card.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, addFavourite } from "../redux/actions";
import useLocalStorage from "../hook/useLocalStorage";

const Card = ({ image, name, temperaments, weight, id, isFav }) => {
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(isFav);
  const { setLocalStorage, removeLocalStorage, createDic } =
    useLocalStorage("FAVS");
  const handlerFavourite = () => {
    if (isFavourite) {
      removeLocalStorage(id);
      dispatch(addFavourite(id, "remove"));
      // dispatch(getAllDogs(createDic()));
    } else {
      setLocalStorage({
        image,
        name,
        temperaments,
        weight,
        id,
        isFav: true,
      });
      dispatch(addFavourite(id, "add"));
      // dispatch(getAllDogs(createDic()));
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
