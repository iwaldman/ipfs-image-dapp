import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './ImageItem.css'
import { textTruncate } from '../../utils/string'
class ImageItem extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
  }

  render() {
    const {
      index,
      ipfsHash,
      title,
      description,
      tags,
      uploadedOn,
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
            <div>
              <strong>IPFS Hash</strong>
              <p>
                <span className="text-muted">{ipfsHash}</span>
              </p>
            </div>
            <hr />
            <p className="card-text">
              {tags.split(',').map((tag, idx) => (
                <span key={idx} className="badge badge-pill badge-dark mr-2">
                  {tag}
                </span>
              ))}
            </p>
            <hr />
            <div>
              <Link to={`/images/${index}`} className="card-link">
                Details
              </Link>
              <a
                target="_blank"
                href={`https://ipfs.io/ipfs/${ipfsHash}`}
                className="card-link"
              >
                View on IPFS
              </a>
            </div>
          </div>
          <div className="card-footer text-muted">
            <small>
              {uploadedOn === 'Pending'
                ? 'PENDING'
                : `Uploaded on ${uploadedOn}`}
            </small>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageItem
