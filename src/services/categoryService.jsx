import api from "./api"


export const createCategory = async (data) => {
    try {
        const response = await api.post("/category", data);
        return response.data;
    } catch (error) {
        console.log("Error save client")
    }
}

export const getCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.log("Error get clients")
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

