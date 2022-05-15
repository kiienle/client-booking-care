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

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
    return axios.post("/api/save-infor-doctor", data);
};

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-infor-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctor = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${id}&date=${date}`
    );
};

export {
    getAllUsers,
    createNewUserService,
    deleteUser,
    updateUser,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctor,
    getDetailDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctor,
};
export default handleLogin;
