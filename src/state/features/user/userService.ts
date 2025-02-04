import { IUser } from "../../../types/store";
import { axiosInstance } from "../../../utils/axios";
import { handleError } from "../auth/authService";

export const adminViewAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/technician/');
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const adminCreateUser = async (data: IUser) => {
    try {
        const response = await axiosInstance.post("/api/technician/new", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const adminToggleUserStatus = async (id: string) => {
    try {
        const response = await axiosInstance.put(`/api/technician/status/${id}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}