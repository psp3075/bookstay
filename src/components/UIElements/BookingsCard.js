import { useHistory } from "react-router";
import { useState } from "react";
import OrderModal from "./OrderModal";

const BookingsCard = ({ hotel, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);

  const currencyFormatter = (data) => {
    return (data.amount / 1).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency,
    });
  };

  const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end) / day));
    return difference;
  };

  const showModalHandler = () => setShowModal(!showModal);

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          {hotel.image && hotel.image.contentType ? (
            <img
              src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
              alt="hotelimage"
              className="card-image img img-fluid"
            />
          ) : (
            <img
              src="https://via.placeholder.com/800x500.png?text=Bookstay"
              alt="hotelimage"
              className="card-image img img-fluid"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">
              {hotel.title}
              <span className="float-right text-primary m-5">
                {currencyFormatter({
                  amount: hotel.price,
                  currency: "usd",
                })}
              </span>
            </h3>
            <p className="alert alert-info">{hotel.location}</p>
            <p className="card-text">{`${hotel.content.substring(
              1,
              200
            )}...`}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                Available for : {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p className="card-text">Available Beds : {hotel.bed}</p>
            <p className="card-text">
              Available from {new Date(hotel.from).toLocaleDateString()}
            </p>
            {showModal && (
              <OrderModal
                session={session}
                orderedBy={orderedBy}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            )}
            <div className="d-flex justify-content-between h4">
              <button onClick={showModalHandler} className="btn btn-primary">
                More info
              </button>
              )
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsCard;
