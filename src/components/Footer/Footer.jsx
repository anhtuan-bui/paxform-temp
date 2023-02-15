// import { useQuery } from "@apollo/client";
// import { Skeleton } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import syd from "../../assets/images/syd.svg";
import client from "../../configurations/apollo";
import {
  GET_LEGAL_BY_SLUG,
  GET_LEGAL_CATEGORIES,
} from "../../lib/graphqlQuery";
// import { GET_LEGAL_CATEGORIES } from "../../lib/graphqlQuery";
import "./Footer.scss";

import { scrollTop } from "../../lib/helper";

export default function Footer() {
  const location = useLocation().pathname.split("/");
  const notFound = location[location.length - 1];

  useEffect(() => {
    prefetchLegal();
  });

  // hide footer on not found page
  if (notFound === "not-found") {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container footer--margin-top">
        <div className="footer__container">
          <p className="footer__copyright">
            <span>© 2023 Paxform. All rights reserved.</span>
            <span className="footer__copyright-s">|</span>
            <a href="/contact" onClick={scrollTop}>
              Contact Us
            </a>
            <FooterTermLink />
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
const linkSlug = "terms-of-use";

const FooterTermLink = () => {

  return (
    <Fragment>
      <span className="footer__copyright-s">|</span>
      <Link to={`/legal/${linkSlug}`} onClick={scrollTop}>
        Read our privacy policy, terms of use and other legal agreements
      </Link>
    </Fragment>
  );
};

const prefetchLegal = async () => {
  await client.query({
    query: GET_LEGAL_BY_SLUG,
    variables: { slug: linkSlug },
  });
  await client.query({ query: GET_LEGAL_CATEGORIES });
};
