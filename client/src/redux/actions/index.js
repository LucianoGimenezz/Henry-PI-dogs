import { GET_ALLDOGS} from './actions-type'

export const getAllDogs = () => {
    return async (dispatch) => {
        try {
            const res = await fetch('http://localhost:3001/dogs')
            const data = await res.json()
            dispatch({
                type: GET_ALLDOGS,
                payload: data
            })
        } catch (error) {
           console.error(new Error(error.message))   
        }
    } 
}