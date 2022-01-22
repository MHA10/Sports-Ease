import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import grass from "../../../img/grass.jpg";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getVenues } from "../../../actions/listVenue";
import "./ListVenues.scss";

const ListVenues = ({ getVenues, venue: { venues, loading }, history }) => {
  useEffect(() => {
    getVenues();
  }, [getVenues]);

  const renderVenueData = () => {
    return venues.map((venue, index) => {
      const { _id, name, address } = venue; //destructuring
      return (
        // Passing the venue id as prop within Link to
        <Link to={{ pathname: `/venue-detail/${_id}` }} key={_id}>
          <div className="column">
            <div className="card card-list">
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

  return (
    <Fragment>
      <section className="container">
        <div>
          <i
            className="fas fa-2x fa-arrow-circle-left back-list"
            onClick={() => {
              // Redirect to Dashboard on back
              history.push("/dashboard");
            }}
          ></i>
        </div>
        {renderVenueData()}
      </section>
    </Fragment>
  );
};

ListVenues.propTypes = {
  getVenues: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.listVenue,
});

export default connect(mapStateToProps, { getVenues })(ListVenues);
