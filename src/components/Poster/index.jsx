import React, { Component } from 'react'

// import moment from 'moment-hijri'
// import momenttz from 'moment-timezone'

import '../../style/normalize.css'
import '../../style/App.css'

// import Overlay from './components/Overlay'

class Poster extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newsposter: [{ img: '', title: '', summary: '', html: '', date: '' }],
      slidecount: 0,
      currentslide: { img: '', title: '', summary: '', html: '', date: '' },
      refresh: 60
    }
  }

  /**********************************************************************
  STATES
  **********************************************************************/
  async componentWillMount () {
    await this.update()
    await this.tick()
    // this.setState({
    // })
  }

  async componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      1000 * 15
    )
    this.updateID = setInterval(
      () => this.update(),
      this.state.refresh * 60 * 1000

    )
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
    clearInterval(this.updateID)
  }
  /**********************************************************************
  SCRIPTS
  **********************************************************************/
  async update () {
    if (this.state.refresh !== 0) {
      try {
        const res = await fetch('https://islamireland.ie/api/', { mode: 'cors' })
        // set vars
        const { newsposter } = await res.json()
        // update states and storage
        await this.setState({ newsposter })
        await localStorage.setItem('newsposter', JSON.stringify(newsposter))

        let d = new Date()
        console.log('refreshed Poster comp', `${d.getHours()}:${this.prepend(d.getMinutes())}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  prepend (input) {
    if (input < 10) return '0' + input
    else return input
  }

  tick () {
    this.setState({ currentslide: this.state.newsposter[this.state.slidecount] })

    this.state.slidecount++

    if (this.state.slidecount > 2) this.setState({ slidecount: 0 })

    // localStorage.setItem('settings', 'koko')
    // console.log(localStorage.getItem('settings'))

    // get the localstorage item:
    // var koko = JSON.parse(localStorage.getItem('newsposter'))
    // console.log(koko[0])
  }

  /**********************************************************************
  RENDERING
  **********************************************************************/
  render () {
    var styles = {
      backgroundImage: `url(https://islamireland.ie/${this.state.currentslide.img})`,
      opacity: 1,
      transition: 'all 1s ease'
    }
    // console.log(this.state)
    return (
      <div className='Poster'>
        <div className='Image' style={styles}>
          {/* <img src={'https://islamireland.ie/' + this.state.currentslide.img} /> */}
        </div>
        <div className='Title'>{this.state.currentslide.title}</div>
        <div className='Text'>
          <div>{this.state.currentslide.summary}</div>
          <div>{this.state.currentslide.date}</div>
        </div>
      </div>
    )
  }
}

export default Poster
