import {
  WEB3_CONNECTED,
  WEB3_ERROR,
  WEB3_ACCOUNT_CHANGE,
} from '../actions/types'

const initialState = {
  web3: null,
  contractInstance: null,
  account: null,
  loading: true,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WEB3_CONNECTED:
      return {
        ...state,
        web3: action.payload.web3,
        contractInstance: action.payload.contractInstance,
        account: action.payload.account,
        loading: false,
        error: null,
      }
    case WEB3_ACCOUNT_CHANGE:
      return {
        ...state,
        account: action.payload,
      }
    case WEB3_ERROR:
      return {
        ...state,
        web3: null,
        contractInstance: null,
        account: null,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
