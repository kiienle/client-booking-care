import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

class TableManageUser extends Component {
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
                        {users.map((item, index) => (
                            <tr key={index} className="divClass">
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
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
