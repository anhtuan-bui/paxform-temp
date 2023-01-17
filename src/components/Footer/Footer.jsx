import { useQuery } from "@apollo/client";
import { Skeleton } from "@mui/material";
import React, { createRef, Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import syd from "../../assets/images/syd.svg";
import { GET_LEGAL_CATEGORIES } from "../../lib/graphqlQuery";
import "./Footer.scss";

export default function Footer() {
  const location = useLocation().pathname.split("/");
  const notFound = location[location.length - 1];
  
  const linkRef = createRef();

  useEffect(() => {
    if (!linkRef.current) return;

    const link = linkRef.current;
    link.addEventListener("click", handleLegalLinkClick);

    return () => {
      link.removeEventListener("click", handleLegalLinkClick);
    };
  });

  const handleLegalLinkClick = () => {
    window.scrollTo(0, 0);
  };

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
            <Link ref={linkRef} to="/contact">Contact Us</Link>
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
  const { loading, error, data } = useQuery(GET_LEGAL_CATEGORIES);

  const linkRef = createRef();

  useEffect(() => {
    if (!linkRef.current) return;

    const link = linkRef.current;
    link.addEventListener("click", handleLegalLinkClick);

    return () => {
      link.removeEventListener("click", handleLegalLinkClick);
    };
  });

  const handleLegalLinkClick = () => {
    window.scrollTo(0, 300);
  };

  if (loading) {
    return <Skeleton width={200} />;
  }

  if (error) {
    return;
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
    <Fragment>
      <span className="footer__copyright-s">|</span>
      <Link ref={linkRef} to={`/legal/${categorySlug}/${linkSlug}`}>
        Read our privacy policy, terms of use and other legal agreements
      </Link>
    </Fragment>
  );
};
