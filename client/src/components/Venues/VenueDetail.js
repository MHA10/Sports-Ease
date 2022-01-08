import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getVenue } from "../../actions/listVenue";
import grass from "../../img/grass.jpg";

const VenueDetail = ({
  getVenue,
  match: { params },
  venue: { venue },
  isAdmin,
}) => {
  useEffect(() => {
    getVenue(params.id);
  }, []);
  if (venue == undefined) {
    return null;
  }

  const { _id, name, address } = venue;
  return (
    <div className="card">
      {
        <Fragment>
          {isAdmin ? (
            <Link to={{ pathname: `/venue-edit/${_id}` }}>
              <i className="fas fa-edit card-edit"></i>
            </Link>
          ) : null}
        </Fragment>
      }
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
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.listVenue,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { getVenue })(VenueDetail);
