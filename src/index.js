import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import '../node_modules/toastr/build/toastr.min.css'

//import 'web3'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
