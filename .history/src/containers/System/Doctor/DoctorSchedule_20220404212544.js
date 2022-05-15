import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";

// import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}
    render() {
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule"></div>
                <div className="all-available-time"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        DoctorSchedule: state.admin.DoctorSchedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
