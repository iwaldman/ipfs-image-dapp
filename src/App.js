import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import './App.css'

import Navbar from './components/layout/Navbar'
import Main from './components/layout/Main'
import Images from './components/images/Images'
import UploadImage from './components/image/UploadImage'
import ImageDetail from './components/image/ImageDetail'
import NotFound from './components/notFound/NotFound'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Main>
              <Switch>
                <Route exact path="/" component={Images} />
                <Route exact path="/uploadimage" component={UploadImage} />
                <Route exact path="/images/:index" component={ImageDetail} />
                <Route exact component={NotFound} />
              </Switch>
            </Main>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
