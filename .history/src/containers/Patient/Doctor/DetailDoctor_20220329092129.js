import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";

// import "./DoctorDetail.scss";

class DoctorDetail extends Component {
    // let history = useHistory();
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        this.props.getDoctorInforById(id);
    }
    render() {
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">doctor detail</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctorDetail: state.admin.doctorDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorInforById: (id) => dispatch(actions.getDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
