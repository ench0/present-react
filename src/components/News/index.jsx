import React, { Component } from 'react'

// import moment from 'moment-hijri'
// import momenttz from 'moment-timezone'

import '../../style/normalize.css'
import '../../style/App.css'

import NewsItem from './NewsItem'

class News extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slides: [{ title: '', image: '' }],
      slidecount: 0,
      currentslide: { title: '', image: '' },
      newsother: [],
      refresh: 60,
    }
  }

  /** ********************************************************************
  STATES
  ********************************************************************* */
  async componentWillMount() {
    await this.update()
    await this.tick()
    // this.setState({
    // })
  }

  async componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000 * 4,
    )
    this.updateID = setInterval(
      () => this.update(),
      this.state.refresh * 60 * 1000,

    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
    clearInterval(this.updateID)
  }
  /** ********************************************************************
  SCRIPTS
  ********************************************************************* */
  async update() {
    if (this.state.refresh !== 0) {
      try {
        const res = await fetch('https://islamireland.ie/api/', { mode: 'cors' })
        // set vars
        const { slides, newsother } = await res.json()
        // update states and storage
        await this.setState({ slides, newsother })
        await localStorage.setItem('slides', JSON.stringify(slides))
        await localStorage.setItem('newsother', JSON.stringify(newsother))

        const d = new Date()
        console.log('refreshed News comp', `${d.getHours()}:${this.prepend(d.getMinutes())}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  prepend(input) {
    if (input < 10) return `0${input}`
    return input
  }

  tick() {
    this.setState({ currentslide: this.state.slides[this.state.slidecount] })
    // console.log(this.state.slides.length);

    this.state.slidecount++

    if (this.state.slidecount > (this.state.slides.length - 1)) this.setState({ slidecount: 0 })

    // localStorage.setItem('settings', 'koko')
    // console.log(localStorage.getItem('settings'))

    // get the localstorage item:
    // var koko = JSON.parse(localStorage.getItem('newsposter'))
    // console.log(koko[0])
  }

  renderNews() {
    return (
      <div>
        { this.state.newsother.map((news, index) => <NewsItem key={index} news={news} />)}
      </div>
    )
  }

  /*
  *********************************************************************
  RENDERING
  *********************************************************************
  */
  render() {
    const styles = {
      backgroundImage: `url(https://islamireland.ie/${this.state.currentslide.image})`,
      opacity: 1,
      transition: 'all .5s ease',
    }
    // console.log(this.state)
    return (
      <div className="News">
        <div className="Title">News</div>
        <div className="Text">
          {this.renderNews()}
        </div>
        <div className="Image" style={styles}>
          {/* <img src={'https://islamireland.ie/' + this.state.currentslide.image} /> */}
          <div className="title">{this.state.currentslide.title}</div>
        </div>

      </div>
    )
  }
}

export default News
