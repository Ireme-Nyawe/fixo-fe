import { axiosInstance } from "../../../utils/axios";
import { handleError } from "../auth/authService";

export const getCallsessionsByDateRange = async (start:any,end:any) => {
    try {
        const response = await axiosInstance.get(`/api/call/session-range?start=${start}&end=${end}`);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}
