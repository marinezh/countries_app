import React from "react";
import videoBG from "../assets/video.mp4";

const Home = () => {
  return (
    <div>
      <div>
        <video src={videoBG} autoPlay loop muted></video>
      </div>
      <div className="home_content" style={{ margin: "2rem 1rem" }}>
        <span>Countries app </span>is a simple React application made in
        Business College Helsinki lessons. App uses{" "}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{" "}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>
      </div>
    </div>
  );
};

export default Home;
