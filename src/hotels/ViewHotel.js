import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const ViewHotel = () => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const history = useHistory();
  const hotelId = useParams().hotelId;
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const editHotelById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/hotel/${hotelId}`
      );

      setHotel({
        title: response.data.title,
        content: response.data.content,
        location: response.data.location,
        price: response.data.price,
        from: response.data.from,
        to: response.data.to,
        bed: response.data.bed,
      });
      setImage(`${process.env.REACT_APP_API}/hotel/image/${response.data._id}`);
    };
    editHotelById();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      const disableBookedHotel = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/is-already-booked/${hotelId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.ok) setAlreadyBooked(true);
      };
      disableBookedHotel();
    }
  }, []);

  const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end) / day));
    return difference;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }
    if (!auth) history.push("/login");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/stripe-session-id`,
        { hotelId: hotelId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data.sessionId);
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      stripe
        .redirectToCheckout({
          sessionId: response.data.sessionId,
        })
        .then((result) => console.log(result));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>
          <div className="col-md-6">
            <br />
            <strong>{hotel.content}</strong>
            <p className="alert alert-info mt-3">$ {hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                Available for : {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />
              {moment(new Date(hotel.from)).format("MMMM Do YYYY")}
            </p>
            <p>
              To <br />
              {moment(new Date(hotel.to)).format("MMMM Do YYYY")}
            </p>
            <i>Posted By {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading || alreadyBooked}
            >
              {loading
                ? "Processing..."
                : alreadyBooked
                ? "Booked"
                : auth && auth.token
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
