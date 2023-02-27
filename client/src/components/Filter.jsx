import { useRef } from "react";

// selectedIndex = 0
const Filter = ({
  handlerFilters,
  temperaments,
  sendFiltersOptions,
  resetFilters,
}) => {
  const temperament = useRef();
  const origin = useRef();
  const order = useRef();
  const weight = useRef();

  const handlerResetFilters = () => {
    temperament.current.selectedIndex = 0;
    origin.current.selectedIndex = 0;
    order.current.selectedIndex = 0;
    weight.current.selectedIndex = 0;
    resetFilters();
  };
  return (
    <section className="Home__filters">
      <select onChange={handlerFilters} name="temperament" ref={temperament}>
        <option value="null">Temperamentos</option>
        {temperaments?.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select onChange={handlerFilters} name="origin" ref={origin}>
        <option value="null">Origen</option>
        <option value="api">API</option>
        <option value="bd">BD</option>
      </select>
      <select onChange={handlerFilters} name="order" ref={order}>
        <option value="null">Orden</option>
        <option value="a-z">a-z</option>
        <option value="z-a">z-a</option>
      </select>
      <select onChange={handlerFilters} name="weight" ref={weight}>
        <option value="null">Peso</option>
        <option value="menor">menor-mayor</option>
        <option value="mayor">mayor-menor</option>
      </select>
      <button onClick={sendFiltersOptions}>Filtrar</button>
      <button onClick={handlerResetFilters} className="Filters__btn">
        Reset Filtros
      </button>
    </section>
  );
};

export default Filter;
