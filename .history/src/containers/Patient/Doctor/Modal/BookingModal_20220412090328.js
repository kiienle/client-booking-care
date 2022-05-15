import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "../../../../store/actions";
import "./BookingModal.scss";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { language, isShowModalBooking, closeModal, dataTime } = this.props;
        return (
            <Modal
                toggle={closeModal}
                centered
                isOpen={isShowModalBooking}
                className="booking-modal-container"
                size="lx"
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
                        <div className="doctor-infor"></div>
                        <div className="price">Giá khám: 350.000đ</div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <div className="user-input">
                                    <i class="fas fa-user"></i>
                                    <input type="text" className="text-form" />
                                </div>
                            </div>
                            <div className="col-6 form-group">
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
