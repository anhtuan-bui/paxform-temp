import { useQuery } from "@apollo/client";
import { Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import syd from "../../assets/images/syd.svg";
import { GET_LEGAL_CATEGORIES } from "../../lib/graphqlQuery";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer--margin-top">
        <div className="footer__container">
          <p className="footer__copyright">
            <span>© 2023 Paxform. All rights reserved.</span>
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
  const { loading, data } = useQuery(GET_LEGAL_CATEGORIES);
  if (loading) {
    return <Skeleton width={200} />;
  }
  
  const legalCategories = data?.legalCategories?.nodes;
  let arraySort = [...legalCategories];
  arraySort.sort((a, b) => b.name.localeCompare(a.name));
  let list = arraySort?.map((item) => item.legals.nodes);
  list = list.flat(1);
  const slug = list[0].slug;

  return (
    <Link to={`/legal/mobile-app/${slug}`}>
      Read our privacy policy, terms of use and other legal agreements
    </Link>
  );
};
