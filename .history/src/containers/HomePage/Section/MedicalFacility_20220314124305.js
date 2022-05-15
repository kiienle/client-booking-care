import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import doctorAvatar from "../../../assets/MedicalFacility/anh-dai-dien-bs.jpg";
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
            <div className="section-specialty">
                <div className="section-body">
                    <div className="section-header">
                        <h2 className="section-title">Chuyên khoa phổ biến</h2>
                        <a href="" className="section-more">
                            Xem Thêm
                        </a>
                    </div>
                    <Slider {...settings}>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 1</h3>
                        </div>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 2</h3>
                        </div>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 3</h3>
                        </div>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 4</h3>
                        </div>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 5</h3>
                        </div>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 6</h3>
                        </div>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 7</h3>
                        </div>
                        <div className="section-content">
                            <img className="section-img" src={doctorAvatar} />
                            <h3 className="section-name">Cơ xương khớp 8</h3>
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
