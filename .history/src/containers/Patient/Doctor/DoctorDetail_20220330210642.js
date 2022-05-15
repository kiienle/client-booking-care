import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorDetail.scss";
import { getDetailDoctor } from "../../../services/userService";

// import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    // let history = useHistory();
    constructor(props) {
        super(props);
        this.state = {
            doctorDetail: {},
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
                    <div className="schedule-doctor"></div>
                    <div className="detail-infor-doctor">
                        {/* {doctorDetail.Markdown.contentMarkdown} */}
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
