import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { Button } from "../components/Button";
import { Info } from "../components/Info";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCountry,
  loadCountryByName,
} from "../store/details/details-actions";
import { useEffect } from "react";
import {selectDetails} from "../store/details/details-selector";

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { currentCountry, error, status } = useSelector(selectDetails);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearCountry());
    };
  }, [dispatch, name]);


  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {error && <h3>Something went wrong</h3>}
      {status === "loading" && <h3>Loading...</h3>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
