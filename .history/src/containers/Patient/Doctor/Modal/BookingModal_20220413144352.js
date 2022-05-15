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

        let currentTime = new Date(1649869200);
        console.log(moment.unix(1649869200).format("DD-MM-YYYY X"));
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
                        <div className="price">Giá khám: 350.000đ</div>
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
                                        Hãy ghi rõ Họ Và Tên, viết hoa những chữ
                                        cái đầu tiên, ví dụ: Trần Văn Phú
                                    </span>
                                ) : (
                                    <>
                                        <div className="validate">
                                            Hãy ghi rõ Họ Và Tên, viết hoa những
                                            chữ cái đầu tiên, ví dụ: Trần Văn
                                            Phú
                                            <div>Vui lòng nhập thông tin</div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="col-12 form-group">
                                <label>Họ và Tên</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn btn-primary btn-booking-confirm">
                            Xác nhận
                        </button>
                        <button
                            onClick={closeModal}
                            className="btn btn-warning btn-booking-cancel"
                        >
                            Hủy
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
