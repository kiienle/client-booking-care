import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { userService } from "../../services";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            icon: "fa-eye",
        };
    }

    handleOnChangeInput = (e) => {
        this.setState({
            username: e,
        });
        console.log(e);
    };

    handleSubmit = async (data) => {
        console.log(data);
        try {
        await userService.handleLogin(this.state);

        }
    };

    handleShowIHidePassword = () => {
        if (this.state.type === "password") {
            this.setState({
                type: "text",
            });
        } else {
            this.setState({
                isShowPassword: !this.state.isShowPassword,
            });
        }
    };
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 login-input">
                            <lable>Username</lable>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter your name..."
                                value={this.state.username}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-12 login-input">
                            <lable>Password</lable>
                            <div className="password-input">
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-input"
                                    placeholder="Enter your passord..."
                                />
                                <i
                                    class={
                                        this.state.isShowPassword
                                            ? "far fa-eye-slash show-password"
                                            : "far fa-eye show-password"
                                    }
                                    onClick={() =>
                                        this.handleShowIHidePassword()
                                    }
                                ></i>
                            </div>
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleSubmit(this.state)}
                            >
                                Log in
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12 mt-5 text-center">
                            <span className="text-orther-login">
                                Or Login with:
                            </span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook-f facebook login-icon"></i>
                            <i className="fab fa-twitter twitter login-icon"></i>
                            <i className="fab fa-google-plus-g google login-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
