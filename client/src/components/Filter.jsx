const Filter = ({ handlerFilters, temperaments, sendFiltersOptions }) => {
  return (
    <section className="Home__filters">
      <select onChange={handlerFilters} name="temperament">
        <option value="null">Temperamentos:</option>
        {temperaments?.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select onChange={handlerFilters} name="origin">
        <option value="null">Origen:</option>
        <option value="api">API</option>
        <option value="bd">BD</option>
      </select>
      <select onChange={handlerFilters} name="order">
        <option value="null">Orden:</option>
        <option value="a-z">a-z</option>
        <option value="z-a">z-a</option>
      </select>
      <select onChange={handlerFilters} name="weight">
        <option value="null">Peso:</option>
        <option value="menor">menor-mayor</option>
        <option value="mayor">mayor-menor</option>
      </select>
      <button onClick={sendFiltersOptions}>Filtrar</button>
    </section>
  );
};

export default Filter;
