import api from "./api"

const findAllRoles = async () => {
    try {
        const response = await api.get(`/roles`)
        return response.data
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export { findAllRoles }
