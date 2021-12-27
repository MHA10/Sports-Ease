import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import grass from "../../img/grass.jpg";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getVenues } from "../../actions/listVenue";

const ListVenues = ({ getVenues, venue: { venues, loading } }) => {
  useEffect(() => {
    getVenues();
  }, [getVenues]);

  const renderVenueData = () => {
    return venues.map((venue, index) => {
      const { _id, name, address } = venue; //destructuring
      return (
        // Passing the venue as prop within Link
        <Link to={{ pathname: `/venue-detail/${_id}`, venue: venue }}>
          <div className="column">
            <div className="card">
              <img src={grass} alt="Avatar" className="center" />
              <div className="container">
                <h4>
                  <b>{name}</b>
                </h4>
                <p>{address}</p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  return <div>{renderVenueData()}</div>;
};

ListVenues.propTypes = {
  getVenues: PropTypes.func.isRequired,
  venues: PropTypes.object,
};

const mapStateToProps = (state) => ({
  venue: state.listVenue,
});

export default connect(mapStateToProps, { getVenues })(ListVenues);
