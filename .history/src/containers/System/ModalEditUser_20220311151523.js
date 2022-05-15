import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            gender: "",
            roleId: "",
        };
    }
    componentDidMount() {
        console.log(this.props.currentUser);
        this.setState({
            email: this.props.currentUser.email,
            password: this.props.currentUser.password,
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            address: this.props.currentUser.address,
            phone: this.props.currentUser.phone,
            gender: this.props.currentUser.gender,
            roleId: this.props.currentUser.roleId,
        });
    }

    toggle = () => {
        this.props.hideModalEidt();
        console.log(this.props.hideModalEidt);
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastaName",
            "address",
            "phone",
            "gender",
            "roleId",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parametor: ${arrInput[i]}`);
                break;
            }
            return isValid;
        }
    };

    handleEditUser = () => {
        this.checkValidInput();

        // this.setState({
        //     email: "",
        //     password: "",
        //     firstName: "",
        //     lastName: "",
        //     address: "",
        //     phone: "",
        //     gender: "",
        //     roleId: "",
        // });
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Edit user
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-user-body">
                            <div className="input-container">
                                <lable>Email</lable>
                                <input
                                    value={this.state.email}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <lable>Password</lable>
                                <input
                                    value={this.state.password}
                                    type="password"
                                    onChange={(e) =>
                                        this.setState({
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <lable>First Name</lable>
                                <input
                                    value={this.state.firstName}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({
                                            firstName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <lable>Last Name</lable>
                                <input
                                    value={this.state.lastName}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({
                                            lastName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <lable>Address</lable>
                                <input
                                    value={this.state.address}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <lable>Phone Number</lable>
                                <input
                                    value={this.state.phone}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({ phone: e.target.value })
                                    }
                                />
                            </div>
                            <div class="input-container">
                                <label>Sex</label>
                                <select
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={(e) =>
                                        this.setState({
                                            gender: e.target.value,
                                        })
                                    }
                                >
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>

                                <label>Role</label>
                                <select
                                    name="roleId"
                                    value={this.state.roleId}
                                    onChange={(e) =>
                                        this.setState({
                                            roleId: e.target.value,
                                        })
                                    }
                                >
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleEditUser()}
                    >
                        Save User
                    </Button>{" "}
                    <Button color="danger px-2" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
