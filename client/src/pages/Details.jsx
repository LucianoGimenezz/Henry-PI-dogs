import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogByID, cleanDetails } from "../redux/actions";
import { useEffect, useContext, useRef } from "react";
import { ModalContext } from "../context";
import Modal from "../components/Modal";
import "../styles/detail.css";
import Header from "../components/Header";

const Details = () => {
  const detailRef = useRef();
  const { openModal } = useContext(ModalContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailDog } = useSelector((state) => state);
  useEffect(() => {
    dispatch(cleanDetails());
    dispatch(getDogByID(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resetStyles = () => {
    const styles = `
      transform: perspective(500px) scale(1) rotateX(0) rotateY(0);
    `;
    detailRef.current.style = styles;
  };

  const handlerAnimate = (e) => {
    const { layerX, layerY } = e.nativeEvent;
    const height = detailRef.current.clientHeight;
    const width = detailRef.current.clientWidth;
    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - height / 2) / height) * 20;
    const styles = `
      transform: perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg);
    `;
    detailRef.current.style = styles;
  };
  return (
    <>
      {openModal && <Modal />}
      <Header show={true} />
      <section className="Details">
        <section
          className="Details__container"
          onMouseMove={handlerAnimate}
          onMouseOut={resetStyles}
          ref={detailRef}
        >
          <img src={detailDog?.image} alt={detailDog?.name} />
          <div className="Details__name">
            <p>{detailDog?.name}</p>
          </div>
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
