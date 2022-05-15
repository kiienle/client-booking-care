import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { getProfileDoctor } from "../../../services/userService";
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
        let { language } = this.props;
        let { dataDoctor } = this.state;
        let nameVi = `${dataDoctor.positionData.valueVi}`;
        console.log(dataDoctor.positionData);
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
                    <div className="doctor-title"></div>
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
