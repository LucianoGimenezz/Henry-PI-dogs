import Card from "./Card";
import "../styles/cards.css";

const Cards = ({ allDogs }) => {
  return (
    <section className="Cards__container">
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </section>
  );
};

export default Cards;
