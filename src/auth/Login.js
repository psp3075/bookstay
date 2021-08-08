import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("psp3075@gmail.com");
  const [password, setPassword] = useState("123456789");

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      });
      // console.log(response);
      if (response.data) {
        window.localStorage.setItem("auth", JSON.stringify(response.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: response.data,
        });
        // console.log("Redux time ");
        history.push("/dashboard");
      }
    } catch (err) {
      // console.log(err);
      if (err?.response?.status === 400)
        toast.error(err.response.data, { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form className="mt-3" onSubmit={submitHandler}>
              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                disabled={!email || !password}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
