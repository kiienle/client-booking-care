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
                        <i class="fas fa-bars menu-icon"></i>
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div>
                                <b>Chuyên khoa</b>
                            </div>
                            <div className="subs-title">
                                Tìm bác sĩ theo chuyên khoa
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>Cơ sở y tế</b>
                            </div>
                            <div className="subs-title">
                                Chọn bệnh viện phòng khám
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>Bác sĩ</b>
                            </div>
                            <div className="subs-title">Chọn bác sĩ giỏi</div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>Gói khám</b>
                            </div>
                            <div className="subs-title">
                                Khám sức khỏe tổng quát
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="supports">
                            <i class="fas fa-circle-question"></i>
                        </div>
                    </div>
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
