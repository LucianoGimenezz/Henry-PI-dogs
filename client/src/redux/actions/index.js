import { GET_ALLDOGS} from './actions-type'

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