import { Component } from 'react'
import {Helmet} from "react-helmet";

import Poster from './components/Poster'
import News from './components/News'
import Timetable from './components/Timetable/App'

import './style/normalize.css'
// import './style/uikit.min.css'
import './style/App.css'

export default class PresentApp extends Component {
  state = {
    name: 'present-react',
    refresh: 1,
    about: '',
    updated: '',
    intro: { text: '', title: '' },
    news: []
  }

  async componentDidMount () {
    // console.log('3',this.state.tomorrow)
    document.title = 'ICCI Presentation'

    try {
      // var settings, timetable

      if (await localStorage.getItem('about') !== 'undefined') {
        var newabout = await JSON.parse(localStorage.getItem('about'))
      }
      if (await localStorage.getItem('update') !== 'undefined') {
        var newupdated = await JSON.parse(localStorage.getItem('updated'))
      }
      if (await localStorage.getItem('intro') !== 'undefined') {
        var newintro = await JSON.parse(localStorage.getItem('intro'))
      }
      if (await localStorage.getItem('news') !== 'undefined') {
        var newnews = await JSON.parse(localStorage.getItem('news'))
      }

      await this.setState({ about: newabout, updated: newupdated, intro: newintro, news: newnews })
    } catch (error) {
      console.log(error)
    }

    await this.update()

    this.updateID = setInterval(
      () => this.update(),
      this.state.refresh * 60 * 1000

    )
  }

  componentWillUnmount () {
    clearInterval(this.updateID)
  }

  async update () {
    if (this.state.refresh !== 0) {
      try {
        const res = await fetch('https://islamireland.ie/api/', { mode: 'cors' })
        // set vars
        const { about, updated, intro, news } = await res.json()
        // console.log(settings)
        // update states and storage
        await this.setState({ about, updated, intro, news })
        await localStorage.setItem('about', JSON.stringify(about))
        await localStorage.setItem('updated', JSON.stringify(updated))
        await localStorage.setItem('intro', JSON.stringify(intro))
        await localStorage.setItem('news', JSON.stringify(news))
        // console.log('timetable', timetable)
        console.log('refreshed main app')
        // console.log(news)
      } catch (error) {
        console.log(error)
      }
    }
  }

  render () {
    return (
      <div className='PresentApp'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          {/* <script src="js/uikit.min.js"></script>
          <script src="js/uikit-icons.min.js"></script> */}
          <title>Present</title>
          {/* <link rel="stylesheet" href="/css/normalize.css" />
          <link rel="stylesheet" href="/css/uikit.min.css" />
          <link rel="stylesheet" href="/css/css3clock.css" />
          <link rel="stylesheet" href="/css/open-sans.css" />
          <link rel="stylesheet" href="/css/changa.css" />
          <link rel="stylesheet" href="/cssext/style.css" /> */}
          {/* <style type="text/css">body, .uk-table th {
              font-family: "Open Sans",'Helvetica Neue',Arial,Helvetica,sans-serif;
              font-size: 24px;
          }
          .uk-heading-hero {
              font-size: 5rem;
              font-weight: 500;
          }
          h2 {
              font-size: 90%;
          }
          </style> */}
        </Helmet>
        <Poster
          className='Poster'
          about={this.state.about}
          updated={this.state.updated}
          intro={this.state.intro}
          news={this.state.news}
          // prayers={this.state.prayers} jamaahShow={this.state.jamaahShow}
        />
        <News className='News'
          // prayers={this.state.prayers} jamaahShow={this.state.jamaahShow}
        />
        <Timetable className='TimetableComp'
          refresh={0}
        />
      </div>
    )
  }
}
