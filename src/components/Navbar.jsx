import React from "react";

import logo from "../img/logo.jpg";

function Navbar() {
  return (
    <div className="nav  p-2 pl-7 h-24 flex flex-row items-end">
      <h1 className="text-6xl text-red-500 font-extrabold">
        Pic<span className="text-blue-500">URL</span>
        <span className="text-green-500">ify</span>
      </h1>
    </div>
  );
}

export default Navbar;
