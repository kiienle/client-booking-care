import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { createNewUserService } from "../../services/userService";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
        };
    }
    componentDidMount() {}

    async componentWillUnmount() {
        await createNewUserService(this.state);
    }

    toggle = () => {
        this.props.handleHideModalUser();
        console.log(this.props.handleHideModalUser);
    };
    render() {
        console.log(this.state);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-user-body">
                            <div className="input-container">
                                <lable>Email</lable>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <lable>Password</lable>
                                <input
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
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({ phone: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary px-2" onClick={() => this.toggle()}>
                        Add User
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
