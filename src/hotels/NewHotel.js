import { useState } from "react";
import { DatePicker, Select } from "antd";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { Option } = Select;

const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const { title, content, location, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    // console.log(...hotelData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/create-hotel`,
        hotelData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("New hotel added successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add new hotel ");
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    // console.log(e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />
        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="Location"
          className="form-control m-2"
          value={location}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of Beds"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>
      <DatePicker
        placeholder="From Date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <DatePicker
        placeholder="To Date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            {/* <pre>{JSON.stringify(values, null, 6)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
