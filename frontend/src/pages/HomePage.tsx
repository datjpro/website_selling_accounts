import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedAccounts from "../components/FeaturedAccounts";
import Promotions from "../components/Promotions";
import PopularGames from "../components/PopularGames";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedAccounts />
        <Promotions />
        <PopularGames />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
