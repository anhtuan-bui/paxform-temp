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

import { ReactComponent as TableOfContentButton } from "../../assets/icons/list_alt.svg";
import client from "../../configurations/apollo";
import { useEffect } from "react";

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

    // get footer height
    const footer = document.querySelector(".footer");
    const footerHeight = footer.offsetHeight;

    if (pageAlignHeight < windowHeight  - footerHeight - 40) {
      pageAlign.style.minHeight = `${
        windowHeight  - footerHeight
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
    if (open) {
      mobileButton.style.transform = "rotate(-180deg)";
    } else {
      mobileButton.style.transform = "rotate(0)";
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
                <TableOfContentButton />
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
      {loading ? <Skeleton variant="h1" /> : data.legalBy?.title.toLowerCase()}
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
          <Skeleton
            key={index}
            height={index % 5 === 0 ? 40 : 20}
            sx={{
              marginBottom: index % 5 === 0 ? "20px" : "",
              marginTop: index % 5 === 0 ? "20px" : "",
            }}
          />
        ))}
      </div>
    );

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.legalBy?.content,
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
        {loading ? (
          <Skeleton width={100} />
        ) : (
          data?.legalBy?.title.toLowerCase()
        )}
      </Typography>
    </Breadcrumbs>
  );
};

const SideBar = () => {
  const pathnames = useLocation().pathname.split("/");
  const slug = pathnames[pathnames.length - 1];
  const { loading, error, data } = useQuery(GET_LEGAL_CATEGORIES);
  useEffect(() => {
    if (data) {
      data.legalCategories.nodes.forEach((category) => {
        category.legals.nodes.forEach((page) => {
          prefetchLegalBySlug(page.slug);
        });
      });
    }
  });
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (loading)
    return (
      <div className="sidebar">
        {skeleton.map((item, index) => (
          <Skeleton
            key={index}
            width={100}
            height={index % 3 === 0 ? 32 : 24}
            sx={{
              marginBottom: index % 3 === 0 ? "5px" : "",
              marginTop: index % 3 === 0 ? "5px" : "",
            }}
          />
        ))}
      </div>
    );
  if (error) return <p>Error</p>;

  const legalCategories = data.legalCategories.nodes;
  let arraySort = [...legalCategories];
  arraySort.sort((a, b) => b.name.localeCompare(a.name));

  return (
    <div className="sidebar">
      {arraySort.map(
        (category, index) =>
          category.legals.nodes.length > 0 && (
            <dl key={index}>
              <dt>{category.name}</dt>
              {category.legals.nodes.map((legal, index) => (
                <dd key={index}>
                  <Link
                    className={legal.slug === slug ? "link--active" : undefined}
                    to={`/legal/${legal.slug}`}
                    // onMouseOver={() => prefetchLegalBySlug(legal.slug)}
                  >
                    {legal?.title.toLowerCase()}
                  </Link>
                </dd>
              ))}
            </dl>
          )
      )}
    </div>
  );
};

const prefetchLegalBySlug = async (slug) => {
  await client.query({
    query: GET_LEGAL_BY_SLUG,
    variables: {
      slug: slug,
    },
  });
};
