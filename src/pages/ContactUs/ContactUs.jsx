import React, { Component } from "react";
import "./ContactUs.scss";
import Button from "../../components/Button/Button";

export default class ContactUs extends Component {
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
						<div className="form__box">
							<form>
								<label>
									<strong>Full name</strong>
									<input type="text" placeholder="John Doe" name="" />
								</label>
								<label>
									<strong>Email</strong>
									<input type="text" placeholder="jondoe@email.com" name="" />
								</label>
								<label>
									<strong>Company name</strong>
									<input type="text" placeholder="acme corp" name="" />
								</label>
								<label>
									<strong>Company size</strong>
									<select name="">
										<option value="" disabled selected>
											Select a range of employees
										</option>
										<option value="100">1 - 100</option>
										<option value="200">101 - 200</option>
										<option value="300">201 - 300</option>
										<option value="400">Over 300</option>
									</select>
								</label>
								<label>
									<strong>Message</strong>
									<textarea placeholder="Tell your project or anything else we can help"></textarea>
								</label>
								<Button
									text="Send Message"
									type="flat arrow submit"
									color="white"
								/>
							</form>
						</div>
					</div>
					<div className="bottom_triangle bottom_triangle--white"></div>
				</section>
				<section className="help">
					<div className="container">
						<span className="help-name">GET IN TOUCH</span>
						<h2 className="help-title">Our teams are here to help</h2>
						<div className="help__wrapper container">
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
					{/* <div className="bottom_triangle bottom_triangle--footer"></div> */}
				</section>
			</main>
		);
	}
}
