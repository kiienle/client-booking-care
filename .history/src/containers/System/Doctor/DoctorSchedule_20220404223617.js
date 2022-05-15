import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGAUGE } from "../../../utils";
import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        };
    }

    async componentDidMount() {
        let language = this.props;

        console.log(moment(new Date()).format("dddd - DD/MM"));
        console.log(moment(new Date()).locale("en").format("ddd - DD/MM"));

        let aeeDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = moment(new Date())
                .add(i, "days")
                .format("dddd - DD/MM");
            object.value = moment(new Date())
                .add(i, "days")
                .startOf("days")
                .valueOf();
        }
    }
    render() {
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select>
                        <option>Thứ 2</option>
                        <option>Thứ 3</option>
                        <option>Thứ 4</option>
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
