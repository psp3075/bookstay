import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const StripeSuccess = () => {
  const hotelId = useParams().hotelId;
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const bookedHotel = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/stripe-success`,
        { hotelId: hotelId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.data.success) {
        console.log("here it is", response.data);
        setTimeout(() => {
          history.push("/dashboard");
        }, 500);
      } else {
        history.push("/stripe/cancel");
      }
    };
    bookedHotel();
  }, [hotelId]);

  return (
    <div className="container">
      <div className="col">
        <h2 className="text-center p-5">Payment Success</h2>
        <h3 className="text-center p-5">
          Please wait, You will be redirected to your dashboard...
        </h3>
      </div>
    </div>
  );
};

export default StripeSuccess;
