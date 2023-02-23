import { GET_ALLDOGS, GET_ALLTEMPERAMENTS, FILTER_DOGS } from '../actions/actions-type'
import { filter } from '../../utils'

const initialState = {
    allDogs: {},
    filteredDogs: [],
    temperaments: [],
    totalPages: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
      case GET_ALLDOGS:
          return {
            ...state,
            allDogs: payload.dogs,
            filteredDogs: payload.dogs,
            totalPages: Object.keys(payload.dogs)
          }  
      case GET_ALLTEMPERAMENTS:
          return {
            ...state,
            temperaments: payload
          }
      case FILTER_DOGS:
        const response = filter(payload, Object.values(state.allDogs).flat())
        let currentPage = 1
        const pagination = {}
        for(let i = 0; i < response.length; i++) {
            if (!pagination[currentPage]) pagination[currentPage] = [] 
            if(pagination[currentPage].length < 8) pagination[currentPage].push(response[i])
            else currentPage++
        }
        return {
          ...state,
          filteredDogs: pagination,
          totalPages: Object.keys(pagination)
         }    
      default: 
          return { ...state }
    }
}

export default reducer