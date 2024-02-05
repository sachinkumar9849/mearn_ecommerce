// Breadcrumb.js

import { Link } from "react-router-dom";
import React from "react";

const Breadcrumb = ({ pages }) => {
  return (
    <div className="bg-gray-300">
      <nav className="mx-auto max-w-7xl py-4 breadcrumb_div">
        <ol className="list-none p-0 inline-flex">
          {pages.map((page, index) => (
            <li key={index} className="flex items-center">
              {page.link ? (
                <Link to={page.link} className={page.linkClass || ""}>
                  {page.label}
                </Link>
              ) : (
                <span className={page.labelClass || ""}>{page.label}</span>
              )}
              {index < pages.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
