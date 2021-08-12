import React from "react";
import { useHistory } from "react-router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HCard = ({ h, owner = false, showViewMoreButton = true }) => {
  const history = useHistory();
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

  const showMoreHandler = () => history.push(`/hotel/${h._id}`);

  const hotelDeleteHandler = () => {
    console.log("deleting", h._id);
  };

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          {h.image && h.image.contentType ? (
            <img
              src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
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
              {h.title}
              <span className="float-right text-primary m-5">
                {currencyFormatter({
                  amount: h.price,
                  currency: "usd",
                })}
              </span>
            </h3>
            <p className="alert alert-info">{h.location}</p>
            <p className="card-text">{`${h.content.substring(1, 200)}...`}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                Available for : {diffDays(h.from, h.to)}{" "}
                {diffDays(h.from, h.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p className="card-text">Available Beds : {h.bed}</p>
            <p className="card-text">
              Available from {new Date(h.from).toLocaleDateString()}
            </p>

            <div className="d-flex justify-content-between h4">
              {showViewMoreButton && (
                <button onClick={showMoreHandler} className="btn btn-primary">
                  Show more
                </button>
              )}
              {owner && (
                <>
                  <Link to={`/hotel/edit/${h._id}`}>
                    <EditOutlined className="text-warning" />
                  </Link>
                  <DeleteOutlined
                    onClick={hotelDeleteHandler}
                    className="text-danger"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCard;
