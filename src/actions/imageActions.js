import { ipfs } from '../utils/ipfs'

import { GET_IMAGES, GET_IMAGES_SUCCESS, ADD_IMAGE, SET_ERROR } from './types'

// Get all images
export const getImages = () => async (dispatch, getState) => {
  dispatch({ type: GET_IMAGES })

  const web3State = getState().web3
  const images = []
  try {
    const count = await web3State.contractInstance.getImageCount.call(
      web3State.account,
      {
        from: web3State.account,
      }
    )
    const imageCount = count.toNumber()

    for (let index = 0; index < imageCount; index++) {
      const imageResult = await web3State.contractInstance.getImage.call(
        web3State.account,
        index,
        {
          from: web3State.account,
        }
      )
      const image = {
        ipfsHash: imageResult[0],
        title: imageResult[1],
        description: imageResult[2],
        metadata: imageResult[3],
      }
      images.push(image)
    }

    console.log('imageCount', imageCount)
    console.log('images', images)

    dispatch({ type: GET_IMAGES_SUCCESS, payload: images })
  } catch (error) {
    console.log('error', error)
    dispatch({ type: SET_ERROR, payload: error })
  }
}

// add an image
export const addImage = (
  buffer,
  title,
  description,
  metadata,
  history
) => async (dispatch, getState) => {
  dispatch({ type: ADD_IMAGE })

  ipfs.files.add(buffer, async (error, result) => {
    if (error) {
      console.log('ERR', error)
      dispatch({
        type: SET_ERROR,
        payload: {
          error,
        },
      })
    } else {
      try {
        const ipfsHash = result[0].hash
        const web3State = getState().web3
        const contractInstance = web3State.contractInstance
        const receipt = await contractInstance.setImage(
          ipfsHash,
          title,
          description,
          metadata,
          {
            from: web3State.account,
          }
        )

        console.log('setImage receipt', receipt)
        history.push('/')
      } catch (error) {
        console.log('ERR', error)
        dispatch({
          type: SET_ERROR,
          payload: {
            error,
          },
        })
      }
    }
  })
}
