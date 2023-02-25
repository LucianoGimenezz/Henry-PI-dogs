import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogByID } from "../redux/actions";
import { useEffect } from "react";
import "../styles/detail.css";
import Header from "../components/Header";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailDog } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getDogByID(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(detailDog);
  return (
    <>
      <Header show={true} />
      <section className="Details">
        <section className="Details__container">
          <img src={detailDog?.image} alt={detailDog?.name} />
          <p>{detailDog?.name}</p>
          <div className="Details__info">
            <p>
              {detailDog?.weight?.length > 1
                ? detailDog?.weight?.join(" - ")
                : detailDog?.weight?.pop()}{" "}
              kgs
            </p>
            <p>
              {detailDog?.height?.length > 1
                ? detailDog?.height?.join(" - ")
                : detailDog?.height?.pop()}{" "}
              cm
            </p>
            <p>Años de vida:</p>
            <p>{detailDog?.life_span}</p>
          </div>
          <div className="Details__temperament">
            {detailDog?.temperaments?.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default Details;
