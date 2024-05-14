import api from "./api"


export const createCategory = async (data) => {
    try {
        const response = await api.post("/category", data);
        return response.data;
    } catch (error) {
        console.log("Error save client")
    }
}

export const getCategories = async (nome) => {
    try {
        const response = await api.get(`/categories?name=${nome}`);
        return response.data;
    } catch (error) {
        console.log("Error get categories")
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/category/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error get client by id")
    }
}


export const deleteCategoryById = async (id) => {
    try {
        const response = await api.delete(`/category/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error delete client")
    }
}

export const updateCategory = async (id, data) => {
    try {
        const response = await api.put(`/category/${id}`, data);
        return response.data;
    } catch (error) {
        console.log("Error update client")
    }
}

