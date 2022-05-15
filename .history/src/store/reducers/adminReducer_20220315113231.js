import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    started: true,
    language: "en",
    systemMenuPath: "/system/user-manage",
    contentOfConfirmModal: {
        ...initContentOfConfirmModal,
    },
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
