import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Specialty.scss";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";

class Specialty extends Component {
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
                <div className="specialty-body">
                    <div className="specialty-header">
                        <h2 className="specialty-title">
                            Chuyên khoa phổ biến
                        </h2>
                        <a href="" className="specialty-more">
                            Xem Thêm
                        </a>
                    </div>
                    <Slider {...settings}>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 1</h3>
                        </div>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 2</h3>
                        </div>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 3</h3>
                        </div>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 4</h3>
                        </div>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 5</h3>
                        </div>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 6</h3>
                        </div>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 7</h3>
                        </div>
                        <div className="specialty-content">
                            <img className="specialty-img" src={specialtyImg} />
                            <h3 className="specialty-name">Cơ xương khớp 8</h3>
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

export default connect(mapStateToProps)(Specialty);
