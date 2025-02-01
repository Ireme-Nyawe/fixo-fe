import { IProduct, IProductCategory } from "../../../types/store";
import { axiosInstance } from "../../../utils/axios";
import { handleError } from "../auth/authService";

export const createProductCategory = async (data: IProductCategory) => {
    try {
        const response = await axiosInstance.post("/api/category/", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const getProductCategories = async () => {
    try {
        const response = await axiosInstance.get("/api/category/");
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const saveProduct = async (data: IProduct) => {
    try {
        const response = await axiosInstance.post("/api/product/", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get("/api/product/");
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const getProductCategoryById = async (id: any) => {
    try {
        const response = await axiosInstance.get(`/api/category/${id}`)
        return response.data;
    } catch (error) {
        return handleError(error)
    }
}

export const updateProductCategory = async (id: any, data: IProductCategory) => {
    try {
        const response = await axiosInstance.put(`/api/category/${id}`, data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const deleteProductCategory = async (id: any) => {
    try {
        const response = await axiosInstance.delete(`/api/category/${id}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const deleteProduct = async (id: any) => {
    try {
        const response = await axiosInstance.delete(`/api/product/${id}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const getSingleProduct = async (id: any) => {
    try {
        const response = await axiosInstance.get(`/api/product/view/${id}`)
        return response.data;
    } catch (error) {
        return handleError(error)
    }
}

export const updateProduct = async (id: any, data: IProduct) => {
    try {
        const response = await axiosInstance.put(`/api/product/${id}`, data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}