import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUser,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { Alert } from "reactstrap";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    handleHideModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    handlecreateNewUserService = async (userData) => {
        console.log(userData);
        try {
            let response = await createNewUserService(userData);
            console.log(response);
            if (response && response.message.errCode !== 0) {
                alert(response.message.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: !this.state.isOpenModalUser,
                });
            }
            console.log("response user ", response);
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteUser = async (id) => {
        console.log(typeof id);
        try {
            await deleteUser(id);
            await this.getAllUsersFromReact();
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    handleHideModalUser={this.handleHideModalUser}
                    handlecreateNewUserService={this.handlecreateNewUserService}
                />
                <div className="title">Manage users with Kien</div>
                <div className="mx-1">
                    <button
                        onClick={() => this.handleAddNewUser()}
                        type="button"
                        class="btn btn-primary px-2 mx-1"
                    >
                        <i class="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>

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
                                    <button className="btn btn-warning">
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
