import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { getProfileDoctor } from "../../../services/userService";
import moment from "moment";
import * as actions from "../../../store/actions";
import "./ProfileDoctor.scss";

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
        let nameVi = `${positonDoctor.valueVi} ${dataDoctor.firstName} ${dataDoctor.lastName}`;
        let nameEn = `${positonDoctor.valueEn} ${dataDoctor.lastName} ${dataDoctor.firstName}`;
        console.log(dataTime);
        let timeVi = this.capitalizeFirstLetter(
            moment.unix(dataTime.date / 1000).format("dddd - DD-MM-YYYY")
        );
        let timeEn = moment
            .unix(dataTime.date / 1000)
            .locale("en")
            .format("ddd - DD-MM-YYYY");
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
                    <div className="doctor-title">
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div>
                    <div className="doctor-schedule-time">
                        {language === LANGUAGES.VI
                            ? `${dataTime.timeTypeData.valueVi} - ${timeVi}`
                            : `${dataTime.timeTypeData.valueEn} - ${timeEn}`}
                    </div>
                </div>
                <div className="price">
                    <label className="label-price">
                        <input type="radio" />
                        <span>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </span>
                        <div></div>
                    </label>
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
