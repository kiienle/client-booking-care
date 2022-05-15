import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

import Select from "react-select";
import "./ManageSchedule.scss";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
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
    }
    render() {
        console.log("kien le check state: ", this.state.selectedDoctor);
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
        language: state.app.language,
        doctorsRedux: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
