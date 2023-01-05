import React, { Component, Fragment } from "react";
import "./Layout.scss";
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Outlet />
        <Footer />
      </Fragment>
    );
  }
}
