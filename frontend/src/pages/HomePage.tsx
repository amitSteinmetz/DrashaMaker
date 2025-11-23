import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
