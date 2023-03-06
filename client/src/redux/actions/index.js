import { 
GET_ALLDOGS,
GET_ALLTEMPERAMENTS,
FILTER_DOGS, RESET_FILTERS,
GET_DOG_BY_NAME, 
SET_LOADING,
GET_DOG_BY_ID,
CLEAN_DETAILS,
ADD_FAV
} from './actions-type'

import { paginate } from '../../utils'

export const getDogByName = (name, dictonary) => {
    return async (dispatch) => {
        try {
            const res = await fetch(`http://localhost:3001/dogs?name=${name}`)
            const data = await res.json()
            const setFav = data.map((item) => {
                if (dictonary[item.id]) {
                   return {
                       ...item,
                       isFav: true
                   }
                }
                return {
                   ...item,
                   isFav: false
                }
           })
            dispatch({ type: GET_DOG_BY_NAME, payload: setFav })
        } catch (error) {
          console.error(new Error(error.message))
        }
    }
}

export const getAllDogs = (dictonary) => {
    return async (dispatch) => {
        try {
            const res = await fetch('http://localhost:3001/dogs')
            const data = await res.json()
            const setFav = data.map((item) => {
                 if (dictonary[item.id]) {
                    return {
                        ...item,
                        isFav: true
                    }
                 }
                 return {
                    ...item,
                    isFav: false
                 }
            })
            dispatch({
                type: GET_ALLDOGS,
                payload: {dogs: paginate(setFav)}
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

export const cleanDetails = () => ({ type: CLEAN_DETAILS })

export const addFavourite = (id, action) => ({ type: ADD_FAV, payload: { id, action} }) 