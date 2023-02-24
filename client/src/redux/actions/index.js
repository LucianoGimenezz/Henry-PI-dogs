import { GET_ALLDOGS, GET_ALLTEMPERAMENTS, FILTER_DOGS, RESET_FILTERS } from './actions-type'
import { paginate } from '../../utils'

export const getAllDogs = () => {
    return async (dispatch) => {
        try {
            const res = await fetch('http://localhost:3001/dogs')
            const data = await res.json()
            dispatch({
                type: GET_ALLDOGS,
                payload: {dogs: paginate(data)}
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

export const resetFilters = () => ({ type: RESET_FILTERS })