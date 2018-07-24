import contract from 'truffle-contract'

import web3 from '../utils/web3'
import ImageRegisterContractArtifact from '../../build/contracts/ImageRegister.json'
import { WEB3_CONNECTED, WEB3_ERROR, WEB3_ACCOUNT_CHANGE } from './types'
import { getImages } from './imageActions'

export const web3Connect = () => async (dispatch, getState) => {
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

    // Watch for account change as described here:
    // https://medium.com/coinmonks/
    // detecting-metamask-account-or-network-change-in-javascript-using-web3-1-0-0-18433e99df5a
    web3.currentProvider.publicConfigStore.on(
      'update',
      async ({ selectedAddress }) => {
        console.log('publicConfigStore:update event', selectedAddress)
        const lcSelectedAddress = selectedAddress.toLowerCase()
        if (lcSelectedAddress !== getState().web3.account) {
          await dispatch({
            type: WEB3_ACCOUNT_CHANGE,
            payload: lcSelectedAddress,
          })
          dispatch(getImages())
        }
      }
    )

    // get the first account and ensure we are connected
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0].toLowerCase()
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
