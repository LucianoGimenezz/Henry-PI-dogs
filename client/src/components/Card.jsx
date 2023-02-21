import "../styles/card.css";

const Card = ({ image, name, temperaments, weight }) => {
  return (
    <div className="Container" style={{ backgroundImage: `url(${image})` }}>
      <div className="Container__info">
        <div className="Info__name">
          <p>{name}</p>
        </div>
        <div className="Info__temperament">
          {temperaments?.map((item, index) => {
            return (
              <div key={index} className="temperament__item">
                {item}
              </div>
            );
          })}
        </div>
        <div className="Info__weight">
          <p>
            {weight.length > 1
              ? `${weight[0]} - ${weight[1]} kgs`
              : `${weight[0]} kgs`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
