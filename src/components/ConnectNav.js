import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import axios from "axios";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  useEffect(() => {
    const getAccountBalance = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/get-account-balance`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setBalance(response.data);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAccountBalance();
  }, []);

  const currencyFormatter = (data) => {
    return (data.amount / 100).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency,
    });
  };

  const payoutSetting = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/payout-setting`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log("payout settings===== ", response);
      setLoading(false);
      window.location.href = response.data.url;
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("unable to access settings, try after sometime");
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            {!loading && (
              <Ribbon text="Available" color="green">
                <Card className="bg-light pt-1 pointer">
                  {balance &&
                    balance.pending &&
                    balance.pending.map((bal, index) => (
                      <span key={index} className="lead">
                        {currencyFormatter(bal)}
                      </span>
                    ))}
                </Card>
              </Ribbon>
            )}
            <Ribbon text="Payouts" color="blue">
              <Card className="bg-light pointer" onClick={payoutSetting}>
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
