import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../assets/images/LOGO.svg";
import linkedin from "../../assets/images/bxl-linkedin.svg.svg";
import youtube from "../../assets/images/bxl-youtube.svg.svg";
import facebook from "../../assets/images/bxl-facebook-circle.svg.svg";
import discord from "../../assets/images/discord-fill.svg";
import twitter from "../../assets/images/Twitter - Negative.svg";
import instagram from "../../assets/images/Instagram - Negative.svg";
import wechat from "../../assets/images/wechat.svg";
import whatsapp from "../../assets/images/whatsapp.svg";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const socialMedia = [
  {
    name: "linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com/company/paxform/",
  },
  {
    name: "facebook",
    icon: facebook,
    link: "",
  },
  {
    name: "twitter",
    icon: twitter,
    link: "",
  },
  {
    name: "instagram",
    icon: instagram,
    link: "",
  },
  {
    name: "youtube",
    icon: youtube,
    link: "",
  },
  {
    name: "discord",
    icon: discord,
    link: "",
  },
  {
    name: "wechat",
    icon: wechat,
    link: "",
  },
  {
    name: "whatsapp",
    icon: whatsapp,
    link: "",
  },
];

export default function Header() {
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
              {socialMedia.map((item, index) => (
                item.link && <li key={index}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <IconButton aria-label={item.name}>
                      <img src={item.icon} alt={item.name} />
                    </IconButton>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
