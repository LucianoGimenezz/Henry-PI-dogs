import { GET_ALLDOGS } from '../actions/actions-type'

const initialState = {
    allDogs: [],
    totalPages: 0
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
      case GET_ALLDOGS:
          return {
            ...state,
            allDogs: payload.dogs,
            totalPages: Object.keys(payload.dogs)
          }  
        default: 
          return { ...state }
    }
}

export default reducer