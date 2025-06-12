import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "../Cart/Cart";

const RootLayout = () => {


  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Cart/>
      <main
        style={{
          flex: 1,
          backgroundColor: "#121212",
          color: "#f1f1f1",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
