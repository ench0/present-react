import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import defsettings from '../settings.json'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: { text: { en: '', ar: '' }, announcement: '' },
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings !== this.state.settings && nextProps.settings !== null) {
      this.setState({ settings: nextProps.settings })
    }
  }

  render() {
    return (
      <div className="Message" ref={divElement => this.divElement = divElement}>
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
      </div>
    )
  }
}

export default Message

Message.defaultProps = {
  settings: PropTypes.object,
}

Message.propTypes = {
  settings: PropTypes.object,
}
