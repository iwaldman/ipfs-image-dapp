import contract from 'truffle-contract'

import web3 from '../utils/web3'
import ImageRegisterContractArtifact from '../../build/contracts/ImageRegister.json'
import { WEB3_CONNECTED, WEB3_ERROR } from './types'
import { getImages } from './imageActions'

export const web3Connect = () => async (dispatch, getHistory) => {
  try {
    // contract ABI and set provider
    const imageRegisterContract = contract(ImageRegisterContractArtifact)
    imageRegisterContract.setProvider(web3.currentProvider)

    // deployed contract
    const contractInstance = await imageRegisterContract.deployed()

    // start watching the contract events
    contractInstance.LogImageUploaded((error, result) => {
      if (error) {
        console.log('LogImageUploaded event ERR', error)
        dispatch({
          type: WEB3_ERROR,
          payload: {
            loading: false,
            error,
          },
        })
      } else {
        console.log('LogImageUploaded event', result)
        dispatch(getImages())
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
      const error = `Unable to get the list of accounts that control the node. Verify that MetaMask is connected to the proper network then reload the application.`
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
    const errorMessage = `Error loading ImageRegister contract. Be sure the contract is deployed to the blockchain. ERR: ${
      error.message
    }`
    console.log(errorMessage)
    dispatch({
      type: WEB3_ERROR,
      payload: {
        loading: false,
        error: errorMessage,
      },
    })
  }
}
