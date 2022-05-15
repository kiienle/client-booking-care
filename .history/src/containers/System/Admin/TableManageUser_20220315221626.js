import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditMode: false,
            userEditData: {},
        };
    }

    render() {
        let users = this.props.dataUsers;
        return (
            <div className="users-container">
                <div className="title">Manage users redux with Kien</div>

                <div className="users-table mt-3 mx-1">
                    <table id="TableManageUser">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        <tr className="divClass">
                            <td>{"item.email"}</td>
                            <td>{"item.firstName"}</td>
                            <td>{"item.lastName"}</td>
                            <td>{"item.address"}</td>
                            <td>
                                <button className="btn btn-warning">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn btn-danger">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
