import { ipfs } from '../utils/ipfs'

import {
  GET_IMAGES,
  GET_IMAGES_SUCCESS,
  GET_IMAGE,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
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
        index,
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
        const txReceipt = await contractInstance.uploadImage(
          ipfsHash,
          title,
          description,
          tags,
          {
            from: web3State.account,
          }
        )

        console.log('uploadImage tx receipt', txReceipt)

        const {
          blockHash,
          blockNumber,
          transactionHash,
          transactionIndex,
          cumulativeGasUsed,
          gasUsed,
        } = txReceipt.receipt

        // Determine index based on length of images array; otherwise,
        // would need to call contract to get length
        const index = getState().image.images.length
          ? getState().image.images.length
          : 0

        const newImage = {
          index,
          ipfsHash,
          title,
          description,
          tags,
          uploadedOn: 'Pending',
          blockHash,
          blockNumber,
          transactionHash,
          transactionIndex,
          cumulativeGasUsed,
          gasUsed,
        }

        console.log('image', newImage)

        dispatch({
          type: UPLOAD_IMAGE_SUCCESS,
          payload: newImage,
        })
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

// Get image by index
export const getImage = (index) => ({ type: GET_IMAGE, payload: index })

const convertTimestampToString = (timestamp) => {
  let tempDate = timestamp.toNumber()
  return tempDate !== 0 ? new Date(tempDate * 1000).toString() : null
}
