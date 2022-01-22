import { React, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Alert.scss";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Fragment>
      {/* <section className="container"> */}
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
      {/* </section> */}
    </Fragment>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
