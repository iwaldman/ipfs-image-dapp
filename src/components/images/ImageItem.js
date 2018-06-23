import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ImageItem.css'
class ImageItem extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
  }

  renderDate = (uploadedOn, updatedOn, clearedOn) => {
    if (clearedOn) {
      return <small className="text-muted">Cleared on {clearedOn}</small>
    } else if (updatedOn) {
      return <small className="text-muted">Updated on {updatedOn}</small>
    } else {
      return <small className="text-muted">Uploaded on {uploadedOn}</small>
    }
  }

  render() {
    const { image } = this.props

    return (
      <div className="col-md-6">
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="card-title text-center">{image.title}</h4>
          </div>
          <img
            className="card-img-top"
            src={`https://ipfs.io/ipfs/${image.ipfsHash}`}
            alt="Card"
          />
          <div className="card-body">
            <p className="card-text">{image.description}</p>
            <p className="card-text">
              {image.tags.split(',').map((tag, index) => (
                <span key={index} className="badge badge-pill badge-dark mr-2">
                  {tag}
                </span>
              ))}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer">
            {this.renderDate(
              image.uploadedOn,
              image.updatedOn,
              image.clearedOn
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ImageItem
