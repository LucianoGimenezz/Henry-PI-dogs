import { GET_ALLDOGS, GET_ALLTEMPERAMENTS, FILTER_DOGS } from './actions-type'


export const getAllDogs = () => {
    return async (dispatch) => {
        try {
            const res = await fetch('http://localhost:3001/dogs')
            const data = await res.json()
            const totalPages = Math.floor(data.length / 8)
            let currentPage = 1
            const pagination = {}
            for(let i = 0; i < data.length; i++) {
                if (!pagination[currentPage]) pagination[currentPage] = [] 
                if(pagination[currentPage].length < 8) pagination[currentPage].push(data[i])
                else currentPage++
            }
            dispatch({
                type: GET_ALLDOGS,
                payload: {dogs: pagination, totalPages}
            })
        } catch (error) {
           console.error(new Error(error.message))   
        }
    } 
}

export const getAllTemperaments = () => {
    return async (dispatch) => {
        try {
            const res = await fetch('http://localhost:3001/temperaments')
            const data = await res.json()
            dispatch({
                type: GET_ALLTEMPERAMENTS,
                payload: data
            })
        } catch (error) {
          console.error(new Error(error))  
        }
    }
}

export const filterDogs = (option) => ({ type: FILTER_DOGS, payload: option })