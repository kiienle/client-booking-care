import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import Logo from "../../assets/images/bookingcare-2020.svg";

class HomeHeader extends Component {
    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                    <div className="center-content"></div>
                    <div className="right-content"></div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
