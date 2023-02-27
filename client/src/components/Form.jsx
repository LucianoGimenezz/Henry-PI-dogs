import "../styles/form.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { validate } from "../utils/index";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../redux/actions";

const Form = () => {
  const [inputs, setInputs] = useState({
    name: "",
    imagen: "",
    "peso-min": "0",
    "peso-max": "0",
    "altura-min": "0",
    "altura-max": "0",
    "lifeSpan-min": "",
    "lifeSpan-max": "",
  });
  const { temperaments } = useSelector((state) => state);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const handlerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (Object.values(error).length > 0 || !selected.length) {
      if (!selected.length) {
        setError({
          ...error,
          temperaments: "Debe seleccionar al menos un temperamento",
        });
      }
      setLoading(false);
      return;
    }
    try {
      await fetch("http://localhost:3001/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.name,
          image: inputs.imagen,
          temperaments: selected,
          weight: `${inputs["peso-min"]} - ${inputs["peso-max"]}`,
          height: `${inputs["altura-min"]} - ${inputs["altura-max"]}`,
          life_span: `${inputs["lifeSpan-min"]} - ${inputs["lifeSpan-max"]} years`,
        }),
      });
      dispatch(getAllDogs());
      setInputs({
        name: "",
        imagen: "",
        "peso-min": "0",
        "peso-max": "0",
        "altura-min": "0",
        "altura-max": "0",
        "lifeSpan-min": "",
        "lifeSpan-max": "",
      });
      setSelected([]);
      setLoading(false);
    } catch (error) {
      console.error(new Error(error));
    }
  };

  const handlerChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  };
  const deleteTemperament = (element) => {
    const filteredArray = selected.filter((item) => item !== element);
    setSelected(filteredArray);
  };

  const handlerTemperaments = (e) => {
    const err = error;
    delete err.temperaments;
    setError(err);
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
        <input
          value={inputs.name}
          onChange={handlerChange}
          name="name"
          type="text"
          placeholder="Raza.."
        />
        {error.name && <p className="Form__warning">{error.name}</p>}
      </div>
      <div>
        <label>Imagen</label>
        <input
          value={inputs.imagen}
          onChange={handlerChange}
          name="imagen"
          type="text"
          placeholder="https://Tuimagen.jpg"
        />
        {error.imagen && <p className="Form__warning">{error.imagen}</p>}
      </div>
      <div>
        <p>Peso</p>
        <label>
          <p>Min: {inputs["peso-min"]} kgs</p>
          <input
            onChange={handlerChange}
            value={inputs["peso-min"]}
            type="range"
            name="peso-min"
            min="0"
            max="100"
          />
        </label>
        <label>
          <p>Max: {inputs["peso-max"]} kgs</p>
          <input
            onChange={handlerChange}
            value={inputs["peso-max"]}
            type="range"
            name="peso-max"
            min="0"
            max="100"
          />
        </label>
        {error["peso-min"] && error["peso-max"] && (
          <p className="Form__warning">
            Los campos de Peso no pueden estar en 0
          </p>
        )}
        {error["peso-min"] && !error["peso-max"] && (
          <p className="Form__warning">{error["peso-min"]}</p>
        )}
        {error["peso-max"] && !error["peso-min"] && (
          <p className="Form__warning">{error["peso-max"]}</p>
        )}
        {error.peso && <p className="Form__warning">{error.peso}</p>}
      </div>
      <div>
        <p>Altura </p>
        <label>
          <p>Min: {inputs["altura-min"]} cm</p>
          <input
            onChange={handlerChange}
            value={inputs["altura-min"]}
            type="range"
            name="altura-min"
            min="0"
            max="100"
          />
        </label>
        <label>
          <p>Max: {inputs["altura-max"]} cm</p>
          <input
            onChange={handlerChange}
            value={inputs["altura-max"]}
            type="range"
            name="altura-max"
            min="0"
            max="100"
          />
        </label>
        {error["altura-min"] && error["altura-max"] && (
          <p className="Form__warning">
            Los campos de altura no pueden estar en 0
          </p>
        )}
        {error["altura-min"] && !error["altura-max"] && (
          <p className="Form__warning">{error["altura-min"]}</p>
        )}
        {error["altura-max"] && !error["altura-min"] && (
          <p className="Form__warning">{error["altura-max"]}</p>
        )}
        {error.altura && <p className="Form__warning">{error.altura}</p>}
      </div>

      <div>
        <p>Años de vida</p>
        <div className="LifeSpan__container">
          <input
            placeholder="min.."
            onChange={handlerChange}
            value={inputs["lifeSpan-min"]}
            type="number"
            name="lifeSpan-min"
            min="0"
            max="100"
          />
          <p>To</p>
          <input
            placeholder="max..."
            onChange={handlerChange}
            value={inputs["lifeSpan-max"]}
            type="number"
            name="lifeSpan-max"
            min="0"
            max="100"
          />
        </div>
        {error["lifeSpan"] && (
          <p className="Form__warning">{error["lifeSpan"]}</p>
        )}
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
        {error.temperaments && (
          <p className="Form__warning">{error.temperaments}</p>
        )}
      </div>
      <button
        className={loading && "buttonLoad"}
        disabled={
          !Object.values(inputs)
            .splice(2, 6)
            .reduce((prev, current) => (prev += parseInt(current)), 0) ||
          !inputs.name ||
          !inputs.imagen
            ? true
            : false
        }
        type="submit"
      >
        {!loading && "Crear"}
        {loading && <div className="loading"></div>}
      </button>
    </form>
  );
};

export default Form;
