import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ImageItem.css'
import { textTruncate } from '../../utils/string'
class ImageItem extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
  }

  renderDate = (uploadedOn, updatedOn, clearedOn) => {
    if (clearedOn) {
      return null
    } else if (updatedOn) {
      return `Updated on ${updatedOn}`
    } else {
      return `Uploaded on ${uploadedOn}`
    }
  }

  render() {
    const {
      ipfsHash,
      title,
      description,
      tags,
      uploadedOn,
      updatedOn,
      clearedOn,
    } = this.props.image

    const altDescription = description || 'No description'

    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <img
            className="card-img-top"
            src={`https://ipfs.io/ipfs/${ipfsHash}`}
            alt="Card"
          />
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{textTruncate(altDescription, 25)}</p>
            <hr />
            <p>
              <strong>IPFS Hash</strong>
              <p>
                <span class="text-muted">{ipfsHash}</span>
              </p>
            </p>
            <hr />
            <p className="card-text">
              {tags.split(',').map((tag, index) => (
                <span key={index} className="badge badge-pill badge-dark mr-2">
                  {tag}
                </span>
              ))}
            </p>
          </div>
          <div class="card-footer text-muted">
            <small>{this.renderDate(uploadedOn, updatedOn, clearedOn)}</small>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageItem
