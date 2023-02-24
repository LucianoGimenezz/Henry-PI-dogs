import { 
GET_ALLDOGS,
GET_ALLTEMPERAMENTS, 
FILTER_DOGS, 
RESET_FILTERS, 
GET_DOG_BY_NAME,
SET_LOADING,
GET_DOG_BY_ID
} from '../actions/actions-type'

import { filter, paginate } from '../../utils'

const initialState = {
    allDogs: {},
    filteredDogs: [],
    temperaments: [],
    totalPages: [],
    loading: true,
    detailDog: {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
      case GET_ALLDOGS:
          return {
            ...state,
            allDogs: payload.dogs,
            filteredDogs: payload.dogs,
            totalPages: Object.keys(payload.dogs),
            loading: !state.loading
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
      case GET_DOG_BY_NAME:
        const res = paginate(payload)
         return {
          ...state,
          filteredDogs: res,
          totalPages: Object.keys(res),
          loading: !state.loading
         }
      case SET_LOADING:
        return {
          ...state,
          loading: !state.loading
        }
      case GET_DOG_BY_ID:
        return {
          ...state,
          detailDog: payload[0]
        }
      default: 
          return { ...state }
    }
}

export default reducer