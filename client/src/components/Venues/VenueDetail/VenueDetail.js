import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getVenue } from "../../../actions/listVenue";
import { deleteVenue } from "../../../actions/venue";
import grass from "../../../img/grass.jpg";
import "./VenueDetail.scss";

const VenueDetail = ({
  getVenue,
  deleteVenue,
  match: { params },
  venue: { venue },
  isAdmin,
  history,
}) => {
  useEffect(() => {
    getVenue(params.id);
  }, [getVenue, params.id]);

  if (venue === undefined || venue === null) {
    return null;
  }

  const { _id, name, address } = venue;
  const isAdminOptions = (
    <Fragment>
      <div>
        <Link to={{ pathname: `/venue-edit/${_id}` }}>
          <i className="fas fa-edit card-edit"></i>
        </Link>
        <i
          className="fas fa-trash card-edit-del"
          onClick={() =>
            deleteVenue({ _id }).then(() => {
              // Refresh the venues list after deletion
              history.push("/list-venues");
            })
          }
        ></i>
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      <section className="container">
        <i
          className="fas fa-2x fa-arrow-circle-left back-list"
          onClick={() => {
            // Redirect to Venue List on back
            history.push("/list-venues");
          }}
        ></i>
        <div className="card card-detail">
          {<Fragment>{isAdmin ? isAdminOptions : null}</Fragment>}
          <img src={grass} alt="Avatar" className="center" />
          <div className="container">
            <h4>
              <b>{name}</b>
            </h4>
            <p>{address}</p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

VenueDetail.propTypes = {
  getVenue: PropTypes.func.isRequired,
  deleteVenue: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  venue: state.listVenue,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { getVenue, deleteVenue })(VenueDetail);
