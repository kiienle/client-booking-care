import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorDetail.scss";
import {
    getDetailDoctor,
    getScheduleDoctor,
} from "../../../services/userService";
import DoctorSchedule from "../../System/Doctor/DoctorSchedule";
import { LANGUAGES } from "../../../utils";
import DoctorExtraInfor from "../../System/Doctor/DoctorExtraInfor";

// import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    // let history = useHistory();
    constructor(props) {
        super(props);
        this.state = {
            doctorId: this.props.match.params.id,
            doctorDetail: {},
        };
    }
    componentDidMount() {
        this.props.getDoctorInforById(this.state.doctorId);
        console.log(this.props.doctorDetailRedux);
        this.setState({
            doctorDetail: this.props.doctorDetailRedux,
        });
        // console.log(this.props.match.params.id);
        // if (
        //     this.props.match &&
        //     this.props.match.params &&
        //     this.props.match.params.id
        // ) {
        //     let detailDoctor = await getDetailDoctor(
        //         this.props.match.params.id
        //     );
        //     if (detailDoctor && detailDoctor.errCode === 0) {
        //         this.setState({
        //             doctorDetail: detailDoctor.data,
        //         });
        //     }

        //     console.log(this.state);
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("component re-render");
        // if (prevProps.doctorDetailRedux !== this.props.doctorDetailRedux) {
        //     this.setState({
        //         doctorDetail: this.props.doctorDetailRedux,
        //     });
        // }
    }

    render() {
        let { doctorDetail } = this.state;
        let { language } = this.props;
        // let viName = `${doctorDetail.positionData.valueVi} ${doctorDetail.firstName} ${doctorDetail.lastName}`;
        let positionData = doctorDetail.positionData;
        console.log(positionData);
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${
                                    doctorDetail && doctorDetail.image
                                        ? doctorDetail.image
                                        : ""
                                })`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up"></div>
                            <div className="down">
                                {doctorDetail.Markdown &&
                                    doctorDetail.Markdown.description && (
                                        <span>
                                            {doctorDetail.Markdown.description}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule doctorId={this.state.id} />
                        </div>
                        <div className="content-right">
                            <div className="doctor-extra-infor">
                                <DoctorExtraInfor doctorId={this.state.id} />
                            </div>
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        <div className="infor-doctor-content">
                            {doctorDetail.Markdown &&
                                doctorDetail.Markdown.contentHTML && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: doctorDetail.Markdown
                                                .contentHTML,
                                        }}
                                    ></div>
                                )}
                        </div>
                    </div>
                    <div className="comment-doctor"></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctorDetailRedux: state.admin.doctorDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
