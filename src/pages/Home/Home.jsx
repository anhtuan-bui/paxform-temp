import React, { Component } from "react";
import "./Home.scss";
import background from "../../assets/images/background.svg";

import googleplay from "../../assets/images/googleplay.png";
import appstore from "../../assets/images/appstore.png";
import PfButton from "../../components/PfButton/PfButton";
import { ReactComponent as ArrowNext } from "../../assets/images/arrow-next.svg";

export default class Home extends Component {
  render() {
    return (
      <main className="home">
        <div className="home__background">
          <img src={background} alt="up line" />
        </div>
        <div className="home__wrapper">
          <div className="container">
            <div className="home__container">
              <div className="home__content">
                <h1>Welcome to Paxform</h1>
                <div className="content_box">
                  <div className="content_box__item content_box__item--ready">
                    <h4>We are getting our website ready for you!</h4>
                    <p>
                      In the meantime, you can download our apps or register as
                      a form publisher (for incorporated organizations only).
                    </p>
                    <img src={googleplay} alt="google play" />
                    <img src={appstore} alt="appstore" />
                  </div>
                  <div className="content_box__item content_box__item--register">
                    <h4>Register your organization</h4>
                    <p>
                      Sign up as a publisher and start creating forms for your
                      organization. Hurry, before your desired subdomain name is
                      taken.
                    </p>
                    <PfButton text="Register Now" endIcon={<ArrowNext/>}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="bottom_triangle bottom_triangle--white"></div>
      </main>
    );
  }
}
