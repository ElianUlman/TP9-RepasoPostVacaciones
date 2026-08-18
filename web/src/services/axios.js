import axios from "axios"

const apiKey = import.meta.env.VITE_OMDB_API_KEY || "b8dbf7ec"

export const simpleMovie = async (tittle) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${tittle}`)
        if (response.data.Response === "False") {
            throw new Error(response.data.Error || "No se encontraron resultados")
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const filterSeacrh = async (tittle, filter) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${tittle}&type=${filter}`)
        if (response.data.Response === "False") {
            throw new Error(response.data.Error || "No se encontraron resultados")
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const movieDetail = async (id) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        if (response.data.Response === "False") {
            throw new Error(response.data.Error || "No se pudo obtener el detalle")
        }
        return response.data
    } catch (error) {
        throw error
    }
}