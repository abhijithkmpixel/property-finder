import Link from "next/link";
import React from "react";

const Footer = () => {
  function sumbitEmail(e) {
    e.preventDefault();
  }
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-4 col-md-2  mb-3">
            <h5 className="fw-nromal text-light fs-4 mb-4">Services</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link href="/search?type=sale">
                  <a className="nav-link p-0 text-light fs-5 fw-light">Sale</a>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/search?type=rent">
                  <a className="nav-link p-0 text-light fs-5 fw-light">Rent</a>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/search?type=commercial-sale">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Commercial Sale
                  </a>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/search?type=commercial-rent">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Commercial Rent
                  </a>
                </Link>
              </li>
              {/* <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-5 fw-light">About</a></li> */}
            </ul>
          </div>

          <div className="col-4 col-md-2  mb-3">
            <h5 className="fw-nromal text-light fs-4 mb-4">Guides</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link href="/rentersguide">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Renter's Guide
                  </a>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/buyersguide">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Buyer's Guide
                  </a>
                </Link>
              </li>
              {/* <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-5 fw-light">Pricing</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-5 fw-light">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-5 fw-light">About</a></li> */}
            </ul>
          </div>

          <div className="col-4 col-md-2  mb-3">
            <h5 className="fw-nromal text-light fs-4 mb-4">More</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link href="/contact">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Contact Us
                  </a>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/agents">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Find Agent
                  </a>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/privacy-policy">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Privacy policy
                  </a>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/terms-and-conditions">
                  <a className="nav-link p-0 text-light fs-5 fw-light">
                    Terms & conditions
                  </a>
                </Link>
              </li>
              {/* <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-5 fw-light">FAQs</a></li> */}
              <li className="nav-item mb-2">
                <Link href="/about">
                  <a className="nav-link p-0 text-light fs-5 fw-light">About</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form onSubmit={sumbitEmail}>
              <h5 className="fw-nromal text-light fs-4 mb-4">
                Subscribe to our newsletter
              </h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex  flex-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Email address"
                />
                <button className="btn btn-danger btn-lg" type="sumbit">
                  Subscribe
                </button>
              </div>
            </form>
            <ul className="list-unstyled d-flex justify-content-end mt-5">
              <li className="ms-4"><a className="link-dark" href="#"><img src="/socialmedia/inst.png" alt="insta"/></a></li>
              <li className="ms-4"><a className="link-dark" href="#"><img src="/socialmedia/face.png" alt="facebook"/></a></li>
              <li className="ms-4"><a className="link-dark" href="#"><img src="/socialmedia/linked.png" alt="linkedin"/></a></li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>
            {" "}
            © 2000-2022 Home Depot. All Rights Reserved. Use of this site is
            subject to certain Terms Of Use. Local store prices may vary from
            those displayed. Products shown as available are normally stocked
            but inventory levels cannot be guaranteed For screen reader problems
            with this website, please call 1-800-430-3376 or text 38698
            (standard carrier rates apply to texts)
          </p>
          {/* <ul className="list-unstyled d-flex">
        <li className="ms-3"><a className="link-dark" href="#"><img src="/insta.png" alt="insta"/></a></li>
        <li className="ms-3"><a className="link-dark" href="#"><img src="/facebook.png" alt="facebook"/></a></li>
        <li className="ms-3"><a className="link-dark" href="#"><img src="/linkedin.png" alt="linkedin"/></a></li>
      </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
