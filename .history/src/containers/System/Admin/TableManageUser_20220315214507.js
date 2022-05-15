import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./TableManageUser.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUser,
    updateUser,
} from "../../services/userService";

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
        return (
            <div className="users-container">
                <div className="title">Manage users with Kien</div>

                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {this.state.arrUsers.map((item, i) => (
                            <tr className="divClass" key={i}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            this.handleEditUser(item)
                                        }
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            this.handleDeleteUser(item.id)
                                        }
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            <td>Germany</td>
                        </tr> */}
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
