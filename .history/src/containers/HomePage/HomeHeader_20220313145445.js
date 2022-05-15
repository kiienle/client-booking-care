import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import Logo from "../../assets/images/bookingcare-2020.svg";

class HomeHeader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars menu-icon"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="home-header.speciality" />
                                        Chuyên khoa
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.searchdoctor" />
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="home-header.health-facility" />
                                        Cơ sở y tế
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-room" />
                                    Chọn bệnh viện phòng khám
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        {" "}
                                        <FormattedMessage id="home-header.doctor" />
                                        Bác sĩ
                                    </b>
                                </div>
                                <div className="subs-title">
                                    Chọn bác sĩ giỏi
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>Gói khám</b>
                                </div>
                                <div className="subs-title">
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <a>
                                    <i className="fas fa-question-circle"></i>
                                    Hỗ trợ
                                </a>
                            </div>
                            <div className="language-vn">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title-heading">NỀN TẢNG Y TẾ</div>
                        <div className="title-subs-heading">
                            CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                        </div>
                        <div className="search">
                            <i className="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Tìm chuyên khoa khám bệnh"
                            />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Khám
                                    <br />
                                    Chuyên khoa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Khám <br /> từ xa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Khám <br /> tổng quát
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Xét nghiệm <br /> y học
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Sức khỏe <br /> tinh thần
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Khám <br /> nha khoa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">Khám nha khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">Khám nha khoa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
