import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <header>
        <div className="collapse bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">About</h4>
                <p className="text-white">Proof of Digital Existence</p>
                <p className="text-muted">
                  IPFS and the Blockchain are a perfect match. Why? You can
                  address large amounts of data with IPFS, and place the
                  immutable, permanent IPFS links into a blockchain transaction.
                  This will timestamp and secure your content, without having to
                  put the data on the chain itself. You now have undisputable
                  proof that your image existed at that time it was uploaded.
                  Awesome, right?
                </p>
                <div className="copyright text-white mt-3">
                  <p className="mbr-text mbr-fonts-style display-7">
                    © Copyright 2018 Bulldogs R Us - All Rights Reserved
                  </p>
                </div>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">For more information</h4>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Ethereum"
                      className="text-white"
                    >
                      Ethereum
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Decentralized_application"
                      className="text-white"
                    >
                      Decentralized application
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Smart_contract"
                      className="text-white"
                    >
                      Smart Contracts
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/InterPlanetary_File_System"
                      className="text-white"
                    >
                      InterPlanetary File System
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <strong>
                IPFS Image Upload dApp with Ethereum Smart Contracts
              </strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </header>
    )
  }
}

export default Navbar
