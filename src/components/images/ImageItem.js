import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageItem
