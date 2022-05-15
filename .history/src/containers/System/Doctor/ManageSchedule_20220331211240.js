import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {/* {isLoggedIn && <Header />} */}
                <Header />
                <div className="Doctor-container">
                    <div className="Doctor-list">
                        <Switch>
                            <Route
                                path="/doctor/manage-schedule"
                                component={UserManage}
                            />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        DoctorMenuPath: state.app.DoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
