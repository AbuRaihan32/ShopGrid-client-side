import React from "react";
import Navbar from "../Copmonents/Shared/Navbar";
import Footer from "../Copmonents/Shared/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Root;
