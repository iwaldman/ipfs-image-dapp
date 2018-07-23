import { keyBy } from 'lodash'

import {
  GET_IMAGES,
  GET_IMAGES_SUCCESS,
  GET_IMAGE,
  SET_ERROR,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
} from '../actions/types'

const initialState = {
  images: null,
  image: null,
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
      const imagesByIndex = keyBy(state.images, 'index')
      const updatedImages = action.payload.map((image) => {
        const updatedImage = { ...imagesByIndex[image.index], ...image }
        return updatedImage
      })
      return {
        ...state,
        loading: false,
        images: updatedImages,
        error: null,
        image: null,
      }
    case GET_IMAGE:
      return {
        ...state,
        loading: false,
        image: state.images ? state.images[action.payload] : null,
        error: null,
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        images: [...state.images, action.payload],
        loading: false,
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
