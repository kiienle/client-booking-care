import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { getScheduleDoctorByDate } from "../../../services/userService";
import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        };
    }

    async componentDidMount() {
        let allDays = this.getArrDays();
        if (allDays && allDays.length > 0) {
            let res = await getScheduleDoctorByDate(
                this.props.doctorId,
                allDays[0].value
            );
            this.setState({
                allDays,
                allAvailableTime: res.dataSchedule ? res.dataSchedule : [],
            });
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    getArrDays = () => {
        let { language } = this.props;
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let DDMM = moment(new Date()).format("DD/MM");
                    let today = `Hôm nay - ${DDMM}`;
                    object.label = this.capitalizeFirstLetter(today);
                } else {
                    let labelVi = moment(new Date())
                        .add(i, "days")
                        .format("dddd - DD/MM");
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let DDMM = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("DD/MM");
                    let today = `Today - ${DDMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("ddd - DD/MM");
                }
            }
            object.value = moment(new Date())
                .add(i, "days")
                .startOf("days")
                .valueOf();

            arrDays.push(object);
        }

        return arrDays;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays();
            this.setState({
                allDays,
            });
        }
    }

    handleChangeDateSelect = async (date) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.dataSchedule ? res.dataSchedule : [],
                });
            }
        }
    };
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select
                        className="date-select"
                        onChange={(e) =>
                            this.handleChangeDateSelect(e.target.value)
                        }
                    >
                        {allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="schedule-calendar">
                        <span className="text-calendar">
                            <i className="fas fa-calendar-alt"></i>{" "}
                            <FormattedMessage id="patient.detail-doctor.schedule" />
                        </span>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                allAvailableTime.map((item) => {
                                    return (
                                        <React.Fragment>
                                            <button key={item.id}>
                                                {language === LANGUAGES.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn}
                                            </button>
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                        {allAvailableTime && allAvailableTime.length > 0 && (
                            <div>
                                Chọn <i class="fas fa-hand-point-up"></i> và đặt
                                (Phí đặt lịch 0<sup>đ</sup>)
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
