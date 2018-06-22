import Web3 from 'web3'

let web3

// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Use Mist/MetaMask's provider.
  web3 = new Web3(window.web3.currentProvider)
  console.log('Injected web3 detected.')
} else {
  // Fallback to localhost if no web3 injection. We've configured this to
  // use the development console's port by default.
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
  web3 = new Web3(provider)
  console.log('No web3 instance injected, using Local web3.')
}

export default web3
