import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    handleHideModalUser = () => {
        this.setState({
            isOpenModalUser: false,
        });
    };

    render() {
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    handleHideModalUser={this.handleAddNewUser()}
                />
                <div className="title">Manage users with Kien</div>
                <div className="mx-1">
                    <button
                        onClick={() => this.handleAddNewUser()}
                        type="button"
                        class="btn btn-primary px-2"
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
                            <tr className="divClass">
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn btn-warning">
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="btn btn-danger">
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
