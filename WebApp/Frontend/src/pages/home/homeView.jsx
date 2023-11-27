import React from "react";
import bgImage from "../../assets/bg1.jpg";
import Section from "./section";
const HomeView = () => {
  return (
    <Section id="home">
      <div>
        <div
          className="home-content p-5"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="intro text-center text-light">
            <h1 className="title">WELCOME TO TRIP PLANNER</h1>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HomeView;
