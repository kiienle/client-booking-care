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
        this.state = {};
    }

    async componentDidMount() {
        // this.setState({
        // })
    }

    getExtraInforDoctor = async () => {
        let res = await getExtraInforDoctorById(this.props.doctorId);
        console.log(res);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({});
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
