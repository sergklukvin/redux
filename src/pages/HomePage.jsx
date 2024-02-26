import { useNavigate } from "react-router-dom";

import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCountries,
  selectCountriesInfo,
  selectVisibleCountries,
} from "../store/countries/countries-selectors";
import { useEffect } from "react";
import { loadCountries } from "../store/countries/countries-actions";
import {
  selectControls,
  selectSearch,
} from "../store/controls/controls-selectors";

export const HomePage = () => {
  const navigate = useNavigate();
  const { search, region } = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region }),
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return (
    <>
      <Controls />

      {error && <h3>Can't fetch data</h3>}
      {status === "loading" && <h3>Loading...</h3>}

      {status === "received" && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
