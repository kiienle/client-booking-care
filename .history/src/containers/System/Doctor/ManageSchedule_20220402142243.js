import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { dateFormat, LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import Select from "react-select";
import "./ManageSchedule.scss";
import _, { transform } from "lodash";
import { toast } from "react-toastify";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchScheduleHours();
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let lableEn = `${item.lastName} ${item.firstName}`;
                let lableVi = `${item.firstName} ${item.lastName}`;
                object.label =
                    this.props.language === LANGUAGES.VI ? lableVi : lableEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorsRedux);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorsRedux);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map((item) => ({
                    ...item,
                    isSelected: false,
                }));
            }

            console.log(data);
            this.setState({
                rangeTime: this.props.allScheduleTime,
            });
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date,
        });
    };

    handleSelectedTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !time.isSelected;

                return item;
            });
            // console.log(data);
        }
        this.setState({
            rangeTime: rangeTime,
        });
    };

    handleSaveSchedule = () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!!!");
            return;
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!!!");
            return;
        }

        let formatedDate = moment(currentDate).format(
            dateFormat.SEND_TO_SERVER
        );

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                (item) => item.isSelected === true
            );

            console.log(selectedTime);
        }
        console.log(formatedDate);
    };

    render() {
        const { allScheduleTime, language } = this.props;
        const { rangeTime } = this.state;
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Chọn bác sĩ</label>
                                <Select
                                    // className="form-control"
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Chọn ngày</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate[0]}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                <div className="schedule-hours-list">
                                    {rangeTime &&
                                        rangeTime.length > 0 &&
                                        rangeTime.map((item, i) => (
                                            <button
                                                key={item.id}
                                                className={
                                                    item.isSelected
                                                        ? "btn-schedule active"
                                                        : "btn-schedule"
                                                }
                                                onClick={() =>
                                                    this.handleSelectedTime(
                                                        item
                                                    )
                                                }
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </button>
                                        ))}
                                </div>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctorsRedux: state.admin.allDoctors,
        allScheduleTime: state.admin.scheduleHours,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchScheduleHours: () => dispatch(actions.fetchScheduleHours()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
