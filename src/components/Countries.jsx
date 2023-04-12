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
import { addFavourites, removeFavourite } from "../features/favouritesSlice";
import { useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";
// import countries from "../services/countries";

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");
  let favouritesList = useSelector((state) => state.favourites.favourites);

  // console.log("Search: ", search);
  // console.log("countriesList: ", countriesList);
  // console.log("loading", loading);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (loading)
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  else
    return (
      <Container fluid>
        <Row>
          <Col className="mt-5 d-flex justify-content-center">
            <Form>
              <Form.Control
                style={{ width: "15rem" }}
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
          {countriesList
            .filter((country) => {
              return country.name.official
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .map((country) => (
              <Col className="mt-5" key={country.name.official}>
                <Card className="h-100">
                  <div>
                    {favouritesList.includes(country.name.common) ? (
                      <i
                        className="bi bi-heart-fill text-danger m-1 p-1"
                        onClick={() =>
                          dispatch(removeFavourite(country.name.common))
                        }
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart text-danger m-1 p-1"
                        onClick={() =>
                          dispatch(addFavourites(country.name.common))
                        }
                      ></i>
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <LinkContainer
                      to={`/countries/${country.name.common}`}
                      state={{ country: country }}
                    >
                      <div>
                        <Card.Img
                          style={{
                            objectFit: "scale-down",
                            height: "10rem",
                            borderRadius: "5px",
                          }}
                          src={country?.flags?.svg}
                        />
                        <Card.Title style={{ marginTop: "1rem" }}>
                          {country.name.common}
                        </Card.Title>
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

export default Countries;
