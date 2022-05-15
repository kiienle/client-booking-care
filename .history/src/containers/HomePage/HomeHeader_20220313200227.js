import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import Logo from "../../assets/images/bookingcare-2020.svg";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        let language = this.props.language;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
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
                                        <FormattedMessage id="homeheader.speciality" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="menu-title">
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <a>
                                    <i className="fas fa-question-circle"></i>
                                    <FormattedMessage id="homeheader.support" />
                                </a>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? "language-vi active"
                                        : "language"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.VI)
                                    }
                                >
                                    VI
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? "language-en active"
                                        : "language"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title-heading">
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className="title-subs-heading">
                            <FormattedMessage id="banner.title2" />
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
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
