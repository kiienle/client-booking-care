import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../Header/Header";

class ManageSchedule extends Component {
    render() {
        return (
            <React.Fragment>
                {/* {isLoggedIn && <Header />} */}
                <Header />
                <div className="ManageScheduke-container">Manage Schedule</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
