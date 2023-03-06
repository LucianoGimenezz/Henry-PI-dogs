import ReactDOM from "react-dom";
import { useContext } from "react";
import { ModalContext } from "../context";
import { useNavigate } from "react-router-dom";
import "../styles/modal.css";

const Modal = () => {
  const { setOpenModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const handlerNavigate = (e) => {
    setOpenModal(false);
    if (e.target.innerHTML === "Inicio") return navigate("/home");
    if (e.target.innerHTML === "Crear perro") return navigate("/createDog");
    navigate("/favourites");
  };
  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        <p onClick={() => setOpenModal(false)}>X</p>
        <div className="Modal__items">
          <p onClick={handlerNavigate}>Inicio</p>
          <p onClick={handlerNavigate}>Crear perro</p>
          <p onClick={handlerNavigate}>Favoritos</p>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
