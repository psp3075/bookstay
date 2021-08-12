import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const StripeCallback = () => {
  const { auth } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();

  const updateUserInLocalStorage = (user, next) => {
    if (window.localStorage.getItem("auth")) {
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = user;
      localStorage.setItem("auth", JSON.stringify(auth));
      next();
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      const getAccountStatus = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API}/get-account-status`,
            {},
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          console.log("user account status callback", response);
          updateUserInLocalStorage(response.data, () => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: response.data,
            });
            window.location.href = "/dashboard/seller";
          });
        } catch (err) {
          console.log(err);
          toast.error("stripe connect failed,try again");
        }
      };
      getAccountStatus();
    }
  }, [auth]);

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
