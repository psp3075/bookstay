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
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeCallback from "./stripe/StripeCallback";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResults from "./hotels/SearchResults";
import SearchHotel from "./hotels/SearchHotel";

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
        {auth && auth.token && (
          <Route exact path="/hotel/edit/:hotelId">
            <EditHotel />
          </Route>
        )}
        <Route exact path="/hotel/:hotelId">
          <ViewHotel />
        </Route>
        {auth && auth.token && (
          <Route exact path="/stripe/success/:hotelId">
            <StripeSuccess />
          </Route>
        )}
        {auth && auth.token && (
          <Route exact path="/stripe/cancel">
            <StripeCancel />
          </Route>
        )}
        <Route exact path="/search-result">
          <SearchResults />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
