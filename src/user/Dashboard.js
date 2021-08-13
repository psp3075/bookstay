import { useState, useEffect } from "react";
import DashboardNav from "./DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import BookingsCard from "../components/UIElements/BookingsCard";

const Dashboard = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const bookedHotels = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/user-hotel-booking`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        // console.log(response);
        setBooking(response.data);
      } catch (err) {
        console.log(err);
        toast.error("failed to fetch your hotels, try again after sometime");
      }
    };
    bookedHotels();
  }, []);

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        {booking?.map((b) => (
          <BookingsCard
            key={b._id}
            hotel={b.hotel}
            session={b.session}
            orderedBy={b.orderedBy}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
