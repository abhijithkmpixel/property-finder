import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer_inner">
          <div className="row">
            <div className="col-12 col-md-6">
              {/* <a href="/" className="logo">
                <img src="/mainlogo1.png" alt="find homes logo" />
              </a> */}
              <p>
                © 2000-2022 Home Depot. All Rights Reserved. Use of this site is
                subject to certain Terms Of Use. Local store prices may vary
                from those displayed. Products shown as available are normally
                stocked but inventory levels cannot be guaranteed For screen
                reader problems with this website, please call 1-800-430-3376 or
                text 38698 (standard carrier rates apply to texts)
              </p>
            </div>
            <div className="col-12 col-md-6">
                <label htmlFor="email_popup">
                  Subscribe to our news letter
                </label>
              <div className="mail-info">
                <input
                  type="text"
                  className="form-control text"
                  ID="email_popup"
                  placeholder="Enter your email address"
                />
                <button
                  // href="javascript:checkIfEmail();"
                  runat="server"
                  id="button_change"
                  class="btn btn-danger btn-lg"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
