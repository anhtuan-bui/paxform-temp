import React, { Component, useState } from "react";
import "./ContactUs.scss";
import Button from "../../components/Button/Button";
import post from "../../lib/restApi";

export default class ContactUs extends Component {
  async componentDidMount() {}

  render() {
    return (
      <main className="contact">
        <section className="hero">
          <div className="container hero__wrapper">
            <div className="hero__content">
              <p className="hero__name">Contact Us</p>
              <h1 className="hero__title">We’d love to hear from you</h1>
              <p className="hero__description">
                If you have any questions about Paxdorm please contact us in
                form beside and we will respond immediately.
              </p>
            </div>
            <div className="form__box-wrapper">
              <div className="form__box">
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="bottom_triangle bottom_triangle--white"></div>
        </section>
        <section className="help">
          <div className="container">
            <span className="help-name">GET IN TOUCH</span>
            <h2 className="help-title">Our teams are here to help</h2>
            <div className="help__wrapper">
              <div className="help__box">
                <div className="help__box__inner">
                  <em className="help__box-icon"></em>
                  <strong className="help__box-title">
                    Text us 309-923-1230
                  </strong>
                  <p className="help__box-desc">
                    Message and data rates may apply
                  </p>
                  <a className="help__box-link" href="/">
                    Message us
                  </a>
                </div>
              </div>
              <div className="help__box">
                <div className="help__box__inner">
                  <em className="help__box-icon"></em>
                  <strong className="help__box-title">Send us an email</strong>
                  <p className="help__box-desc">We’d love to hear from you!</p>
                  <a className="help__box-link" href="/">
                    Email us
                  </a>
                </div>
              </div>
              <div className="help__box">
                <div className="help__box__inner">
                  <em className="help__box-icon"></em>
                  <strong className="help__box-title">
                    Call us at 1-893-909-7845
                  </strong>
                  <p className="help__box-desc">We’d love to hear from you!</p>
                  <a className="help__box-link" href="/">
                    Call us
                  </a>
                </div>
              </div>
              <div className="help__box">
                <div className="help__box__inner">
                  <strong className="help__box-title">
                    Chat with a specialist
                  </strong>
                  <p className="help__box-desc">
                    Available 7am-11pm CT, 7 days a week
                  </p>
                  <a className="help__box-link" href="/">
                    Chat now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [sent, setSent] = useState(false);

  let response = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    response = await post("wp/v2/contact", {
      title: fullName,
      content: message,
      email: email,
      company_name: companyName,
      company_size: companySize,
      status: "private",
      checked: false,
    });

    if (response.id) {
      setFullName("");
      setEmail("");
      setCompanyName("");
      setCompanySize("");
      setMessage("");

      setSent(true);
      setAlert("Messenge sent successfully");
    } else {
      setAlert(response.message);
      setSent(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <strong>Full name</strong>
        <input
          type="text"
          placeholder="John Doe"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      </label>
      <label>
        <strong>Email</strong>
        <input
          type="text"
          placeholder="jondoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <strong>Company name</strong>
        <input
          type="text"
          placeholder="acme corp"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
      </label>
      <label>
        <strong>Company size</strong>
        <select
          onChange={(e) => setCompanySize(e.target.value)}
          value={companySize}
        >
          <option value="" disabled>
            Select a range of employees
          </option>
          <option value="1 - 10">1 - 10</option>
          <option value="10 - 100">10 - 100</option>
          <option value="100 - 1000">100 - 1000</option>
          <option value="Over 1000">Over 1000</option>
        </select>
      </label>
      <label>
        <strong>Message</strong>
        <textarea
          placeholder="Tell your project or anything else we can help"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
      </label>
      <p
        className={`form__message ${
          sent ? "form__message--success" : "form__message--error"
        }`}
      >
        {alert}
      </p>
      <Button text="Send Message" type="flat arrow submit" color="white" />
    </form>
  );
};
