import React from "react";

const PageLoader = () => {
  return (
    <div className="page_loader_outer">
      <div className="page_loader_iner">
        {/* <img src="/loading-loading-forever.gif" alt="" /> */}
        <div class="spinnerloader"></div>
        {/* <div className="find_home">
          <h2>Find Home</h2>
        </div> */}
        {/* <div className="welcome_msg">
          <h2>Welcomes you</h2>
        </div> */}
      </div>
    </div>
  );
};

export default PageLoader;
