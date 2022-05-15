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
        if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
            let listDoctors = this.buildDataInputSelect(
                this.props.doctorsRedux
            );
            this.setState({
                listDoctors,
            });
        }
        if (prevProps.pricesRedux !== this.props.pricesRedux) {
            let listPrices = this.buildDataInputSelect(this.props.pricesRedux);
            this.setState({
                listPrices,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctorsRedux);
            this.setState({
                listDoctors: dataSelect,
            });
        }
    }

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

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailDoctor(selectedDoctor.value);

        if (res && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldValue: true,
            });
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldValue: false,
            });
        }
    };

    handleChangeSelectPrice = async (selectedPrice) => {
        this.setState({
            selectedPrice,
        });
    };

    handleOnChangeDesc = (value) => {
        this.setState({
            description: value,
        });
    };

    handleSaveContentMarkdown = () => {
        console.log(this.state.selectedDoctor);
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOldValue
                ? CRUD_ACTIONS.EDIT
                : CRUD_ACTIONS.CREATE,
        });
    };

    render() {
        let { pricesRedux } = this.props;
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
                            // className="form-control"
                            placeholder={<div>Chọn bác sĩ...</div>}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelectDoctor}
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
                                this.handleOnChangeDesc(e.target.value)
                            }
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>Chọn giá</label>
                        <Select
                            // className="form-control"
                            placeholder={<div>Chọn gia...</div>}
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectPrice}
                            options={this.state.listPrices}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương thức thanh toán</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn tỉnh thành</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Ghi chú</label>
                        <input className="form-control" />
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
        pricesRedux: state.admin.prices,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllPrices: () => dispatch(actions.fetchPriceStart()),
        saveDetailDoctor: (data) =>
            dispatch(actions.saveDetailInforDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
