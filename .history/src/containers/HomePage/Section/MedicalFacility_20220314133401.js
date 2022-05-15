import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import medicalFacility from "../../../assets/MedicalFacility/bv-viet-duc.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacility.scss";

class MedicalFacility extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        };
        return (
            <div className="section-share section-medical">
                <div className="section-body">
                    <div className="section-header">
                        <h2 className="section-title">Cơ sở y tế nổi bật</h2>
                        <a href="" className="section-more">
                            Xem Thêm
                        </a>
                    </div>
                    <Slider {...settings}>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức
                            </h3>
                        </div>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức 2
                            </h3>
                        </div>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức 3
                            </h3>
                        </div>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức 4
                            </h3>
                        </div>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức 5
                            </h3>
                        </div>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức 6
                            </h3>
                        </div>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức 7
                            </h3>
                        </div>
                        <div className="section-content">
                            <img
                                className="section-img"
                                src={medicalFacility}
                            />
                            <h3 className="section-name">
                                Bệnh viện Hữu nghị Việt Đức 8
                            </h3>
                        </div>
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
    };
};

export default connect(mapStateToProps)(MedicalFacility);
