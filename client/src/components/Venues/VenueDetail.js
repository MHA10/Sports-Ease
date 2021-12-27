import React from "react";
import { PropTypes } from "prop-types";
import grass from "../../img/grass.jpg";

const VenueDetail = (props) => {
  const { name, address } = props.location.venue;
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
  venue: PropTypes.object,
};

export default VenueDetail;
