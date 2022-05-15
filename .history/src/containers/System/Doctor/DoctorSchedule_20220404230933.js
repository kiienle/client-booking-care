import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        };
    }

    async componentDidMount() {
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

        this.setState({
            allDays: arrDate,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let { language } = this.props;
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

            this.setState({
                allDays: arrDate,
            });
        }
    }
    render() {
        let { allDays } = this.state;

        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select>
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
