import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorDetail.scss";

// import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    // let history = useHistory();
    constructor(props) {
        super(props);
        this.state = {
            doctorDetail: {},
        };
    }
    componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            const id = this.props.match.params.id;
            this.props.getDoctorInforById(id);
            this.setState({
                doctorDetail: this.props.doctorDetail.data,
            });
        }
    }
    render() {
        let { doctorDetail } = this.state;
        console.log(doctorDetail);
        // console.log(doctorDetail.image);
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${doctorDetail.image})`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up"></div>
                            <div className="down"></div>
                        </div>
                    </div>
                    <div className="schedule-doctor"></div>
                    <div className="detail-infor-doctor"></div>
                    <div className="comment-doctor"></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctorDetail: state.admin.doctorDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
