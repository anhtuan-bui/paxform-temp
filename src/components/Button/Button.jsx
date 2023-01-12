import React, { Component } from "react";
import { ReactComponent as ArrowRight } from "../../assets/images/arrow-right.svg";
import { ReactComponent as TriangleRight } from "../../assets/images/triangle right.svg";
import "./Button.scss";

export default class Button extends Component {
  button = {
    triangleRight: false,
    arrow: false,
    class: "",
    arrowClass: "",
  };
  constructor(props) {
    super(props);
    this.state = this.button;

    this.handleAttributes();
  }

  handleAttributes = () => {
    if (this.props.arrowVariant === "down") {
      this.button.arrowClass += "button__arrow--90deg";
    }

    if (this.props.color === "white") {
      this.button.class += " button--white";
    }
    if (this.props.color === "green") {
      this.button.class += " button--green";
    }

    // <Button type="arrow"/> the button with arrow icon on the right
    if (this.props.type.includes("arrow")) {
      this.button.arrow = true;
    }

    // <Button type="outline"/> the button with outline
    if (this.props.type.includes("outline")) {
      this.button.class += " button--outline";
    }

    // <Button type="flat"/> flat button
    if (this.props.type.includes("flat")) {
      this.button.class += " button--flat";
    }

    // <Button type="triangle-right"/> the button a triangle on the left
    if (this.props.type.includes("triangle-right")) {
      this.button.triangleRight = true;
    }
  };

  render() {
    return (
      <button
        className={`button${this.state.class}`}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        <TriangleRight
          className={`triangle_right ${
            this.button.triangleRight ? "" : "triangle_right--none"
          }`}
        />
        <span className="button__text">{this.props.text}</span>
        <ArrowRight
          className={`button__arrow ${this.button.arrowClass} ${
            this.button.arrow ? "" : "button__arrow--none"
          }`}
        />
      </button>
    );
  }
}
