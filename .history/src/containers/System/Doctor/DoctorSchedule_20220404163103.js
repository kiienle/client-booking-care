import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorSchedule.scss";
import { getDetailDoctor } from "../../../services/userService";

// import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
    // let history = useHistory();
    constructor(props) {
        super(props);
        this.state = {
            DoctorSchedule: {},
        };
    }
    async componentDidMount() {
        // console.log(this.props.match.params.id);
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            const id = this.props.match.params.id;
            let detailDoctor = await getDetailDoctor(id);
            // this.props.getDoctorInforById(id);
            // console.log(this.props.DoctorSchedule);
            // console.log(detailDoctor);
            this.setState({
                DoctorSchedule: detailDoctor.data,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("component re-render");
        // if (prevProps.DoctorSchedule !== this.props.DoctorSchedule) {
        //     this.setState({
        //         DoctorSchedule: this.props.DoctorSchedule,
        //     });
        // }
    }
    render() {
        let { DoctorSchedule } = this.state;
        // console.log(DoctorSchedule.Markdown.description);
        // console.log(DoctorSchedule.image);
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${
                                    DoctorSchedule && DoctorSchedule.image
                                        ? DoctorSchedule.image
                                        : ""
                                })`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up">Phó giáo sư Lê Văn A</div>
                            <div className="down">
                                {DoctorSchedule.Markdown &&
                                    DoctorSchedule.Markdown.description && (
                                        <span>
                                            {
                                                DoctorSchedule.Markdown
                                                    .description
                                            }
                                        </span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor"></div>
                    <div className="detail-infor-doctor">
                        <div className="infor-doctor-content">
                            {DoctorSchedule.Markdown &&
                                DoctorSchedule.Markdown.contentHTML && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DoctorSchedule.Markdown
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
        DoctorSchedule: state.admin.DoctorSchedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
