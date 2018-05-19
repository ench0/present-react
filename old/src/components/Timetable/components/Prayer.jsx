import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import logo from './logo.svg';
// import './App.css';

// import momenttz from 'moment'
import moment from 'moment-hijri'
import 'moment-timezone'

// import prayers from '../cities/dublin.json'
// import settings from '../settings.json'

moment.locale('en-ie')

class Prayer extends Component {
  constructor (props) {
    super(props)
    // var tomorrow = 0
    this.state = {
      // prayers: []
      jamaahShow: true
    }
  }

  componentDidMount () {
    // this.getTimes();
  }

  componentWillUnmount () {
    // clearInterval(this.timerID)
  }

  componentWillReceiveProps (nextProps) {
    // console.log(nextProps)
    if (nextProps.jamaahShow !== this.state.jamaahShow) {
      this.setState({ jamaahShow: nextProps.jamaahShow })
    }
  }

  render () {
    // console.log(this.props.nextName, this.props.prayer.name)
    let next,
      adhan,
      iqamah
    if (this.props.nextName === this.props.prayer.name || this.props.nextName === `${this.props.prayer.name} jamaah`) next = 'prayerRow next'; else next = 'prayerRow'

    if (this.state.jamaahShow && this.props.prayer.name !== 'shurooq') {
      adhan =
        (<div className='adhanTime'>
          {this.props.prayer.time.format('H:mm')}
        </div>)
      iqamah =
        (<div className='iqamahTime'>
          {this.props.prayer.jamaah.time.format('H:mm')}
        </div>)
    } else if (this.state.jamaahShow && this.props.prayer.name === 'shurooq') {
      adhan =
        (<div className='adhanTime'>
          {this.props.prayer.time.format('H:mm')}
        </div>)
      iqamah =
        <div className='iqamahTime' />
    } else {
      adhan =
        (<div className='adhanTime right'>
          {this.props.prayer.time.format('H:mm')}
        </div>)
      iqamah = ''
    }

    return (
      <div className={next}>

        <div className='prayerName'>
          {this.props.prayer.name}

        </div>
        {adhan}
        {iqamah}
        {/* <div className='iqamahTime'>
                    {this.props.prayer.jamaah.time.format('H:mm')}
                </div> */}
      </div>
    )
  }
}

Prayer.propTypes = {
  jamaahShow: PropTypes.bool
}

export default Prayer
