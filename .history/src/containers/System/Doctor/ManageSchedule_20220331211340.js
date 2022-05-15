import React, { Component } from "react";
import { connect } from "react-redux";

class ManageSchedule extends Component {
    render() {
        return (
            <React.Fragment>
                {/* {isLoggedIn && <Header />} */}
                <Header />
                <div className="ManageScheduke-container">
                   Manage Schedule
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ManageScheduleMenuPath: state.app.ManageScheduleMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
