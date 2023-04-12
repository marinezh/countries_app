import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const country = location.state.country;
  console.log(location);
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        console.log(res.data); // showing weather data
        setWeather(res.data);
        setLoading(false);
      });
  }, [country.capital]);

  console.log("weather", weather);

  if (loading) {
    return (
      <Col className="text-center m5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant=""
        ></Spinner>
      </Col>
    );
  }

  return (
    <Container>
      <Row className="m-5">
        <Col>
          {" "}
          <Image
            className="country_img"
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900${country.capital}`}
          ></Image>
        </Col>
        <Col className="single_description">
          <h2 className="display-4">{country.name.common}</h2>
          <h3>{country.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Right now is <strong>{weather.main.temp}</strong> degrees in{" "}
                {country.capital} and {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
          <h2>Borders:</h2>
          <p>{country.borders?.map((e) => e + " ")}</p>
          <Button
            variant="dark"
            className="goback"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
