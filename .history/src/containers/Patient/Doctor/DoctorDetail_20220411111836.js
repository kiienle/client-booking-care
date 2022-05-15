import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: this.props.match.params.id,
            doctorDetail: {},
            positionDoctor: {},
        };
    }
    async componentDidMount() {
        await this.props.getDoctorInforById(this.props.match.params.id);
        this.setState({
            doctorDetail: this.props.doctorDetailRedux.data,
            positionDoctor: this.props.doctorDetailRedux.data.positionData,
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

    async componentDidUpdate(prevProps, prevState) {
        // console.log("component re-render");
        if (prevProps.doctorDetailRedux !== this.props.doctorDetailRedux) {
            this.setState({
                doctorDetail: this.props.doctorDetailRedux.data,
                positionDoctor: this.props.doctorDetailRedux.data.positionData,
            });
        }
        if (this.props.language !== prevProps.language) {
            await this.props.getDoctorInforById(this.props.match.params.id);
            this.setState({
                doctorDetail: this.props.doctorDetailRedux.data,
                positionDoctor: this.props.doctorDetailRedux.data.positionData,
            });
        }
    }

    render() {
        let { doctorDetail, positionDoctor } = this.state;
        let { language } = this.props;

        let nameVi = `${positionDoctor.valueVi} ${doctorDetail.firstName} ${doctorDetail.lastName}`;
        let nameEn = `${positionDoctor.valueEn} ${doctorDetail.lastName} ${doctorDetail.firstName} `;

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
                            <div className="up">
                                {positionDoctor &&
                                positionDoctor.valueEn &&
                                language === LANGUAGES.VI &&
                                positionDoctor.valueVi
                                    ? nameVi
                                    : nameEn}
                            </div>
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
                            <DoctorSchedule doctorId={this.state.doctorId} />
                        </div>
                        <div className="content-right">
                            <div className="doctor-extra-infor">
                                <DoctorExtraInfor
                                    doctorId={this.state.doctorId}
                                />
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
