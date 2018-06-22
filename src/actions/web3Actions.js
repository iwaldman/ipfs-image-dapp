import contract from 'truffle-contract'

import web3 from '../utils/web3'
import ImageRegisterContractArtifact from '../../build/contracts/ImageRegister.json'
import { WEB3_CONNECTED, WEB3_ERROR } from './types'

export const web3Connect = () => async (dispatch) => {
  try {
    const imageRegisterContract = contract(ImageRegisterContractArtifact)
    imageRegisterContract.setProvider(web3.currentProvider)
    const contractInstance = await imageRegisterContract.deployed()
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    console.log('auth info', web3, contractInstance, account)
    if (account) {
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
    console.log('Error loading ImageRegister contract.', error)
    dispatch({
      type: WEB3_ERROR,
      payload: {
        loading: false,
        error,
      },
    })
  }
}
