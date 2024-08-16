import React from "react";
import Navbar from "../Copmonents/Shared/Navbar";
import Footer from "../Copmonents/Shared/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-[85%] mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Root;
