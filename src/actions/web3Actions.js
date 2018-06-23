import contract from 'truffle-contract'

import web3 from '../utils/web3'
import ImageRegisterContractArtifact from '../../build/contracts/ImageRegister.json'
import { WEB3_CONNECTED, WEB3_ERROR } from './types'
import { getImages } from './imageActions'

export const web3Connect = () => async (dispatch) => {
  try {
    // contract ABI and set provider
    const imageRegisterContract = contract(ImageRegisterContractArtifact)
    imageRegisterContract.setProvider(web3.currentProvider)

    // deployed contract
    const contractInstance = await imageRegisterContract.deployed()

    // start watching the contract events
    contractInstance.ImageUploaded((error, result) => {
      if (error) {
        console.log('ImageUploaded event ERR', error)
        dispatch({
          type: WEB3_ERROR,
          payload: {
            loading: false,
            error,
          },
        })
      } else {
        console.log('ImageUploaded event', result)
        setTimeout(() => dispatch(getImages()), 1000)
      }
    })

    contractInstance.ImageUpdated((error, result) => {
      if (error) {
        console.log('ImageUpdated event ERR', error)
        dispatch({
          type: WEB3_ERROR,
          payload: {
            loading: false,
            error,
          },
        })
      } else {
        console.log('ImageUpdated event', result)
        setTimeout(() => dispatch(getImages()), 1000)
      }
    })

    contractInstance.ImageCleared((error, result) => {
      if (error) {
        console.log('ImageCleared event ERR', error)
        dispatch({
          type: WEB3_ERROR,
          payload: {
            loading: false,
            error,
          },
        })
      } else {
        console.log('ImageCleared event', result)
        setTimeout(() => dispatch(getImages()), 1000)
      }
    })

    // get the first account and ensure we are connected
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    console.log('auth info', web3, contractInstance, account)
    if (account) {
      // we are connected
      dispatch({
        type: WEB3_CONNECTED,
        payload: {
          web3,
          contractInstance,
          account,
          loading: false,
        },
      })
    } else {
      // something is wrong
      const error = 'Unable to get the list of accounts that control the node.'
      console.log(error)
      dispatch({
        type: WEB3_ERROR,
        payload: {
          loading: false,
          error,
        },
      })
    }
  } catch (error) {
    // unable to load the contract
    console.log('Error loading ImageRegister contract.', error.message)
    dispatch({
      type: WEB3_ERROR,
      payload: {
        loading: false,
        error: error.message,
      },
    })
  }
}
