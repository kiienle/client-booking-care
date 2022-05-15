import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null,
};

const initialState = {};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
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
