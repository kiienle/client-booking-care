import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    toggle = () => {
        this.props.handleHideModalUser();
        console.log(this.props.handleHideModalUser);
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
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <lable>Email</lable>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <lable>Password</lable>
                            <input type="password" />
                        </div>
                        <div className="input-container">
                            <lable>First Name</lable>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <lable>Last Name</lable>
                            <input type="text" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>
                        Do Something
                    </Button>{" "}
                    <Button onClick={() => this.toggle()}>Cancel</Button>
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
