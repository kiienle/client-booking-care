import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
} from "../../services/userService";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });
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

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
});

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log("kien le ", res);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("fetchRoleStart", e);
        }
    };
};

export const saveUserSuccess = (Data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: Data,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const getAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            console.log("kien le ", res);
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess());
            } else {
                dispatch(getAllUserFailed());
            }
        } catch (e) {
            dispatch(getAllUserFailed());
            console.log("fetchRoleStart", e);
        }
    };
};

export const getALlUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: data,
});
export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED,
});
