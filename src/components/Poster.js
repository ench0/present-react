import React, { Component } from 'react';
// import settings from '../settings.json'


class Poster extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // settings: this.props.settings
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.settings !== this.state.settings) {
        //   this.setState({ settings: nextProps.settings });
        // }
    }

    render() {

        return (
            <div className="Poster">
                koko
                {/* <div></div>
                <div>{this.state.settings.title}</div>
                <div></div> */}
            </div>
        );
    }
}

export default Poster