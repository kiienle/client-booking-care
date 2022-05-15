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
                <div className="specialty-content">
                    <Slider {...settings}>
                        <div className="img-customize">
                            <h3>1</h3>
                        </div>
                        <div className="img-customize">
                            <h3>2</h3>
                        </div>
                        <div className="img-customize">
                            <h3>3</h3>
                        </div>
                        <div className="img-customize">
                            <h3>4</h3>
                        </div>
                        <div className="img-customize">
                            <h3>5</h3>
                        </div>
                        <div className="img-customize">
                            <h3>6</h3>
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
