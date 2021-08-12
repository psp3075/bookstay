import React, { useState, useEffect } from "react";
import axios from "axios";
import HCard from "./../components/UIElements/HCard";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API}/hotels`);
      setHotels(response.data);
    };
    loadHotels();
  }, []);

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Home</h1>
      </div>
      <div className="container-fluid">
        <br />
        {hotels.map((h) => (
          <HCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;
