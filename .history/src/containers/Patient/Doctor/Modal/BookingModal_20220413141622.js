import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../../store/actions";
import "./BookingModal.scss";
import _ from "lodash";
import moment from "moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: "",
            isValid: false,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnBlurInput = (value) => {
        if (!value && value === "") {
            this.setState({
                isValid: true,
            });
        } else {
            this.setState({
                isValid: false,
            });
        }
    };

    handleOnFocusInput = () => {
        this.setState({
            isValid: false,
        });
    };

    render() {
        let { isValid } = this.state;
        let { language, isShowModalBooking, closeModal, dataTime } = this.props;
        let doctorId =
            dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";

        let currentTime = new Date(dataTime.date);
        console.log(dataTime);
        // var timestamp = moment.unix(dataTime.date);
        // console.log(timestamp.format("DD-MM-YYYY HH:mm:ss"));
        return (
            <Modal
                toggle={closeModal}
                centered
                isOpen={isShowModalBooking}
                className="booking-modal-container"
                size="lg"
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            Thong tin dat lich kham benh
                        </span>
                        <span onClick={closeModal} className="right">
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor doctorId={doctorId} />
                        </div>
                        <div className="price">Gi?? kh??m: 350.000??</div>
                        <div className="row">
                            <div className="col-12 form-group">
                                <div
                                    className={
                                        isValid
                                            ? "error-value user-input"
                                            : "valid-value user-input"
                                    }
                                >
                                    <i className="fas fa-user"></i>
                                    <input
                                        onFocus={() =>
                                            this.handleOnFocusInput()
                                        }
                                        onBlur={(e) =>
                                            this.handleOnBlurInput(
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        className="text-form"
                                    />
                                </div>
                                {isValid === false ? (
                                    <span className="validate">
                                        H??y ghi r?? H??? V?? T??n, vi???t hoa nh???ng ch???
                                        c??i ?????u ti??n, v?? d???: Tr???n V??n Ph??
                                    </span>
                                ) : (
                                    <>
                                        <div className="validate">
                                            H??y ghi r?? H??? V?? T??n, vi???t hoa nh???ng
                                            ch??? c??i ?????u ti??n, v?? d???: Tr???n V??n
                                            Ph??
                                            <div>Vui l??ng nh???p th??ng tin</div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="col-12 form-group">
                                <label>H??? v?? T??n</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn btn-primary btn-booking-confirm">
                            X??c nh???n
                        </button>
                        <button
                            onClick={closeModal}
                            className="btn btn-warning btn-booking-cancel"
                        >
                            H???y
                        </button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
