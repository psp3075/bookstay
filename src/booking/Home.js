import React, { useState, useEffect } from "react";
import axios from "axios";
import HCard from "./../components/UIElements/HCard";
import SearchHotel from "../hotels/SearchHotel";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadHotels = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API}/hotels`);
      setHotels(response.data);
      setLoading(false);
    };
    loadHotels();
  }, []);

  return (
    <>
      <div className="container-fluid bg-info p-4 text-center ">
        <h1>Home</h1>
      </div>
      <div className="col">
        <br />
        <SearchHotel />
      </div>
      <div className="container-fluid">
        <br />
        {loading ? (
          <h1>Loading ...</h1>
        ) : (
          hotels.map((h) => <HCard key={h._id} h={h} />)
        )}
      </div>
    </>
  );
};

export default Home;
