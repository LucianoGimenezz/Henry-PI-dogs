import { useContext } from "react";
import { ModalContext } from "../context";
import "../styles/header.css";

const Button = () => {
  const { setOpenModal } = useContext(ModalContext);
  return (
    <button className="Header__button" onClick={setOpenModal}>
      <div className="Button_item"></div>
      <div className="Button_item"></div>
      <div className="Button_item"></div>
    </button>
  );
};

export default Button;
