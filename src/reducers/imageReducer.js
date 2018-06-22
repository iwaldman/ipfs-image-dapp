import {
  GET_IMAGES,
  GET_IMAGES_SUCCESS,
  SET_ERROR,
  UPLOAD_IMAGE,
} from '../actions/types'

const initialState = {
  instance: null,
  account: null,
  images: null,
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload,
        error: null,
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
