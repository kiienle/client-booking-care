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
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="home-header.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="home-header.fee" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <a>
                                    <i className="fas fa-question-circle"></i>
                                    <FormattedMessage id="home-header.support" />
                                </a>
                            </div>
                            <div className="language-vi">VI</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title-heading">N???N T???NG Y T???</div>
                        <div className="title-subs-heading">
                            CH??M S??C S???C KH???E TO??N DI???N
                        </div>
                        <div className="search">
                            <i className="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="T??m chuy??n khoa kh??m b???nh"
                            />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Kh??m
                                    <br />
                                    Chuy??n khoa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Kh??m <br /> t??? xa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Kh??m <br /> t???ng qu??t
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    X??t nghi???m <br /> y h???c
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    S???c kh???e <br /> tinh th???n
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">
                                    Kh??m <br /> nha khoa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">Kh??m nha khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"></div>
                                <div className="text-child">Kh??m nha khoa</div>
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
