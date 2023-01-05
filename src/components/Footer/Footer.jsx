import React from "react";
import syd from "../../assets/images/syd.svg";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <p className="footer__copyright">
            <span>© 2023 Paxform. All rights reserved.</span>
            <span className="footer__copyright-s">|</span>
            <a href="/">
              Read our privacy policy, terms of use and other legal agreements
            </a>
          </p>
          <p className="footer__syd">
            <img src={syd} alt="syd logo" />
            Made in Sydney
          </p>
        </div>
      </div>
    </footer>
  );
}
