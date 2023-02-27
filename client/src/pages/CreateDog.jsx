import Form from "../components/Form";
import logobackTo from "../assets/angulo-izquierdo.png";
import logoPerro from "../assets/Puppy-Dog-Face-PNG-Photos.png";
import Button from "../components/ButtonMenu";
import { Link } from "react-router-dom";
import { ModalContext } from "../context";
import Modal from "../components/Modal";
import { useContext } from "react";
import "../styles/createdog.css";

const CreateDog = () => {
  const { openModal } = useContext(ModalContext);
  return (
    <>
      {openModal && <Modal />}
      <section className="CreateDog__header">
        <Link to="/home">
          <img src={logobackTo} alt="Volver atrás " />
        </Link>
        <div>
          <img src={logoPerro} alt="Logo de un perro" />
          <h3>Crea tu Perro</h3>
        </div>
        <Button />
      </section>
      <section className="Create__container">
        <Form />
      </section>
    </>
  );
};

export default CreateDog;
