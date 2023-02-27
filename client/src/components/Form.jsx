import "../styles/form.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const Form = () => {
  const { temperaments } = useSelector((state) => state);
  const [selected, setSelected] = useState([]);

  const handlerSubmit = (e) => {};

  const deleteTemperament = (element) => {
    const filteredArray = selected.filter((item) => item !== element);
    setSelected(filteredArray);
  };

  const handlerTemperaments = (e) => {
    if (selected.length > 0) {
      const set = new Set([...selected, e.target.value]);
      setSelected([...set]);
      return;
    }
    setSelected([e.target.value]);
  };
  return (
    <form className="Form" onSubmit={handlerSubmit}>
      <div>
        <label>Raza</label>
        <input name="name" type="text" placeholder="Raza.." />
      </div>
      <div>
        <label>Imagen</label>
        <input name="imagen" type="text" placeholder="https://Tuimagen.jpg" />
      </div>
      <div>
        <p>Peso</p>
        <label>
          <p>Min:</p>
          <input type="range" name="peso-min" min="0" max="100" />
        </label>
        <label>
          <p>Max:</p>
          <input type="range" name="peso-max" min="0" max="100" />
        </label>
      </div>
      <div>
        <p>Altura </p>
        <label>
          <p>Min:</p>
          <input type="range" name="peso-min" min="0" max="100" />
        </label>
        <label>
          <p>Max:</p>
          <input type="range" name="peso-max" min="0" max="100" />
        </label>
      </div>
      <div>
        <label>Temperamentos</label>
        <select onChange={handlerTemperaments}>
          {temperaments?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {selected.length > 0 && (
          <div className="Temperaments__container">
            {selected.map((item, index) => (
              <div key={index}>
                {item}
                <p
                  className="Temperaments__button"
                  onClick={() => deleteTemperament(item)}
                >
                  X
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit">Crear</button>
    </form>
  );
};

export default Form;
