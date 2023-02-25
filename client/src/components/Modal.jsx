import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "../styles/modal.css";

const Modal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const handlerNavigate = (e) => {
    setOpenModal(false);
    if (e.target.innerHTML === "Inicio") return navigate("/home");
    navigate("/createDog");
  };
  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        <p onClick={() => setOpenModal(false)}>X</p>
        <div className="Modal__items">
          <p onClick={handlerNavigate}>Inicio</p>
          <p onClick={handlerNavigate}>Crear perro</p>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
