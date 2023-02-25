import ReactDOM from "react-dom";
import "../styles/modal.css";

const Modal = ({ setOpenModal }) => {
  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        <p onClick={() => setOpenModal(false)}>X</p>
        <div className="Modal__items">
          <p>Inicio</p>
          <p>Crear perro</p>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
