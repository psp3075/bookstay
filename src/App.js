import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";
import Nav from "./components/Nav";
import Dashboard from "./user/Dashboard";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";

function App() {
  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <Router>
      <Nav />
      <ToastContainer hideProgressBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        {auth && auth.token && (
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        )}
        {auth && auth.token && (
          <Route exact path="/dashboard/seller">
            <DashboardSeller />
          </Route>
        )}
        {auth && auth.token && (
          <Route exact path="/hotels/new">
            <NewHotel />
          </Route>
        )}
        {auth && auth.token && (
          <Route exact path="/stripe/callback">
            <StripeCallback />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
