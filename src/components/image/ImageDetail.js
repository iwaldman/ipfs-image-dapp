import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getImage } from '../../actions/imageActions'

class ImageDetail extends Component {
  componentDidMount() {
    this.props.getImage(this.props.match.params.index)
  }

  render() {
    const { image } = this.props

    if (!image) return null

    const {
      ipfsHash,
      title,
      description,
      uploadedOn,
      blockHash,
      blockNumber,
      transactionHash,
      transactionIndex,
      cumulativeGasUsed,
      gasUsed,
    } = image

    return (
      <div className="container">
        <div className="mt-3 mb-3">
          <Link to="/">Go Back</Link>
        </div>
        <h1 className="display-4">{title}</h1>
        <img
          src={`https://ipfs.io/ipfs/${ipfsHash}`}
          className="rounded d-block mb-3 mt-3"
          alt={`${ipfsHash}`}
        />
        <p className="lead">{description}</p>
        <hr className="my-4" />
        <table className="table table-striped">
          <tbody>
            <tr>
              <th scope="row">IPFS Hash</th>
              <td>{ipfsHash}</td>
            </tr>
            <tr>
              <th scope="row">Transaction Hash</th>
              <td>{transactionHash}</td>
            </tr>
            <tr>
              <th scope="row">Transaction Index</th>
              <td>{transactionIndex}</td>
            </tr>
            <tr>
              <th scope="row">Block Hash</th>
              <td>{blockHash} </td>
            </tr>
            <tr>
              <th scope="row">Block Number</th>
              <td>{blockNumber}</td>
            </tr>
            <tr>
              <th scope="row">Gas Used</th>
              <td>{gasUsed}</td>
            </tr>
            <tr>
              <th scope="row">Culmulative Gas Used</th>
              <td>{cumulativeGasUsed}</td>
            </tr>
            <tr>
              <th scope="row">Uploaded On</th>
              <td>{uploadedOn}</td>
            </tr>
          </tbody>
        </table>
        <p className="lead">
          <a
            target="_blank"
            href={`https://ipfs.io/ipfs/${ipfsHash}`}
            className="btn btn-primary btn-lg"
            role="button"
          >
            View on IPFS
          </a>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  image: state.image.image,
})

export default connect(
  mapStateToProps,
  { getImage }
)(ImageDetail)

/*

uploadImage receipt {
    tx: "0xf9b85a78da3faef6696a9bd05b7420678070e8338308b12217e306178bc41ac7", 
    receipt: 
    blockHash: "0x7eec48773b3ebe875609e4f8f3ace62c343bdf8297fc7be6983d5543a7cf8a15"
    blockNumber: 9
    contractAddress: null
    cumulativeGasUsed: 184999
    gasUsed: 184999
    status: "0x1"
    transactionHash: "0xf9b85a78da3faef6696a9bd05b7420678070e8338308b12217e306178bc41ac7"
    transactionIndex: 0



*/
