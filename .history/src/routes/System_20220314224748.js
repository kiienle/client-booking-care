import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import state.user.isLoggedIn from "../containers/System/state.user.isLoggedIn";
import Header from "../containers/Header/Header";

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {/* {isLoggedIn && <Header />} */}
                <Header />
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/system/user-manage"
                                component={UserManage}
                            />
                            <Route
                                path="/system/user-redux"
                                component={state.user.isLoggedIn}
                            />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
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
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);