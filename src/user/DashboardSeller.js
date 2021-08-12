import { useState, useEffect } from "react";
import DashboardNav from "../user/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import HCard from "./../components/UIElements/HCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sellerHotels = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/seller-hotels`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        console.log(response);
        setHotels(response.data);
      } catch (err) {
        console.log(err);
        toast.error("failed to fetch your hotels, try again after sometime");
      }
    };
    sellerHotels();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/create-connect-account`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response); // get login link
      window.location.href = response.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again.");
      setLoading(false);
    }
  };

  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
      <div className="row">
        {hotels.map((h) => (
          <HCard key={h._id} h={h} showViewMoreButton={false} owner={true} />
        ))}
      </div>
    </div>
  );

  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </>
  );
};

export default DashboardSeller;
