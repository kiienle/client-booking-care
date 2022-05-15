import React, { Component } from "react";
import { connect } from "react-redux";
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
        this.setArrDate();
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    setArrDate = async () => {
        let { language } = this.props;
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date())
                    .add(i, "days")
                    .format("dddd - DD/MM");
                object.label = this.capitalizeFirstLetter(labelVi);
            } else {
                object.label = moment(new Date())
                    .add(i, "days")
                    .locale("en")
                    .format("ddd - DD/MM");
            }
            object.value = moment(new Date())
                .add(i, "days")
                .startOf("days")
                .valueOf();

            arrDate.push(object);
        }

        this.setState({
            allDays: arrDate,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDate();
        }
    }

    handleChangeDateSelect = async (date) => {
        let doctorId = this.props.doctorId;
        let res = await getScheduleDoctorByDate(doctorId, date);
        if (res && res.errCode === 0) {
            this.setState({
                allAvailableTime: res.dataSchedule ? res.dataSchedule : [],
            });
        } else {
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
                            <i className="fas fa-calendar-alt"></i> Lịch Khám
                        </span>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0
                                ? allAvailableTime.map((item) => {
                                      return (
                                          <button key={item.id}>
                                              {language === LANGUAGES.VI
                                                  ? item.timeTypeData.valueVi
                                                  : item.timeTypeData.valueEn}
                                          </button>
                                      );
                                  })
                                : "Bác sỹ không có lịch khám trong thời gian này"}
                        </div>
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
