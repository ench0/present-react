import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NewsItem extends Component {
  constructor(props) {
    super(props)
    // var tomorrow = 0
    this.state = {
      // prayers: []
      // jamaahShow: true
    }
  }

  componentDidMount() {
    // this.getTimes();
  }

  // componentWillReceiveProps(nextProps) {
  //   // // console.log(nextProps)
  //   // if (nextProps.jamaahShow !== this.state.jamaahShow) {
  //   //   this.setState({ jamaahShow: nextProps.jamaahShow })
  //   // }
  // }

  componentWillUnmount() {
    // clearInterval(this.timerID)
  }

  render() {
    return (
      <div className="NewsItem">
        <div className="column1">
          <img src={`https://islamireland.ie/${this.props.news.img}`} alt="" />
        </div>
        <div className="column2">
          <h2>{this.props.news.title}</h2>
          <div>{this.props.news.summary}...</div>
        </div>
      </div>
    )
  }
}

export default NewsItem

NewsItem.defaultProps = {
  news: PropTypes.object,
}

NewsItem.propTypes = {
  news: PropTypes.object,
}
