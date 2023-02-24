import { 
GET_ALLDOGS,
GET_ALLTEMPERAMENTS,
FILTER_DOGS, RESET_FILTERS,
GET_DOG_BY_NAME, 
SET_LOADING,
GET_DOG_BY_ID
} from './actions-type'

import { paginate } from '../../utils'

export const getDogByName = (name) => {
    return async (dispatch) => {
        try {
            const res = await fetch(`http://localhost:3001/dogs?name=${name}`)
            const data = await res.json()
            dispatch({ type: GET_DOG_BY_NAME, payload: data })
        } catch (error) {
          console.error(new Error(error.message))
        }
    }
}

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

export const getDogByID = (id) => {
    return async (dispatch) => {
        try {
            const res = await fetch(`http://localhost:3001/dogs/${id}`)
            const data = await res.json()
            dispatch({ type: GET_DOG_BY_ID, payload: data })
        } catch (error) {
          console.error(new Error(error))
        }
    }
}

export const filterDogs = (option) => ({ type: FILTER_DOGS, payload: option })

export const resetFilters = () => ({ type: RESET_FILTERS })

export const setLoading = () =>  ({ type: SET_LOADING })