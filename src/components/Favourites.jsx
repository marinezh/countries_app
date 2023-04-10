import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../features/countriesSlice";
import { useEffect } from "react";
import classes from "./Favourites.module.css";
import { Button } from "react-bootstrap";

import Spinner from "react-bootstrap/Spinner";
import { clearFavourites, removeFavourites } from "../features/favouritesSlice";
// import countries from "../services/countries";

const Favourites = () => {
  const dispatch = useDispatch();

  let countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");
  const [favouritesList, setFavouritesList] = useState([]);

  console.log("Search: ", search);
  console.log("countriesList: ", countriesList);
  console.log("loading", loading);

  if (favouritesList !== null) {
    console.log("filling the list");
    countriesList = countriesList.filter((c) => {
      console.log("hey", c.name.common, favouritesList.includes(c.name.common));
      return favouritesList.includes(c.name.common);
    });
  } else {
    console.log("empty");
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    setFavouritesList(localStorage.getItem("Favourites"));
  }, [dispatch]);

  // We will be replacing this with data from our API.
  // const country = {
  //   name: {
  //     common: "Example Country",
  //   },
  // };

  if (loading) return <Spinner animation="border" />;
  else
    return (
      <Container fluid>
        <Row>
          <Col className="mt-5 d-flex justify-content-center">
            <Form>
              <Form.Control
                style={{ width: "18rem" }}
                type="search"
                className="me-2 "
                placeholder="Search for countries"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3">
          <Button
            onClick={() => {
              dispatch(clearFavourites());
            }}
          >
            {" "}
            Clear favourites
          </Button>
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3">
          {countriesList
            .filter((country) => {
              return country.name.official
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .map((country) => (
              <Col className="mt-5">
                <Card className="h-100">
                  <i
                    className="bi bi-heart-fill text-danger m-1 p-1"
                    onClick={() =>
                      dispatch(removeFavourites(country.name.common))
                    }
                  ></i>
                  <Card.Body className="d-flex flex-column">
                    <LinkContainer
                      to={`/countries/${country.name.common}`}
                      state={{ country: country }}
                    >
                      <div>
                        <Card.Img
                          className={classes.flag_img}
                          variant="top"
                          src={country?.flags?.svg}
                        />
                        <Card.Title>{country.name.common}</Card.Title>
                        <Card.Subtitle className="mb-5 text-muted">
                          {country.name.official}
                        </Card.Subtitle>
                        <ListGroup
                          variant="flush"
                          className="flex-grow-1 justify-content-end"
                        >
                          <ListGroup.Item>
                            <i className="bi bi-translate me-2"></i>{" "}
                            {country.languages
                              ? Object.values(country.languages).join(", ")
                              : ""}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <i className="bi bi-cash-coin me-2"></i>{" "}
                            {country.currencies
                              ? Object.values(country.currencies)
                                  .map((currency) => currency.name)
                                  .join(", ")
                              : ""}
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <i className="bi bi-people me-2"></i>
                            {country.population.toLocaleString("fi-FI")}
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    );
};

export default Favourites;
