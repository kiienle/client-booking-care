import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import avatarDoctor from "../../../assets/Doctor/avatar-bs.jpg";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import medicalFacility from "../../../assets/MedicalFacility/bv-viet-duc.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacility.scss";
import * as actions from "../../../store/actions";

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    handleShowDoctorDetail = (id) => {
        // this.props.getDoctorInforById(id);
        // history.pushState(`/users/:${id}`);
        this.props.history.push(`/detail-doctor/${id}`);
    };

    render() {
        // console.log(this.props.topDoctorsRedux);
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        };
        let arrDoctors = this.state.arrDoctors;
        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
        let { language } = this.props;
        return (
            <div className="section-share section-doctor">
                <div className="section-body">
                    <div className="section-header">
                        <h2 className="section-title">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </h2>
                        <a href="" className="section-more">
                            <FormattedMessage id="homepage.more-info" />
                        </a>
                    </div>
                    <Slider {...settings}>
                        {arrDoctors &&
                            arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                // if (index == 0) {
                                // }
                                let imageBase64 = "";
                                if (item.image) {
                                    console.log(item.image);
                                    imageBase64 = new Buffer(
                                        item.image,
                                        "base64"
                                    ).toString("binary");
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div
                                        key={index}
                                        className="section-content"
                                        onClick={() =>
                                            this.handleShowDoctorDetail(item.id)
                                        }
                                    >
                                        <div className="section-img">
                                            <img
                                                className="avatar-img"
                                                src={imageBase64}
                                            />
                                        </div>
                                        <h3 className="section-name">
                                            <div>
                                                {language === LANGUAGES.VI
                                                    ? nameVi
                                                    : nameEn}
                                            </div>
                                        </h3>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
        // getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
