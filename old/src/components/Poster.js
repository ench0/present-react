import React, { Component } from 'react';
// import settings from '../settings.json'

class Poster extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // settings: this.props.settings
      about: '',
      updated: '',
      intro: { text: '', title: '' },
      news: [{ summary: '', news: '', title: '' }]
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.about !== this.state.about) {
      this.setState({ about: nextProps.about });
    }
    if (nextProps.updated !== this.state.updated) {
      this.setState({ updated: nextProps.updated });
    }
    if (nextProps.intro !== this.state.intro) {
      this.setState({ intro: nextProps.intro });
    }
    if (nextProps.news !== this.state.news) {
      this.setState({ news: nextProps.news });
    }
  }

  render () {
    console.log(this.state)
    return (
      <div className='Poster'>
        <h1><span>NEWS</span></h1>
        <div>{this.state.news[0].title}</div>
        <img src={'https://islamireland.ie' + this.state.news[0].img} />
        <div>{this.state.news[0].summary}</div>
        <div>{this.state.intro.text}</div>
        <div>{this.state.intro.title}</div>
      </div>
    );
  }
}

export default Poster
