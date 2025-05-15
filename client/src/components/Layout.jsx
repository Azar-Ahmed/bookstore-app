import React from "react";
import AppNavbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      {/* <AppNavbar /> */}
      <main className="p-4">{children}</main>
    </>
  );
}

export default Layout;
