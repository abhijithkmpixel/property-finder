import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="page_loader_outer">
      {/* <img src="/loading-loading-forever.gif" alt="" /> */}
      <div className="a text-center">

      <h1>This is a protected route</h1>
      <Link href={"/"}>
        <a className="btn btn-danger btn-lg"> Go to homepage</a>
      </Link>
      </div>
    </div>
  );
};

export default index;
