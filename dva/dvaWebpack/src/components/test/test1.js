import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return <button>{this.props.text}</button>;
  }
}
Button.PropTypes = {
  text: React.proptypes.string
};
Button.defaultProps = {
  text: "Click me!"
};
