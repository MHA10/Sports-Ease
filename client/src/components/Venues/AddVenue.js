import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerVenue } from "../../actions/venue";
import PropTypes from "prop-types";

const AddVenue = ({ registerVenue, isAdded, isAdmin }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  // If user is not an Admin, the add venue form should not be accessible
  if (!isAdmin) {
    return null;
  }

  const { name, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    registerVenue({ name, address });
  };

  // Redirect if added successfully

  if (isAdded) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Add Venue</h1>
      <p className="lead">
        <i className="fas fa-running"></i> Add a Venue/Ground
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
        <input type="submit" className="btn btn-primary" value="Add" />
      </form>
    </Fragment>
  );
};

AddVenue.propTypes = {
  registerVenue: PropTypes.func.isRequired,
  isAdded: PropTypes.bool,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAdded: state.venue.isAdded,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { registerVenue })(AddVenue);
