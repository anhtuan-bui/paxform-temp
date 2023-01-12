import { useQuery } from "@apollo/client";
import { Skeleton } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import syd from "../../assets/images/syd.svg";
import { GET_LEGAL_CATEGORIES } from "../../lib/graphqlQuery";
import "./Footer.scss";

export default function Footer() {
  const location = useLocation().pathname.split("/");
  const notFound = location[location.length - 1];

  if (notFound === "not-found") {
    // hide footer on not found page
    return null;
  }

  return (
    <footer className="footer">
      <div className="container footer--margin-top">
        <div className="footer__container">
          <p className="footer__copyright">
            <span>© 2023 Paxform. All rights reserved.</span>
            <span className="footer__copyright-s">|</span>
            <Link to="/contact">Contact Us</Link>
            <span className="footer__copyright-s">|</span>
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

const FooterTermLink = () => {
  let categorySlug = "";
  let linkSlug = "";
  const { loading, data } = useQuery(GET_LEGAL_CATEGORIES);

  if (loading) {
    return <Skeleton width={200} />;
  }

  const legalCategories = data.legalCategories?.nodes;
  let arraySort = [...legalCategories];
  arraySort.sort((a, b) => b.name.localeCompare(a.name));

  for (let i = 0; i < arraySort.length; i++) {
    categorySlug = arraySort[i].slug;
    if (arraySort[i].legals.nodes.length > 0) {
      linkSlug = arraySort[i].legals.nodes[0].slug;
      break;
    }
  }

  return (
    <Link to={`/legal/${categorySlug}/${linkSlug}`}>
      Read our privacy policy, terms of use and other legal agreements
    </Link>
  );
};
