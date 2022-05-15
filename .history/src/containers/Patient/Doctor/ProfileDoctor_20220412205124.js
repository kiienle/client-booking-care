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
        };
    }

    componentDidMount() {
        let result = this.getInforDoctor();
        console.log(result);
    }

    getInforDoctor = async () => {
        let id = this.props.doctorId;
        if (id) {
            let res = await getProfileDoctor(id);
            return res;
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { language } = this.props;
        return <div className="doctor-schedule-container"></div>;
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
