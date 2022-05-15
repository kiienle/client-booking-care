import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extraInfor: {},
            isShowMoreInfor: false,
            priceTypeData: {},
        };
    }

    async componentDidMount() {
        let res = await getExtraInforDoctorById(this.props.doctorId);
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.extraInforDoctor,
                priceTypeData: res.extraInforDoctor.priceTypeData,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            // this.setState({});
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraInforDoctorById(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.extraInforDoctor,
                });
            }
        }
    }

    handleShowDetailInfor = () => {
        this.setState({
            isShowMoreInfor: !this.state.isShowMoreInfor,
        });
    };

    render() {
        let { language } = this.props;
        let { extraInfor, isShowMoreInfor, priceTypeData } = this.state;
        return (
            <div className="doctor-extra-infor-container">
                <h3 className="text-title">
                    <FormattedMessage id="admin.manage-doctor.clinic-address" />
                </h3>
                <div className="name-clinic">
                    {extraInfor && extraInfor.nameClinic
                        ? extraInfor.nameClinic
                        : ""}
                </div>
                <div className="detail-address">
                    {extraInfor && extraInfor.addressClinic
                        ? extraInfor.addressClinic
                        : ""}
                </div>
                {isShowMoreInfor === false && (
                    <div className="content-price">
                        <h3 className="text-title">
                            <FormattedMessage id="admin.manage-doctor.price" />:{" "}
                            <span>
                                {priceTypeData &&
                                    priceTypeData.valueVi &&
                                    priceTypeData.valueVi
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </span>
                            <sup>đ</sup>.
                        </h3>
                        <a
                            className="more-detail-infor"
                            onClick={() => this.handleShowDetailInfor()}
                        >
                            <FormattedMessage id="patient.detail-doctor.more-detail-price" />
                        </a>
                    </div>
                )}
                {isShowMoreInfor === true && (
                    <div className="content-price">
                        <h3 className="text-title">
                            <FormattedMessage id="admin.manage-doctor.price" />:
                        </h3>
                        <div className="price-detail">
                            <div className="price-infor">
                                <p>
                                    <FormattedMessage id="admin.manage-doctor.price" />
                                    :
                                </p>
                                <p>
                                    {priceTypeData &&
                                        priceTypeData.valueVi &&
                                        priceTypeData.valueVi
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                "."
                                            )}
                                    <sup>đ</sup>
                                </p>
                            </div>
                            <div className="note-price">
                                {extraInfor && extraInfor.note
                                    ? extraInfor.note
                                    : ""}
                            </div>
                        </div>
                        <a
                            className="more-detail-infor"
                            onClick={() => this.handleShowDetailInfor()}
                        >
                            <FormattedMessage id="patient.detail-doctor.hide-detail-price" />
                        </a>
                    </div>
                )}
                <div className="price"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
