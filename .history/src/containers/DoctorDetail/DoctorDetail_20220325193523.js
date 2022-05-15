import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import { LANGUAGES } from "../../utils";

import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo);

        return <div className="header-container"></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctorDetail: state.app.doctorDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
