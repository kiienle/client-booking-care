import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
}

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {
        this.props.getAllUser();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataUserRedux !== this.props.dataUserRedux) {
            this.setState({
                usersRedux: this.props.dataUserRedux,
            });
        }
    }

    handleDeleteUser = (id) => {
        this.props.deleteUser(id);
    };

    handleEditUser = (user) => {
        console.log("kien ;", user);
        this.props.handleEditUserFromParent(user);
    };

    render() {
        let users = this.state.usersRedux;
        return (
            <div className="mamage-doctor-container">
                <div className="users-container">
                    <div className="title">Manage doctor redux with Kien</div>

                    <div className="users-table mt-3 mx-1"></div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataUserRedux: state.admin.dataUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUser: () => dispatch(actions.getAllUser()),
        deleteUser: (id) => dispatch(actions.deleteUserRedux(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
