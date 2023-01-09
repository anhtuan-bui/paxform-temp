import React, { useEffect } from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../assets/images/LOGO.svg";
import { ReactComponent as LinkedIn } from "../../assets/images/bxl-linkedin.svg.svg";
import { ReactComponent as YouTube } from "../../assets/images/bxl-youtube.svg.svg";
import { ReactComponent as Facebook } from "../../assets/images/bxl-facebook-circle.svg.svg";
import { ReactComponent as Discord } from "../../assets/images/discord-fill.svg";
import { ReactComponent as Twitter } from "../../assets/images/Twitter - Negative.svg";
import { ReactComponent as Instagram } from "../../assets/images/Instagram - Negative.svg";
import { ReactComponent as WeChat } from "../../assets/images/wechat.svg";
import { ReactComponent as Whatsapp } from "../../assets/images/whatsapp.svg";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const socialMedia = [
  {
    name: "linkedin",
    icon: <LinkedIn />,
    link: "https://www.linkedin.com/company/paxform/",
  },
  {
    name: "facebook",
    icon: <Facebook />,
    link: "",
  },
  {
    name: "twitter",
    icon: <Twitter />,
    link: "",
  },
  {
    name: "instagram",
    icon: <Instagram />,
    link: "",
  },
  {
    name: "youtube",
    icon: <YouTube />,
    link: "",
  },
  {
    name: "discord",
    icon: <Discord />,
    link: "",
  },
  {
    name: "wechat",
    icon: <WeChat />,
    link: "",
  },
  {
    name: "whatsapp",
    icon: <Whatsapp />,
    link: "",
  },
];

export default function Header() {
  const handleScroll = () => {
    const header = document.querySelector(".header");
    if (window.scrollY >= 72) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // return window.removeEventListener("scroll", handleScroll)
  });

  return (
    <header className="header">
      <div className="container">
        <div className="header_container">
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="media">
            <ul>
              {socialMedia.map(
                (item, index) =>
                  item.link && (
                    <li key={index}>
                      <a href={item.link} target="_blank" rel="noreferrer">
                        <IconButton aria-label={item.name}>
                          {item.icon}
                        </IconButton>
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
