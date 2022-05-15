import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { getExtraInforDoctorById } from "../../../services/userService";
import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extraInfor: {},
        };
    }

    componentDidMount() {
        this.getExtraInforDoctor();
    }

    getExtraInforDoctor = async () => {
        let data = await getExtraInforDoctorById(this.props.doctorId);
        this.setState({
            extraInfor: data.extraInforDoctor,
        });
        console.log(this.state.extraInfor);
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({});
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await getExtraInforDoctorById(this.props.doctorId);
            this.setState({
                extraInfor: data.extraInforDoctor,
            });
        }
    }

    render() {
        let { language } = this.props;
        return (
            <div className="doctor-extra-infor-container">
                <h3>Địa chỉ khám</h3>
                <div className="name-clinic"></div>
                <div className="address-clinic"></div>
                <div className="price"></div>
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
