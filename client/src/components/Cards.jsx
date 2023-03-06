import Card from "./Card";
import "../styles/cards.css";

const Cards = ({ allDogs }) => {
  return (
    <section className="Cards__container">
      {allDogs?.map((item) => {
        return (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            lifeSpan={item.life_span}
            weight={item.weight}
            height={item.height}
            temperaments={item.temperaments}
            isFav={item.isFav}
          />
        );
      })}
    </section>
  );
};

export default Cards;
