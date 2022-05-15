import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { getProfileDoctor } from "../../../services/userService";
import moment from "moment";
import * as actions from "../../../store/actions";
import "./ProfileDoctor.scss";
import _ from "lodash";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: {},
            positonDoctor: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataDoctor: data,
            positonDoctor: data.positionData,
        });
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctor(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataDoctor: data,
                positonDoctor: data.positionData,
            });
        }
    }

    render() {
        let { language, dataTime } = this.props;
        let { dataDoctor, positonDoctor } = this.state;
        let doctorName =
            language === LANGUAGES.VI
                ? `${positonDoctor.valueVi} ${dataDoctor.firstName} ${dataDoctor.lastName}`
                : `${positonDoctor.valueEn} ${dataDoctor.lastName} ${dataDoctor.firstName}`;
        let timeVi = this.capitalizeFirstLetter(
            moment.unix(dataTime.date / 1000).format("dddd - DD-MM-YYYY")
        );
        let timeEn = moment
            .unix(dataTime.date / 1000)
            .locale("en")
            .format("ddd - DD-MM-YYYY");
        let date =
            language === LANGUAGES.VI
                ? `${dataTime.timeTypeData.valueVi} - ${timeVi}`
                : `${dataTime.timeTypeData.valueEn} - ${timeEn}`;
        let price =
            dataDoctor &&
            !_.isEmpty(dataDoctor) &&
            !_.isEmpty(dataDoctor.Doctor_Infor) &&
            language === LANGUAGES.VI
                ? dataDoctor.Doctor_Infor.priceTypeData.valueVi
                : dataDoctor.Doctor_Infor.priceTypeData.valueEn;

        let addressClinic =
            dataDoctor &&
            !_.isEmpty(dataDoctor) &&
            !_.isEmpty(dataDoctor.Doctor_Infor)
                ? dataDoctor.Doctor_Infor.addressClinic
                : "";
        let nameClinic =
            dataDoctor &&
            !_.isEmpty(dataDoctor) &&
            !_.isEmpty(dataDoctor.Doctor_Infor)
                ? dataDoctor.Doctor_Infor.nameClinic
                : "";
        return (
            <div className="doctor-profile-container">
                <div
                    className="content-left"
                    style={{
                        backgroundImage: `url(${
                            dataDoctor && dataDoctor.image
                                ? dataDoctor.image
                                : ""
                        })`,
                    }}
                ></div>
                <div className="content-right">
                    <div className="doctor-title">{doctorName}</div>
                    <div className="clinic-infor">
                        <div className="name-clinic">{nameClinic}</div>
                        <div className="detail-address">{addressClinic}</div>

                        <div className="price">
                            <div className="price-infor">
                                <FormattedMessage id="admin.manage-doctor.price" />
                                :
                                <span>
                                    {language === LANGUAGES.VI && price
                                        ? `${price
                                              .toString()
                                              .replace(
                                                  /\B(?=(\d{3})+(?!\d))/g,
                                                  "."
                                              )} Vnd`
                                        : `${price} $`}
                                </span>
                            </div>
                        </div>
                        <div className="doctor-schedule-time">{date}</div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
