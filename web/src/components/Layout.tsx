import React, { ReactNode } from "react";

const Layout = ({children}) => (
  <div className="bg-gray-800">
    <div className="max-w-7xl pt-4 h-screen mx-auto sm:px-6 lg:px-8">
      { children }
    </div>
  </div>

);

export default Layout;