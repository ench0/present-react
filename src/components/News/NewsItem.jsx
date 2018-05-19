import React, { Component } from 'react'

class NewsItem extends Component {
  constructor (props) {
    super(props)
    // var tomorrow = 0
    this.state = {
      // prayers: []
      // jamaahShow: true
    }
  }

  componentDidMount () {
    // this.getTimes();
  }

  componentWillUnmount () {
    // clearInterval(this.timerID)
  }

  componentWillReceiveProps (nextProps) {
    // // console.log(nextProps)
    // if (nextProps.jamaahShow !== this.state.jamaahShow) {
    //   this.setState({ jamaahShow: nextProps.jamaahShow })
    // }
  }

  render () {
    return (
      <div className='NewsItem'>
        <div className='column1'>
          <img src={'https://islamireland.ie/' + this.props.news.img} />
        </div>
        <div className='column2'>
          <h2>{this.props.news.title}</h2>
          <div>{this.props.news.summary}...</div>
        </div>
      </div>
    )
  }
}

export default NewsItem
