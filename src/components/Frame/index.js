import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Frame extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      // eslint-disable-next-line react/prop-types
      <iframe {...this.props} src={this.props.src || this.props.url}>
        <p>Your browser does not support iframes.</p>
      </iframe>
    );
  }
}
