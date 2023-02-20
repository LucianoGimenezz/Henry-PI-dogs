import { GET_ALLDOGS } from '../actions/actions-type'

const initialState = {
    allDogs: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_ALLDOGS:
          return {
            ...state,
            allDogs: payload
          }  
        default: 
          return { ...state }
    }
}

export default reducer