import Header from "../components/Header";
import Form from "../components/Form";
import "../styles/createdog.css";

const CreateDog = () => {
  return (
    <>
      <Header show={true} />
      <section className="Create__container">
        <Form />
      </section>
      ;
    </>
  );
};

export default CreateDog;
