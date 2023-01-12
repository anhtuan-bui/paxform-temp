import React, { Component } from "react";
import Button from "../../components/Button/Button";
import "./NotFound.scss";

export default class NotFound extends Component {
  componentDidMount() {
    this.setPageAlignHeight();
    window.addEventListener("resize", this.setPageAlignHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setPageAlignHeight);
  }

  backToHome = () => {
    window.location.href = "/";
  };

  setPageAlignHeight = () => {
    // get page align element height
    const notFound = document.querySelector(".not_found__container");
    const pageAlignHeight = notFound.offsetHeight;

    // get window height
    const windowHeight = window.innerHeight;

    // get header height
    const header = document.querySelector(".header");
    const headerHeight = header.offsetHeight;

    if (pageAlignHeight < windowHeight - headerHeight) {
      notFound.style.minHeight = `${windowHeight - headerHeight}px`;
    }
  };
  render() {
    return (
      <main className="not_found">
        <div className="container">
          <div className="not_found__container">
            <div className="not_found__content">
              <h1 className="not_found__code">
                4<span>0</span>4
              </h1>

              <h2 className="not_found__title">
                Oops's Sorry we can't reach you!{" "}
              </h2>

              <p className="not_found__description">
                This page is missing or you assemble it incorrectly
              </p>
              <Button
                text="Go back to home"
                type="flat arrow"
                color="white"
                onClick={this.backToHome}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}
