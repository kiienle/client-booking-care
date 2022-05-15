import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES } from "../../../utils";
import { getDetailDoctor } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasOldValue: false,
            action: "",
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedDoctor: "",
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            nameClinic: "",
            addressClinic: "",
            note: "",

            listDoctors: [],
            listPrices: [],
            listProvinces: [],
            listPayments: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllPrices();
    }

    componentDidUpdate(prevProps, prevState) {
        let { resPrice, resPayment, resProvince } =
            this.props.allRequiredDoctorInfor;
        if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
            let listDoctors = this.buildDataInputSelect(
                this.props.doctorsRedux,
                "USER"
            );
            this.setState({
                listDoctors,
            });
        }
        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectProvince = this.buildDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            let dataSelectPayment = this.buildDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            this.setState({
                listPrices: dataSelectPrice,
                listPayments: dataSelectPayment,
                listProvinces: dataSelectProvince,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelectDoctor = this.buildDataInputSelect(
                this.props.doctorsRedux,
                "USER"
            );
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.buildDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            this.setState({
                listDoctors: dataSelectDoctor,
                listPrices: dataSelectPrice,
                listPayments: dataSelectPayment,
                listProvinces: dataSelectProvince,
            });
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === "USER") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    object.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === "PRICE" || type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueEn}`;
                    let labelVi = `${item.valueVi
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
                    object.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
                console.log(inputData);
            }
        }

        return result;
    };

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailDoctor(selectedDoctor.value);
        let addressClinic = "",
            nameClinic = "",
            note = "",
            paymentId = "",
            priceId = "",
            provinceId = "";

        if (res && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            // addressClinic: "Ho Chi Minh"
            // count: 0
            // createdAt: "2022-04-06T09:25:44.000Z"
            // nameClinic: "Ho Chi Minh"
            // note: "Ho Chi Minh"
            // paymentId: "PAY1"
            // paymentTypeData: {valueVi: "Tiền mặt", valueEn: "Cash"}
            // priceId: "PRI1"
            // priceTypeData: {valueVi: "200000", valueEn: "10"}
            // provinceId: "PRO1"
            // provinceTypeData: {valueVi: "Hà Nội", valueEn: "Ha Noi"}
            if (res.data.Doctor_Infor) {
                let { listPayments, listPrices, listProvinces } = this.state;

                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;

                let selectedPayment = listPayments.find((item) => {
                    return item && item.value === paymentId;
                });
                let selectedPrice = listPrices.find((item) => {
                    return item && item.value === priceId;
                });
                let selectedProvince = listProvinces.find((item) => {
                    return item && item.value === provinceId;
                });
                this.setState({
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    hasOldValue: true,
                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                    nameClinic: nameClinic,
                    addressClinic: addressClinic,
                    note: note,
                });
            }
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldValue: false,
            });
        }
    };

    handleChangeSelectInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
        console.log(stateCopy);
    };

    handleOnChangeText = (value, name) => {
        let stateCopy = { ...this.state };
        let stateName = name;
        console.log(stateCopy);
        stateCopy[stateName] = value;
        this.setState({
            ...stateCopy,
        });
    };

    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOldValue
                ? CRUD_ACTIONS.EDIT
                : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
    };

    render() {
        console.log("kien check state: ", this.state);
        return (
            <div className="mamage-doctor-container">
                <div className="users-container">
                    <div className="title">
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>

                    <div className="users-table mt-3 mx-1"></div>
                </div>

                <div className="more-info">
                    <div className="content-left form-group">
                        <lable>
                            <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                        </lable>
                        <Select
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                            }
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right">
                        <lable>
                            <FormattedMessage id="admin.manage-doctor.infro-doctor" />
                        </lable>
                        <textarea
                            className="form-control"
                            onChange={(e) =>
                                this.handleOnChangeText(
                                    e.target.value,
                                    "description"
                                )
                            }
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.price" />
                            }
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listPrices}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            }
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listPayments}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.province" />
                            }
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listProvinces}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.clinic-name" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.nameClinic}
                            onChange={(e) =>
                                this.handleOnChangeText(
                                    e.target.value,
                                    "nameClinic"
                                )
                            }
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.clinic-address" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.addressClinic}
                            onChange={(e) =>
                                this.handleOnChangeText(
                                    e.target.value,
                                    "addressClinic"
                                )
                            }
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.note}
                            onChange={(e) =>
                                this.handleOnChangeText(e.target.value, "note")
                            }
                        />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={
                        this.state.hasOldValue
                            ? "btn btn-warning mx-5 my-3"
                            : "btn btn-primary mx-5 my-3"
                    }
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {this.state.hasOldValue ? (
                        <FormattedMessage id="admin.manage-doctor.save" />
                    ) : (
                        <FormattedMessage id="admin.manage-doctor.add" />
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctorsRedux: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllPrices: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) =>
            dispatch(actions.saveDetailInforDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
