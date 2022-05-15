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

// import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    // let history = useHistory();
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            doctorDetail: {},
            doctorSchedule: {}
        };
    }
    async componentDidMount() {
        // console.log(this.props.match.params.id);
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let detailDoctor = await getDetailDoctor(id);
            // this.props.getDoctorInforById(id);
            // console.log(this.props.doctorDetail);
            // console.log(detailDoctor);
            this.setState({
                doctorDetail: detailDoctor.data,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("component re-render");
        // if (prevProps.doctorDetail !== this.props.doctorDetail) {
        //     this.setState({
        //         doctorDetail: this.props.doctorDetail,
        //     });
        // }
    }

    getScheduleDoctor = async (id) => {
        let doctorSchedule = await getScheduleDoctor(id)
        this.setState({
            doctorSchedule
        })
    }
    render() {
        let { doctorDetail } = this.state;
        const id = this.props.match.params.id;

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
                            <div className="up">Phó giáo sư Lê Văn A</div>
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
                            <DoctorSchedule
                                doctorSchedule={}
                            />
                        </div>
                        <div className="content-right"></div>
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
        doctorDetail: state.admin.doctorDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
