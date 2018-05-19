import React, { Component } from 'react'

// import moment from 'moment-hijri'
// import momenttz from 'moment-timezone'

import './style/normalize.css'
import './style/App.css'

import Poster from './components/Poster'
import News from './components/News'
import Timetable from './components/Timetable'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  /**********************************************************************
  STATES
  **********************************************************************/
  async componentWillMount () {
    // this.setState({
    // })
  }

  async componentDidMount () {
    document.title = 'ICCI Presentation'
  }

  /**********************************************************************
  RENDERING
  **********************************************************************/
  render () {
    return (
      <div className='App'>
        <Poster />
        <News />
        <Timetable />
        {/* <Overlay settings={this.state.settings} day={this.state.day} overlayTitle={this.state.overlayTitle} overlayActive={this.state.overlayActive} /> */}

      </div>
    )
  }
}

export default App
