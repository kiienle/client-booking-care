import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
};

const adminReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAIDED:
            // let copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.positions = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            copyState.positions = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data;
            // console.log(copyState.roles);
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ROLE_FAIDED:
            copyState.roles = [];
            return {
                ...copyState,
            };
        default:
            return state;
    }
};

export default adminReducer;
