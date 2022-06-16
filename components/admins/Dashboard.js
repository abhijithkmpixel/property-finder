import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "../../pages/api/firebase";

const Dashboard = ({ setloggedIn }) => {
  const [pages, setpages] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setloggedIn(true);
    });

    return () => {};
  }, []);

  const signout = async () => {
    await signOut(auth);
    setloggedIn(false);
  };

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <Link href="/Admin">
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            PF Admin <sup>2</sup>
          </div>
        </a>
      </Link>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <Link href="/Admin">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </Link>
      </li>

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">Addons</div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}
      <li className="nav-item">
        <a
          className={`nav-link ${pages && "collapsed"} `}
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
          onClick={() => setpages(pages ? false : true)}
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Pages</span>
        </a>
        <div
          id="collapsePages"
          className={`collapse ${pages && "show"} `}
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <Link href="/">
              <a className="collapse-item">Home page</a>
            </Link>
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Charts --> */}
      <li className="nav-item">
        <Link href={"/Admin/add-property"}>
          <a className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Add property</span>
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href={"/Admin/add-agent"}>
          <a className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Add agents</span>
          </a>
        </Link>
      </li>

      {/* <!-- Sidebar Toggler (Sidebar) --> */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
      <buton
        className="btn btn-danger btn-lg"
        onClick={() => {
          signout;
        }}
      >
        Log out
      </buton>
    </ul>
  );
};

export default Dashboard;
