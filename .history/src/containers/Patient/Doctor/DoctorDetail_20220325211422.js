import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";

// import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo);

        return <div className="header-container">detail Doctor</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
