import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogByID } from "../redux/actions";
import { useEffect } from "react";
import "../styles/detail.css";
import Header from "../components/Header";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailDog } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getDogByID(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(detailDog);
  return (
    <section className="Details">
      <Header show={true} />
    </section>
  );
};

export default Details;
