import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Dashboard = ({ isAdmin }) => {
  const adminButtons = (
    <Fragment>
      <Link to="/add-venue" className="btn btn-primary">
        Add a Venue
      </Link>
      <Link to="/list-venues" className="btn btn-primary">
        Venues
      </Link>
      <Link to="/booking-venues" className="btn btn-primary">
        Book the Venue
      </Link>
    </Fragment>
  );
  const nonAdminButtons = (
    <Fragment>
      <Link to="/list-venues" className="btn btn-primary">
        Venues
      </Link>
      <Link to="/booking-venues" className="btn btn-primary">
        Book the Venue
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <section className="container">
        <div className="dark-overlay">
          <div className="landing-inner">
            <div className="buttons">
              {<Fragment>{isAdmin ? adminButtons : nonAdminButtons}</Fragment>}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(Dashboard);
