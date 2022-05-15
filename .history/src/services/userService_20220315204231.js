import axios from "../axios";
const handleLogin = (email, password) => {
    return axios.post("/api/login", {
        email,
        password,
    });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, {
        id: inputId,
    });
};

const createNewUserService = (data) => {
    console.log(data);
    return axios.post("/api/create-new-user", data);
};

const deleteUser = (id) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: id,
        },
    });
};

const updateUser = (data) => {
    return axios.put("/api/edit-user", data);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

export {
    getAllUsers,
    createNewUserService,
    deleteUser,
    updateUser,
    getAllCodeService,
};
export default handleLogin;
