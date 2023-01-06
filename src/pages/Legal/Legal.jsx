import React, { Component } from "react";
import "./Legal.scss";
import upline from "../../assets/images/upline.svg";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Drawer, Skeleton, Typography } from "@mui/material";
import { ReactComponent as ArrowNext } from "../../assets/images/arrow-next.svg";
import { SCREEN_SIZE } from "../../configurations/configurations";
import { useQuery } from "@apollo/client";
import {
  GET_LEGAL_BY_SLUG,
  GET_LEGAL_CATEGORIES,
} from "../../lib/graphqlQuery";

export default class Legal extends Component {
  legal = { drawerOpen: false, data: {} };

  constructor(props) {
    super(props);
    this.state = this.legal;
  }
  componentDidMount() {
    // this.setPageAlignHeight();
    this.handleMobile();
    window.addEventListener("resize", this.handleMobile);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleMobile);
  }

  setPageAlignHeight = () => {
    // get page align element height
    const pageAlign = document.querySelector(".page_align");
    const pageAlignHeight = pageAlign.offsetHeight;

    // get window height
    const windowHeight = window.innerHeight;

    // get header height
    const header = document.querySelector(".header");
    const headerHeight = header.offsetHeight;

    // get footer height
    const footer = document.querySelector(".footer");
    const footerHeight = footer.offsetHeight;

    if (pageAlignHeight < windowHeight - headerHeight - footerHeight - 20) {
      pageAlign.style.height = `${
        windowHeight - headerHeight - footerHeight
      }px`;
    }
  };

  handleMobile() {
    // mobile button appear if the screen size is smaller than 576px
    const mobileButton = document.querySelector(".mobile_button");
    const sidebar = document.querySelector(".sidebar");

    if (window.innerWidth < SCREEN_SIZE.small) {
      mobileButton?.classList.remove("mobile_button--disabled");
      sidebar?.classList.add("sidebar--disabled");
    } else {
      mobileButton?.classList.add("mobile_button--disabled");
      sidebar?.classList.remove("sidebar--disabled");
    }
  }

  handleMobileButtonClick() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar--disabled");
  }

  toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    //move the mobile button to the right edge of the sidebar
    const mobileButton = document.querySelector(".mobile_button");
    const sidebar = document.querySelector(".sidebar");
    if (open) {
      mobileButton.style.right = `${sidebar.offsetWidth}px`;
    } else {
      mobileButton.style.right = "0";
    }

    this.legal.drawerOpen = open;
    this.setState(this.legal);
  };

  render() {
    return (
      <div className="page_align">
        <Drawer
          anchor="left"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
        >
          <SideBar />
        </Drawer>
        <main className="legal">
          <section className="hero">
            <div className="container">
              <div className="hero__container">
                <HeroTitle />
              </div>
            </div>
            <div className="hero__background">
              <img src={upline} alt="" aria-hidden="true" />
            </div>
            <div className="bottom_triangle bottom_triangle--white"></div>
          </section>

          <section className="content">
            <div className="container">
              <div
                className="mobile_button mobile_button--disabled"
                onClick={
                  this.state.drawerOpen
                    ? this.toggleDrawer(false)
                    : this.toggleDrawer(true)
                }
              >
                <ArrowNext />
              </div>
              <div className="content__wrapper">
                <SideBar />
                <div className="content__container">
                  <div className="breadcrumbs">
                    <PfBreadcrumbs />
                  </div>
                  <div className="content__box">
                    <ContentBox />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const HeroTitle = () => {
  const path = useLocation().pathname;
  const pathnames = path.split("/").filter((x) => x);
  const slug = pathnames[pathnames.length - 1];

  const { loading, data } = useQuery(GET_LEGAL_BY_SLUG, {
    variables: {
      slug: slug,
    },
  });

  return (
    <h1 className="hero__title">
      {loading ? <Skeleton variant="h1"  /> : data.legalBy.title}
    </h1>
  );
};

const ContentBox = () => {
  const path = useLocation().pathname;
  const pathnames = path.split("/").filter((x) => x);
  const slug = pathnames[pathnames.length - 1];

  const { loading, data } = useQuery(GET_LEGAL_BY_SLUG, {
    variables: {
      slug: slug,
    },
  });
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (loading)
    return (
      <div className="sidebar">
        {skeleton.map((item, index) => (
          <Skeleton key={index} height={index % 5 === 0 ? 40 : 20} sx={{marginBottom: index % 5 === 0 ? '20px': ''}}/>
        ))}
      </div>
    );

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.legalBy.content,
      }}
    ></div>
  );
};

const PfBreadcrumbs = () => {
  const path = useLocation().pathname;
  const pathnames = path.split("/").filter((x) => x);
  const names = pathnames.slice(0, pathnames.length - 1);
  const lastName = pathnames[pathnames.length - 1];

  const slug = lastName;

  const { loading, data } = useQuery(GET_LEGAL_BY_SLUG, {
    variables: {
      slug: slug,
    },
  });

  return (
    <Breadcrumbs separator={<ArrowNext />} aria-label="breadcrumb">
      {names.map((item, index) => (
        <Link key={index} underline="hover" color="inherit" href={path}>
          {loading ? <Skeleton width={100} /> : item.split("-").join(" ")}
        </Link>
      ))}
      <Typography color="text.primary">
        {loading ? <Skeleton width={100} /> : data?.legalBy.title}
      </Typography>
    </Breadcrumbs>
  );
};

const SideBar = () => {
  const { loading, error, data } = useQuery(GET_LEGAL_CATEGORIES);
  const skeleton = [1, 2, 3, 4, 5, 6];
  if (loading)
    return (
      <div className="sidebar">
        {skeleton.map((item, index) => (
          <Skeleton key={index} width={100} />
        ))}
      </div>
    );
  if (error) return <p>Error</p>;

  const legalCategories = data.legalCategories.nodes;

  return (
    <div className="sidebar">
      {legalCategories.map(
        (category, index) =>
          category.legals.nodes.length > 0 && (
            <dl key={index}>
              <dt>{category.name}</dt>
              {category.legals.nodes.map((legal, index) => (
                <dd key={index}>
                  <Link to={`/legal/${category.slug}/${legal.slug}`}>
                    {legal.title}
                  </Link>
                </dd>
              ))}
            </dl>
          )
      )}
    </div>
  );
};
