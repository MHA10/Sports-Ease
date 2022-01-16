import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getVenue } from "../../actions/listVenue";
import { deleteVenue } from "../../actions/venue";
import grass from "../../img/grass.jpg";

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
  }, []);
  if (venue == undefined) {
    return null;
  }

  const { _id, name, address } = venue;
  const isAdminOptions = (
    <Fragment>
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
    </Fragment>
  );
  return (
    <div className="card">
      {<Fragment>{isAdmin ? isAdminOptions : null}</Fragment>}
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
