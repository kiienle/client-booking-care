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
        };
    }

    async componentDidMount() {
        this.setArrDate();
    }

    setArrDate = async () => {
        let { language } = this.props;
        console.log(moment(new Date()).format("dddd - DD/MM"));
        console.log(moment(new Date()).locale("en").format("ddd - DD/MM"));

        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date())
                    .add(i, "days")
                    .format("dddd - DD/MM");
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

        let res = await getScheduleDoctorByDate(42, 1649178000000);
        console.log("check res Schedule from react: ", res);

        this.setState({
            allDays: arrDate,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDate();
        }
    }

    handleChangeDateSelect = (date) => {
        const id = this.props.match.params.id;
        console.log(date);
    };
    render() {
        let { allDays } = this.state;
        // let { doctorSchedule } = this.props;
        console.log(allDays);
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select
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
                <div className="all-available-time"></div>
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
