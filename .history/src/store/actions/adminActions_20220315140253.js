import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                console.log("getSatat kien le", getState);
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
