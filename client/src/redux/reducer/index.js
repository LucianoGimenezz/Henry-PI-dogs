import { GET_ALLDOGS, GET_ALLTEMPERAMENTS, FILTER_DOGS, RESET_FILTERS } from '../actions/actions-type'
import { filter, paginate } from '../../utils'

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
        const data = paginate(response)
        return {
          ...state,
          filteredDogs: data,
          totalPages: Object.keys(data)
         }    
      case RESET_FILTERS:
        return {
          ...state,
          filteredDogs: state.allDogs,
          totalPages: Object.keys(state.allDogs)
        }   
      default: 
          return { ...state }
    }
}

export default reducer