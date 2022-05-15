import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUser,
    updateUser,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctor,
    getDetailDoctor,
    getScheduleDoctorByDate,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });

//Fetch Gener Start
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart", e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
});

//Fetch Position start
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart", e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

//Fetch Role Start
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                console.log(res.data);
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart", e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
});

//Fetch Schedule Start
export const fetchScheduleHours = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchScheduleHoursSuccess(res.data));
                // dispatch(getAllUser());
                // toast.success("Edit user success!");
            } else {
                dispatch(fetchScheduleHoursFailed());
            }
        } catch (e) {
            dispatch(fetchScheduleHoursFailed());
            console.log("fetchRoleStart", e);
        }
    };
};
export const fetchScheduleHoursSuccess = (scheduleData) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
    data: scheduleData,
});
export const fetchScheduleHoursFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
});

//Fetch Price Start
export const fetchPriceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PRICE");
            if (res && res.errCode === 0) {
                dispatch(fetchPriceSuccess(res.data));
            } else {
                dispatch(fetchPriceFailed());
            }
        } catch (e) {
            dispatch(fetchPriceFailed());
            console.log("fetchRoleStart", e);
        }
    };
};
export const fetchPriceSuccess = (scheduleData) => ({
    type: actionTypes.FETCH_PRICE_SUCCESS,
    data: scheduleData,
});
export const fetchPriceFailed = () => ({
    type: actionTypes.FETCH_PRICE_FAILED,
});

//Create New user start
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            // console.log("kien le ", res.errCode);
            if (res && res.message.errCode === 0) {
                console.log(res);
                dispatch(saveUserSuccess());
                dispatch(getAllUser());
                toast.success("Create a new user success!");
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("fetchRoleStart", e);
        }
    };
};
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

//Get All User Start
export const getAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            // console.log("kien le ", res);
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(getAllUserFailed());
            }
        } catch (e) {
            dispatch(getAllUserFailed());
            console.log("fetchRoleStart", e);
        }
    };
};
export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: data,
});
export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED,
});

export const deleteUserRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(id);
            // console.log("kien le ", res);
            if (res && res.message.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(getAllUser());
                toast.success("Delete user success!");
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("fetchRoleStart", e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUserRedux = (data) => {
    console.log(data);
    return async (dispatch, getState) => {
        try {
            let res = await updateUser(data);
            console.log("kien le ", res);
            if (res && res.message.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(getAllUser());
                toast.success("Edit user success!");
            } else {
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log("fetchRoleStart", e);
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService("");

            console.log("kien le check res", res);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data));
                dispatch(getAllUser());
                // toast.success("Edit user success!");
            } else {
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorsFailed());
            console.log("fetchRoleStart", e);
        }
    };
};

export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctors: data,
});
export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();

            console.log("kien le check res", res);
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
                dispatch(getAllUser());
                // toast.success("Edit user success!");
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailed());
            console.log("fetchRoleStart", e);
        }
    };
};

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    doctors: data,
});
export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);

            console.log("kien le check res", res);
            if (res && res.errCode === 0) {
                dispatch(saveDetailDoctorSuccess());
                // dispatch(getAllUser());
                toast.success("Save detail Doctor success!");
            } else {
                toast.error("Save detail Doctor error!");
                dispatch(saveDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(saveDetailDoctorFailed());
            toast.error("Save detail Doctor error!");
            // console.log("fetchRoleStart", e);
        }
    };
};

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

export const getDetailInforDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailDoctor(id);

            console.log("kien le check res", res);
            if (res && res.errCode === 0) {
                dispatch(getDetailDoctorSuccess(res));
                // dispatch(getAllUser());
                // toast.success("get detail Doctor success!");
            } else {
                // toast.error("get detail Doctor error!");
                dispatch(getDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(getDetailDoctorFailed());
            // toast.error("get detail Doctor error!");
            // console.log("fetchRoleStart", e);
        }
    };
};

export const getDetailDoctorSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
    data: data,
});
export const getDetailDoctorFailed = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
});

// export const getScheduleDoctorById = (id) => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getScheduleDoctor(id);

//             console.log("kien le check res", res);
//             if (res && res.errCode === 0) {
//                 dispatch(getScheduleDoctorSuccess(res));
//                 // dispatch(getAllUser());
//                 // toast.success("get detail Doctor success!");
//             } else {
//                 // toast.error("get detail Doctor error!");
//                 dispatch(getScheduleDoctorFailed());
//             }
//         } catch (e) {
//             dispatch(getScheduleDoctorFailed());
//             // toast.error("get detail Doctor error!");
//             // console.log("fetchRoleStart", e);
//         }
//     };
// };

// export const getScheduleDoctorSuccess = (data) => ({
//     type: actionTypes.GET_SCHEDULE_DOCTOR_SUCCESS,
//     data: data,
// });
// export const getScheduleDoctorFailed = () => ({
//     type: actionTypes.GET_SCHEDULE_DOCTOR_FAILED,
// });
