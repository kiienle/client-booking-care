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

// Initialize a markdown parser
const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedDoctor: "",
            listDoctors: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
            this.setState({
                listDoctors: this.props.doctorsRedux,
            });
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        console.log(this.state);
    };

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleOnChangeDesc = (value) => {
        this.setState({
            description: value,
        });
    };

    render() {
        console.log(this.props.doctorsRedux);
        return (
            <div className="mamage-doctor-container">
                <div className="users-container">
                    <div className="title">Manage doctor redux with Kien</div>

                    <div className="users-table mt-3 mx-1"></div>
                </div>

                <div className="more-info form-group">
                    <div className="content-left">
                        <lable>Chọn bác sĩ</lable>
                        <Select
                            // className="form-control"
                            value={this.state.selectedDoctor}
                            onChange={() => this.handleChange()}
                            options={options}
                        />
                    </div>
                    <div className="content-right">
                        <lable>Thông tin giới thiệu</lable>
                        <textarea
                            className="form-control"
                            rows={4}
                            onChange={(e) =>
                                this.handleOnChangeDesc(e.target.value)
                            }
                            value={this.state.description}
                        >
                            adwadwadwada
                        </textarea>
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    className="btn btn-warning mx-5 my-3"
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Lưu thông tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctorsRedux: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
