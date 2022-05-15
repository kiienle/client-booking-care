import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import Logo from "../../assets/images/bookingcare-2020.svg";

className HomeHeader extends Component {
    render() {
        return (
            <div classNameName="home-header-container">
                <div classNameName="home-header-content">
                    <div classNameName="left-content">
                        <i className="fas fa-bars menu-icon"></i>
                        <div classNameName="header-logo"></div>
                    </div>
                    <div classNameName="center-content">
                        <div classNameName="child-content">
                            <div>
                                <b>Chuyên khoa</b>
                            </div>
                            <div classNameName="subs-title">
                                Tìm bác sĩ theo chuyên khoa
                            </div>
                        </div>
                        <div classNameName="child-content">
                            <div>
                                <b>Cơ sở y tế</b>
                            </div>
                            <div classNameName="subs-title">
                                Chọn bệnh viện phòng khám
                            </div>
                        </div>
                        <div classNameName="child-content">
                            <div>
                                <b>Bác sĩ</b>
                            </div>
                            <div classNameName="subs-title">Chọn bác sĩ giỏi</div>
                        </div>
                        <div classNameName="child-content">
                            <div>
                                <b>Gói khám</b>
                            </div>
                            <div classNameName="subs-title">
                                Khám sức khỏe tổng quát
                            </div>
                        </div>
                    </div>
                    <div classNameName="right-content">
                        <div classNameName="supports">
                            <i className="fas fa-question-circle"></i>
                            Hỗ trợ
                        </div>
                        <div classNameName="flag">VN</div>
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
