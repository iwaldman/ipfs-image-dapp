import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ImageItem.css'
class ImageItem extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
  }

  render() {
    const { image } = this.props

    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <img
            className="card-img-top"
            src={`https://ipfs.io/ipfs/${image.ipfsHash}`}
            alt="Card"
          />
          <div className="card-body">
            <h5 className="card-title">{image.title}</h5>
            <p className="card-text">{image.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageItem
