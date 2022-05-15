import { iteratee } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import TableManageUser from "./TableManageUser";
import { getAllCodeService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            listUserArr: [],
            previewImageUrl: "",
            isOpen: false,

            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",

            action: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService("position");
        //     console.log(res);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        let arrGenders = this.props.genderRedux;
        let arrRoles = this.props.roleRedux;
        let arrPositions = this.props.positionRedux;
        let arrUser = this.props.dataUserRedux;
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMapMap
                        : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMapMap
                        : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
                role:
                    arrRoles && arrGenders.length > 0
                        ? arrGenders[0].keyMapMap
                        : "",
            });
        }

        if (prevProps.dataUserRedux !== this.props.dataUserRedux) {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMapMap
                        : "",
                role:
                    arrRoles && arrRoles.length > 0
                        ? arrGenders[0].keyMapMap
                        : "",
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMapMap
                        : "",
                action: CRUD_ACTIONS.CREATE,
                previewImageUrl: "",
            });
        }
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImageUrl) return;
        this.setState({
            isOpen: true,
        });
    };

    onChangeInput = (value, id) => {
        let copyState = { ...this.state };

        copyState[id] = value;
        this.setState(
            {
                ...copyState,
            },
            () => {
                console.log(copyState);
            }
        );
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("This input is required: " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();

        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserStart({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }

        // setTimeout(() => {
        //     this.props.getAllUser();
        // }, 1000);
    };

    handleEditUserFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary");
        }

        this.setState(
            {
                id: user.id,
                email: user.email,
                password: "HARDCODE",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phonenumber,
                gender: user.gender,
                role: user.roleID,
                position: user.positionId,
                action: CRUD_ACTIONS.EDIT,
                avatar: "",
                previewImageUrl: imageBase64,
            },
            () => {
                console.log(this.state);
            }
        );
    };

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;

        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avatar,
        } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">Create User Redux With Kien Le</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 h3 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-12 my-3">
                                {isGetGender === true ? "Loading Genders" : ""}
                            </div>

                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                    }
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "email"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "password"
                                        )
                                    }
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "firstName"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "lastName"
                                        )
                                    }
                                />
                            </div>

                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "address"
                                        )
                                    }
                                />
                            </div>
                            <div className="form-group col-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    className="form-control"
                                    name="gender"
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "gender"
                                        )
                                    }
                                    value={gender}
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="form-group col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    class="form-control"
                                    name="role"
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "role"
                                        )
                                    }
                                    value={role}
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                    {/* <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option> */}
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    class="form-control"
                                    name="position"
                                    onChange={(e) =>
                                        this.onChangeInput(
                                            e.target.value,
                                            "position"
                                        )
                                    }
                                    value={position}
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                    {/* <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option> */}
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        className="form-control"
                                        type="file"
                                        hidden
                                        onChange={(e) =>
                                            this.handleOnChangeImage(e)
                                        }
                                    />
                                    <label
                                        className="lable-upload"
                                        htmlFor="previewImg"
                                    >
                                        Tải ảnh
                                        <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="preview-image"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImageUrl})`,
                                        }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    className={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? "btn btn-warning"
                                            : "btn btn-primary"
                                    }
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParent={
                                        this.handleEditUserFromParent
                                    }
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        dataUserRedux: state.admin.dataUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getAllUser: () => dispatch(actions.getAllUser()),
        editUserStart: (data) => dispatch(actions.editUserRedux(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
