import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorSchedule.scss";
import { getDetailDoctor } from "../../../services/userService";

// import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
    render() {
        return <div className="doctor-detail-container"></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        DoctorSchedule: state.admin.DoctorSchedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
