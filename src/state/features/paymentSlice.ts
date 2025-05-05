import { axiosInstance } from "../../utils/axios";
import { handleError } from "./auth/authService";

const technicianRequestPaypackPayment = async (
    data: any) => {
    try {
        console.log("data", data);
        const response = await axiosInstance.post("/api/payments/request-payment", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

const findAllTechniciansPayments = async () => {
    try {
        const response = await axiosInstance.get("/api/payments/get-all-tech-payments");
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

const findTechOwnPayments = async () => {
    try {
        const response = await axiosInstance.get("/api/payments/get-tech-payments");
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export default {
    technicianRequestPaypackPayment,
    findAllTechniciansPayments,
    findTechOwnPayments
}   