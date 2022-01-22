import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert/Alert";
import AddVenue from "./components/Venues/AddVenue";
import ListVenues from "./components/Venues/ListVenues/ListVenues";
import VenueDetail from "./components/Venues/VenueDetail/VenueDetail";
import VenueEdit from "./components/Venues/VenueEdit/VenueEdit";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />

          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/add-venue" component={AddVenue} />
            <Route exact path="/list-venues" component={ListVenues} />
            <Route exact path="/venue-detail/:id" component={VenueDetail} />
            <Route exact path="/venue-edit/:id" component={VenueEdit} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
