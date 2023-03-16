import React, {
  Component,
  createRef,
  Fragment,
  useState,
} from "react";
import "./DataRequest.scss";
import upline from "../../assets/images/upline.svg";
import ReCAPTCHA from "react-google-recaptcha";
import PfButton from "../../components/PfButton/PfButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import post from "../../lib/restApi";

import countries from "../../assets/json/countries";

export default class DataRequest extends Component {
  render() {
    return (
      <div className="page_align">
        <main className="legal">
          <section className="hero">
            <div className="container">
              <div className="hero__container">
                <h1 className="hero__title">
                  Data Subject Access Request Form
                </h1>
              </div>
            </div>
            <div className="hero__background">
              <img src={upline} alt="" aria-hidden="true" />
            </div>
            <div className="bottom_triangle bottom_triangle--white"></div>
          </section>

          <section className="form">
            <div className="container">
              <p className="form__description">
                You should complete this form if you want to request access to
                or correct any personal data we hold about you. You are
                currently entitled to receive this information under the Data
                Protection Act 2018 (DPA) and the EU General Data Protection
                Regulation (GDPR).
              </p>

              <DataRequestForm />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const DataRequestForm = () => {
  const sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  let alerts = {
    firstName: "Please enter your first name",
    lastName: "Please enter your last name",
    email: "Please enter your email address",
    company: "Please enter your company name",
    relationshipToPaxform: "Your relationship with Paxform is required",
    detailsOfRequest: "Your details of request is required",
    message: "Please enter your message",
    captcha: "Verify that you are not a robot",
  };

  const relationshipCheckbox = [
    "Customer",
    "Partner",
    "Vendor/Suplier",
    "Former Employee or Contractor",
  ];

  const detailsRequest = [
    "Confirmation as to whether Paxform, as a data controller, processes my personal data",
    "Source of my personal data",
    "Purpose for processing my personal data",
    "Categories of my personal data processed",
    "Recipients to whom my personal data has been or will be disclosed",
    "Retention period or policy criteria for retention of my personal data",
    "Safeguards relating to transfer of my personal data outside of the EU, if applicable",
    "Copy of my personal data controlled and processed by Paxform",
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("Australia");
  const [relationshipToPaxform, setRelationshipToPaxform] = useState([]);
  const [detailsOfRequest, setDetailsOfRequest] = useState([]);
  const [message, setMessage] = useState("");

  const [alertMessage, setAlertMessage] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const recaptchaRef = createRef();

  let response = {};

  const fetchCaptcha = async () => {
    const captchaToken = recaptchaRef.current.getValue();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: captchaToken,
      }),
    };

    const res = await fetch(
      `https://wp.paxform.com/wp-json/recaptcha/v2/verification`,
      options
    );
    const data = await res.json();
    return data.success;
  };

  const handleRecaptchaChange = async () => {
    setCaptcha(await fetchCaptcha());
  };

  const handleCheckboxChanges = (e, array) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) {
      array.push(value);
    } else {
      array.splice(array.indexOf(value, 1));
    }
  };

  const handleRelationshipChanges = (e) => {
    handleCheckboxChanges(e, relationshipToPaxform);
  };
  const handleDetailsOfRequest = (e) => {
    handleCheckboxChanges(e, detailsOfRequest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredConditions =
      firstName &&
      lastName &&
      email &&
      company &&
      relationshipToPaxform &&
      detailsOfRequest;

    if (captcha && !sent && requiredConditions) {
      setSent(true);
      response = await post("wp/v2/data_request", {
        title: firstName + " " + lastName,
        first_name: firstName,
        last_name: lastName,
        email: email,
        company: company,
        country: country,
        relationship_to_paxform: relationshipToPaxform.join(", "),
        details_of_request: detailsOfRequest.join(", "),
        content: message,

        status: "private",
        checked: false,
      });
    } else if (!captcha) {
      setAlertMessage(true);
    }

    if (response.id) {
      setModalOpen(true);
    } else {
      setAlertMessage(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <Fragment>
      <form className="data_request" onSubmit={handleSubmit}>
        <label>
          <strong>
            First Name <span className="data_request__required">*</span>
          </strong>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />
          <p
            className={`form__message form__message--error
             ${firstName || !alertMessage ? "form__message--hidden" : ""}`}
          >
            {alerts.firstName}
          </p>
        </label>
        <label>
          <strong>
            Last Name <span className="data_request__required">*</span>
          </strong>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          />
          <p
            className={`form__message form__message--error
             ${lastName || !alertMessage ? "form__message--hidden" : ""}`}
          >
            {alerts.lastName}
          </p>
        </label>
        <label>
          <strong>
            Email <span className="data_request__required">*</span>
          </strong>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <p
            className={`form__message form__message--error ${
              email || !alertMessage ? "form__message--hidden" : ""
            }`}
          >
            {alerts.email}
          </p>
        </label>
        <label>
          <strong>
            Company <span className="data_request__required">*</span>
          </strong>
          <input
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            required
          />
          <p
            className={`form__message form__message--error ${
              company || !alertMessage ? "form__message--hidden" : ""
            }`}
          >
            {alerts.company}
          </p>
        </label>
        <label>
          <strong>Country</strong>
          <select
            name="country"
            id="country"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((item, index) => (
              <option value={item.country_name} key={index}>
                {item.country_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <strong>
            What is your relationship to Paxform (select all that apply)?{" "}
            <span className="data_request__required">*</span>
          </strong>
          {relationshipCheckbox.map((checkbox, index) => (
            <label
              className="data_request__checkbox-label"
              htmlFor={checkbox.toLowerCase().split(" ").join("-")}
              key={index}
            >
              <input
                className="data_request__checkbox"
                id={checkbox.toLowerCase().split(" ").join("-")}
                type="checkbox"
                name={checkbox.toLowerCase().split(" ").join("-")}
                value={checkbox}
                onChange={(e) => handleRelationshipChanges(e)}
              />
              <span>{checkbox}</span>
              <br />
            </label>
          ))}
          <p
            className={`form__message form__message--error ${
              relationshipToPaxform || !alertMessage
                ? "form__message--hidden"
                : ""
            }`}
          >
            {alerts.relationshipToPaxform}
          </p>
        </label>
        <label>
          <strong>
            Details of Request (select all that apply){" "}
            <span className="data_request__required">*</span>
          </strong>
          {detailsRequest.map((checkbox, index) => (
            <label
              className="data_request__checkbox-label"
              htmlFor={checkbox.toLowerCase().split(" ").join("-")}
              key={index}
            >
              <input
                className="data_request__checkbox"
                type="checkbox"
                id={checkbox.toLowerCase().split(" ").join("-")}
                name={checkbox.toLowerCase().split(" ").join("-")}
                value={checkbox}
                onChange={(e) => handleDetailsOfRequest(e)}
              />
              <span>{checkbox}</span>
              <br />
            </label>
          ))}
          <p
            className={`form__message form__message--error ${
              detailsOfRequest || !alertMessage ? "form__message--hidden" : ""
            }`}
          >
            {alerts.detailsOfRequest}
          </p>
        </label>

        <p>
          <strong>Note:</strong> Paxform does not use automated decision-making
          as described in Article 22 of the GDPR.
        </p>

        <label>
          <p>
            If you would like to exercise your right to have your personal data
            rectified or erased or to restrict or object to processing of your
            personal data, please submit that request in the space below with as
            much specificity as possible:
          </p>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            rows={10}
          ></textarea>
        </label>

        <p>
          Paxform will do its best to respond within one month of the date of
          your request. If your request is unclear or complex, it may take
          longer for us to respond.
        </p>
        <p>
          If you are not satisfied with the response you receive, please let us
          know by emailing privacy@paxform.com. We will do our best to work with
          you to find a suitable resolution. If you are still not satisfied, you
          may lodge a complaint with your national data protection supervisory
          authority. The list of European Data Protection Board authorities can
          be found here. The Office of the Privacy Commissioner of Canada can be
          found here.
        </p>

        <p>
          <strong>
            Please do not enter sensitive personal information or protected
            health information into this form.
          </strong>
        </p>
        <p>
          <span className="data_request__required">*</span>{" "}
          <strong>
            <i>
              <small>questions are compulsory.</small>
            </i>
          </strong>
        </p>
        <div className="data_request__button">
          <ReCAPTCHA
            className="recaptcha"
            sitekey={sitekey}
            onChange={handleRecaptchaChange}
            ref={recaptchaRef}
          />
          <p
            className={`form__message form__message--error
           ${captcha || !alertMessage ? "form__message--hidden" : ""}`}
          >
            {alerts.captcha}
          </p>

          <br />
          <PfButton
            text="Submit"
            type="flat arrow submit"
            color="white"
            buttonType="submit"
          />
        </div>
      </form>
      <Dialog onClose={handleModalClose} open={modalOpen}>
        <DialogTitle>Contact Form</DialogTitle>
        <DialogContent>
          <p>
            Your message has been sent successfully!
            <br />
            Thank you, we will return to you shortly.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
