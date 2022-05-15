import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            console.log(copyState);
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            console.log(copyState);
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAIDED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
