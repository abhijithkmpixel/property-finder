import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "../../pages/api/firebase";

const Dashboard = ({ setloggedIn }) => {
  const [pages, setpages] = useState(false);
  const [user, setuser] = useState(null);
  // const [loggedIn, setloggedIn] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // setloggedIn(true);
      if (currentUser) {
        // console.log(currentUser);
        setuser(currentUser);
      }
    });

    return () => {};
  }, []);

  const signout = async () => {
    await signOut(auth);
    // setloggedIn(false);
    setuser(null);

  };

  return (
    <aside id="sidebar" className="sidebar break-point-lg has-bg-image">
      <div className="image-wrapper">
        <img
          src="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
          alt="sidebar background"
        />
      </div>
      <div className="sidebar-layout">
        <div className="sidebar-header">
          {/* <span
        style={{
          textTransform: 'uppercase',
          fontSize: '15px',
          letterSpacing:' 3px',
          fontWeight:' bold'
        }}
      >
        Pro Sidebar
      </span> */}
          <img src="/mainlogo1.png" alt="logo" className="logo" />
        </div>
        <div className="sidebar-content">
          <nav className="menu open-current-submenu">
            <ul>
              <li className="menu-item sub-menu">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.closest(".menu-item").classList.toggle("open");
                    // console.log(e.target);
                  }}
                >
                  <span className="menu-icon">
                    <i className="ri-vip-diamond-fill"></i>
                  </span>
                  <span className="menu-title">Data</span>
                  <span className="menu-suffix">&#x1F525;</span>
                </a>
                <div className="sub-menu-list">
                  <ul>
                    <li className="menu-item">
                      <Link href="/add-agent">
                        <a>
                          <span className="menu-title">Agents</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/add-property">
                        <a>
                          <span className="menu-title">Properties</span>
                        </a>
                      </Link>
                    </li>
                    {/* <li className="menu-item sub-menu">
                    <a href="#">
                      <span className="menu-title">Forms</span>
                    </a>
                    <div className="sub-menu-list">
                      <ul>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Input</span>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="#">
                            <span className="menu-title">Select</span>
                          </a>
                        </li>
                        <li className="menu-item sub-menu">
                          <a href="#">
                            <span className="menu-title">More</span>
                          </a>
                          <div className="sub-menu-list">
                            <ul>
                              <li className="menu-item">
                                <a href="#">
                                  <span className="menu-title">
                                    CheckBox
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item">
                                <a href="#">
                                  <span className="menu-title">
                                    Radio
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item sub-menu">
                                <a href="#">
                                  <span className="menu-title">
                                    Want more ?
                                  </span>
                                  <span className="menu-suffix">
                                    &#x1F914;
                                  </span>
                                </a>
                                <div className="sub-menu-list">
                                  <ul>
                                    <li className="menu-item">
                                      <a href="#">
                                        <span className="menu-prefix">
                                          &#127881;
                                        </span>
                                        <span className="menu-title">
                                          You made it{" "}
                                        </span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                  </ul>
                </div>
              </li>
              <li className="menu-item sub-menu">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.closest(".menu-item").classList.toggle("open");
                    // console.log(e.target);
                  }}
                >
                  <span className="menu-icon">
                    <i className="ri-bar-chart-2-fill"></i>
                  </span>
                  <span className="menu-title">Pages</span>
                </a>
                <div className="sub-menu-list">
                  <ul>
                    <li className="menu-item">
                      <Link href={"/admin/guides/rentguide"}>
                        <a>
                          <span className="menu-title">Renter's guide</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/admin/guides/buyerguide">
                        <a>
                          <span className="menu-title">Buyer's guide</span>
                        </a>
                      </Link>
                    </li>
                    {/* <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">Bar chart</span>
                    </a>
                  </li> */}
                  </ul>
                </div>
              </li>
              {/* <li className="menu-item sub-menu">
              <a href="#">
                <span className="menu-icon">
                  <i className="ri-shopping-cart-fill"></i>
                </span>
                <span className="menu-title">E-commerce</span>
              </a>
              <div className="sub-menu-list">
                <ul>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">Products</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">Orders</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">credit card</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item sub-menu">
              <a href="#">
                <span className="menu-icon">
                  <i className="ri-global-fill"></i>
                </span>
                <span className="menu-title">Maps</span>
              </a>
              <div className="sub-menu-list">
                <ul>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">Google maps</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">Open street map</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item sub-menu">
              <a href="#">
                <span className="menu-icon">
                  <i className="ri-brush-3-fill"></i>
                </span>
                <span className="menu-title">Theme</span>
              </a>
              <div className="sub-menu-list">
                <ul>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">Dark</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#">
                      <span className="menu-title">Light</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <a href="#">
                <span className="menu-icon">
                  <i className="ri-book-2-fill"></i>
                </span>
                <span className="menu-title">Documentation</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="#">
                <span className="menu-icon">
                  <i className="ri-calendar-fill"></i>
                </span>
                <span className="menu-title">Calendar</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="#">
                <span className="menu-icon">
                  <i className="ri-service-fill"></i>
                </span>
                <span className="menu-title">Examples</span>
              </a>
            </li> */}
            </ul>
          </nav>
        </div>
        <div className="sidebar-footer d-flex flex-column">
          <span>{user?.email}</span>
          <button className="btn btn-danger w-100" onClick={signout}>Logout</button>
        </div>
      </div>
    </aside>
  );
};

export default Dashboard;
