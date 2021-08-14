import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import HCard from "./../components/UIElements/HCard";

const SearchResults = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    console.table({ location, date, bed });
    const searchListings = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/search-listings`,
        {
          location,
          date,
          bed,
        }
      );
      setHotels(response.data);
    };

    searchListings();
  }, [window.location.search]);

  return (
    <div className="container">
      <div className="row">
        {hotels.map((h) => (
          <HCard key={h._id} h={h} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
