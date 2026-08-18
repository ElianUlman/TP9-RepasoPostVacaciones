import axios from 'axios';

const API_KEY =  "b8dbf7ec"


export const simpleMovie = async (tittle) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${tittle}`)
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
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${tittle}&type=${filter}`)
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
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
        if (response.data.Response === "False") {
            throw new Error(response.data.Error || "No se pudo obtener el detalle")
        }
        return response.data
    } catch (error) {
        throw error
    }
}