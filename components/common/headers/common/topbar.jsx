import React from "react";
import Link from "next/link";
import { withTranslate } from "react-redux-multilingual";
import DropdownBeforeLogin from "./functional/dropdown-before-login";
import { DropdownAfterLogin } from "./functional/dropdown-after-login";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { SIDEBAR_STATUS } from "../../../../constants/app_constant";

const TopBar = (props) => {
  const { wishlist, isLogin, currentShop = null } = useSelector((state) => ({
    wishlist: state.wishlist.list,
    isLogin: state.login.isLoggedIn,
    currentShop: state.shops.current,
  }));
  const router = useRouter();

  const toggleNav = () => {
    const windowWidth = window.innerWidth;
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      if (openmyslide.classList.contains("open-side")) {
        openmyslide.classList.remove("open-side");
        if (windowWidth > 760) {
          document
          .getElementById("app-body")
          .classList.remove("left-sidebar_space");
        }
        localStorage.setItem(SIDEBAR_STATUS, "close");
      } else {
        openmyslide.classList.add("open-side");
        if (windowWidth > 760) {
          document.getElementById("app-body").classList.add("left-sidebar_space");
        }
        localStorage.setItem(SIDEBAR_STATUS, "open");
      }
    }
  };
  const searchInputHandle = (event) => {
    if (!event) return;

    window.history.replaceState(
      null,
      "Product Search",
      "/product/search?q=" + event.target.value
    );
    router.push(
      "/views/product/search",
      "/product/search" + window.location.search,
      undefined
    );
  };
  const searchSubmitHandle = (event) => {
    event.preventDefault();
    router.push("/product/search" + window.location.search);
  };
  return (
    <div suppressHydrationWarning className="top-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-1 d-flex align-items-center justify-content-start p-0">
            <div className="navbar navbar-light">
              <button
                onClick={toggleNav}
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
          <div className="col-xs-1 d-flex align-items-center justify-content-end p-0 logo-container">
            <Link href="/views/home" as="/">
              <a className="kfc-logo bg-success w-75 h-75 d-flex justify-content-center align-items-center text-white">
                KFC
              </a>
            </Link>
          </div>
          <div className="search-holder d-flex flex-row justify-content-between align-items-center col-xs-8 pr-2">
            <input
              className="form-control search-autocomplete"
              onFocus={searchInputHandle}
              onInput={searchInputHandle}
              onKeyDown={(e) =>
                searchInputHandle(e.key === "Enter" ? "enter" : false)
              }
            />
            <button
              onClick={searchSubmitHandle}
              className="search-button btn btn-success h-100"
              type="button"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="d-flex align-items-center col-xs-2 other-nav-items">
            {isLogin && (
              <span>
                <ul>
                  <Link
                    key="wishlist"
                    href="/views/wishlist"
                    as="/user/wishlist"
                    className="d-flex items-center text-danger"
                  >
                    <a className="text-danger additional-menu">
                      <i className="fa fa-heart mr-2"></i>
                      <span className="badge badge-secondary">
                        {wishlist?.length}
                      </span>
                    </a>
                  </Link>
                </ul>
              </span>
            )}
            <ul>
              <Link
                key="select-shop"
                href="/views/shops"
                as="/shops/select"
                className="d-flex items-center text-dark"
              >
                <a suppressHydrationWarning className="additional-menu">
                  <i className="fa fa-home ml-4 mr-2"></i>
                  <span className="badge badge-secondary">
                    {currentShop ? currentShop?.name : ""}
                  </span>
                </a>
              </Link>
            </ul>
            <ul className="header-dropdown float-right text-right mr-5">
              {isLogin && <DropdownAfterLogin props={props} />}
              {!isLogin && <DropdownBeforeLogin props={props} />}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslate(TopBar);
