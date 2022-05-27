import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header_inner_wrapper">
          <div className="brand_logo">
            <Link href="/">
              <img src="/logo.png" alt="logo" />
            </Link>
          </div>
          <nav>
            <ul className="main_navigation">
              <li>
                <Link href="/">Buy</Link>
              </li>
              <li>
                <Link href="/">Rent</Link>
              </li>
              <li>
                <Link href="/">Commercial</Link>
              </li>
              <li>
                <Link href="/">New projects</Link>
              </li>
              <li>
                <Link href="/">Find agent</Link>
              </li>
              <li>
                <h5>
                  Property prices
                  <img src="/chevron-down.svg" alt="arrow down" />
                </h5>
                <ul className="sub_dropdown">
                  <li>
                    <Link href="/">House prices </Link>
                  </li>
                  <li>
                    <Link href="/">Rent vs buy calculator </Link>
                  </li>
                  <li>
                    <Link href="/">Mo'asher: Dubai Price Index </Link>
                  </li>
                </ul>
              </li>
              <li>
                <h5>
                  Explore
                  <img src="/chevron-down.svg" alt="arrow down" />
                </h5>
                <ul className="sub_dropdown">
                  <li>
                    <Link href="/">Building reviews</Link>
                  </li>
                  <li>
                    <Link href="/">Community Guides </Link>
                  </li>
                  <li>
                    <Link href="/">Property Blog </Link>
                  </li>
                  <li>
                    <Link href="/">Renter's guide </Link>
                  </li>
                  <li>
                    <Link href="/">Buyer's guide </Link>
                  </li>
                  <li>
                    <Link href="/">Mortgages </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="account_navigation">
            <div className="favourites">
              <Link href="/">
                <img src="/suit-heart.svg" alt="arrow down" />
              </Link>
            </div>
            <div className="account_avatar">
              <img src="https://lh3.googleusercontent.com/a-/AOh14GhPJ8CgYNK7mdX_4DntzSf3hI3XrcvUwUuGMhN3=s96-c" alt="" />
              <div className="account_lists">
                <div className="customer_data">
                  <div className="avatar">
                    <img src="https://lh3.googleusercontent.com/a-/AOh14GhPJ8CgYNK7mdX_4DntzSf3hI3XrcvUwUuGMhN3=s96-c" alt="avatar" />
                  </div>
                  <div className="bodycopy">
                    <h5>ancd@gmail.com</h5>
                    <button>Log out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
