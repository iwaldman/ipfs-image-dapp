import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addImage } from '../../actions/imageActions'
import Spinner from '../common/Spinner'

class AddImage extends Component {
  state = {
    title: '',
    description: '',
    buffer: null,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  captureFile = (event) => {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }

  handleAddImage = (event) => {
    event.preventDefault()
    const { title, description, buffer } = this.state
    console.log(title, description, buffer)
    this.props.addImage(
      buffer,
      title,
      description,
      'metadata',
      this.props.history
    )
  }

  render() {
    return (
      <div className="container">
        <fieldset disabled={this.props.loading}>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mt-4">Upload an image</h1>
              {this.props.loading ? (
                <Spinner />
              ) : (
                <p className="lead text-center">
                  Let's get some information before uploading your image to IPFS
                  and the Blockchain
                </p>
              )}
              <form className="needs-validation" onSubmit={this.handleAddImage}>
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    required
                  />
                  <div className="invalid-feedback">Title is required.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="file">Image *</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureFile}
                    required
                  />
                  <div className="invalid-feedback">Image required.</div>
                </div>
                <small className="d-block pb-3">* = required fields</small>
                <div className="mb-3">
                  <Link to="/" className="btn btn-secondary mr-2">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.image.loading,
})

export default connect(
  mapStateToProps,
  { addImage }
)(AddImage)
