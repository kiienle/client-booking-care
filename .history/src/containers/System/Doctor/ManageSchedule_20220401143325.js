import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";

import Select from "react-select";
import "./ManageSchedule.scss";

class ManageSchedule extends Component {
    componentDidMount() {
        this.props.fetchAllDoctors();
    }
    render() {
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
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Chọn bác sĩ</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-12 pick-hour-container"></div>
                            <button className="btn btn-primary">
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: (id) => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
