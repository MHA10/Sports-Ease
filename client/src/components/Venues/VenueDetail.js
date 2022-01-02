import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getVenue } from "../../actions/listVenue";
import grass from "../../img/grass.jpg";

const VenueDetail = ({ getVenue, match: { params }, venue: { venue } }) => {
  useEffect(() => {
    getVenue(params.id);
  }, []);
  if (venue == undefined) {
    return null;
  }
  const { name, address } = venue;
  return (
    <div className="card">
      <img src={grass} alt="Avatar" className="center" />
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <p>{address}</p>
      </div>
    </div>
  );
};

VenueDetail.propTypes = {
  getVenue: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.listVenue,
});

export default connect(mapStateToProps, { getVenue })(VenueDetail);
