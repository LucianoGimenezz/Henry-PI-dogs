import { 
GET_ALLDOGS,
GET_ALLTEMPERAMENTS, 
FILTER_DOGS, 
RESET_FILTERS, 
GET_DOG_BY_NAME,
SET_LOADING,
GET_DOG_BY_ID,
CLEAN_DETAILS,
ADD_FAV
} from '../actions/actions-type'

import { filter, paginate } from '../../utils'

const initialState = {
    allDogs: {},
    filteredDogs: [],
    temperaments: [],
    totalPages: [],
    loading: true,
    detailDog: {},
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
      case GET_ALLDOGS:
          return {
            ...state,
            allDogs: payload.dogs,
            filteredDogs: payload.dogs,
            totalPages: Object.keys(payload.dogs),
            loading: !state.loading ? state.loading : !state.loading
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
      case CLEAN_DETAILS:
        return {
          ...state, 
          detailDog: {}
        }
      case ADD_FAV:
        const dogs = Object.values(state.filteredDogs).flat()
        for (let i = 0; i < dogs.length; i++) { 
          console.log('Entry')
          if (dogs[i].id === payload.id) {
            console.log(dogs[i])
            dogs[i].isFav = payload.action === 'add' ? true : false            
            break;
          }
        }
        return { ...state, filteredDogs: paginate(dogs) }
      default: 
          return { ...state }
    }
}

export default reducer