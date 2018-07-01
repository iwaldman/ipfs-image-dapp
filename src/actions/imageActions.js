import { ipfs } from '../utils/ipfs'

import {
  GET_IMAGES,
  GET_IMAGES_SUCCESS,
  UPLOAD_IMAGE,
  SET_ERROR,
} from './types'

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

      // Image for UI
      const image = {
        ipfsHash: imageResult[0],
        title: imageResult[1],
        description: imageResult[2],
        tags: imageResult[3],
        uploadedOn: convertTimestampToString(imageResult[4]),
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

// upload an image
export const uploadImage = (
  buffer,
  title,
  description,
  tags,
  history
) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_IMAGE })

  // Add image to IPFS
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
      const ipfsHash = result[0].hash // base58 encoded multihash
      ipfs.files.get(ipfsHash, (error, files) => {
        console.log(files)
      })

      const web3State = getState().web3
      const contractInstance = web3State.contractInstance
      try {
        // Success, upload IPFS and metadata to the blockchain
        const receipt = await contractInstance.uploadImage(
          ipfsHash,
          title,
          description,
          tags,
          {
            from: web3State.account,
          }
        )

        console.log('uploadImage receipt', receipt)
        //history.push('/')
      } catch (error) {
        console.log('ERR', error)
        dispatch({
          type: SET_ERROR,
          payload: {
            error,
          },
        })
        throw error
      }
    }
  })
}

const convertTimestampToString = (timestamp) => {
  let tempDate = timestamp.toNumber()
  return tempDate !== 0 ? new Date(tempDate * 1000).toString() : null
}
