import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import grass from "../../img/grass.jpg";
import { updateVenue } from "../../actions/venue";

const VenueEdit = ({
  updateVenue,
  location,
  venue: { venue },
  isUpdated = false,
}) => {
  const [formData, setFormData] = useState({
    name: venue ? venue.name : "",
    address: venue ? venue.address : "",
  });

  if (venue === undefined || venue === null) {
    return null;
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    updateVenue(venue._id, name, address);
  };

  // Redirect if updated successfully

  if (isUpdated) {
    return <Redirect to="/list-venues" />;
  }

  const { name, address } = formData;
  return (
    <div className="card">
      <img src={grass} alt="Avatar" className="center" />
      <Fragment>
        <h1 className="large text-primary">Edit Venue</h1>
        <p className="lead">
          <i className="fas fa-running"></i> Edit a Venue/Ground
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Venue Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      </Fragment>
    </div>
  );
};

VenueEdit.propTypes = {
  updateVenue: PropTypes.func.isRequired,
  location: PropTypes.array.isRequired,
  venue: PropTypes.object.isRequired,
  isUpdated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.listVenue,
  isUpdated: state.venue.isUpdated,
});

export default connect(mapStateToProps, { updateVenue })(VenueEdit);
