import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import logo from './logo.svg';
// import './App.css';
// import moment from 'moment-hijri'
// import settings from '../settings.json'

class Message extends Component {
  constructor (props) {
    super(props)

    this.state = {
      settings: { text: { en: '', ar: '' }, announcement: '' }
    }
  }

  componentDidMount () {
    // const height = this.divElement.clientHeight;
    // this.setState({ height });
    // console.log(height)
  }

  componentWillUnmount () {
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.settings !== this.state.settings) {
      this.setState({ settings: nextProps.settings })
    }
  }

  render () {
    return (
      <div className='Message' ref={divElement => this.divElement = divElement}>
        <h3>
          {this.state.settings.announcement}
          {/* {this.state.height} */}
        </h3>

        <div>
          {this.state.settings.text.en}
        </div>
        <div>
          {this.state.settings.text.ar}
        </div>

        {/* <div className="mContainer">
                    <p className="marquee">{this.state.settings.body}</p>
                </div> */}

      </div>
    )
  }
}

Message.propTypes = {
  settings: PropTypes.object
}

export default Message
