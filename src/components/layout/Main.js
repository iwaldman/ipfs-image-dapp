import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { web3Connect } from '../../actions/web3Actions'
import Spinner from '../common/Spinner'

class Layout extends Component {
  componentDidMount() {
    this.props.web3Connect()
  }

  render() {
    let { loading, error } = this.props.web3

    let renderItems
    if (loading) {
      renderItems = <Spinner />
    } else if (error) {
      renderItems = (
        <div className="alert alert-danger" role="alert">
          <p>Oops! An error ocurred.</p>
          <div>{error}</div>
        </div>
      )
    } else {
      renderItems = this.props.children
    }

    return (
      <main role="main">
        <div>{renderItems}</div>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3,
})

export default withRouter(
  connect(
    mapStateToProps,
    { web3Connect }
  )(Layout)
)
