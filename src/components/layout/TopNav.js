import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faLock, faSignOutAlt, faUser, faUserAlt} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/eficon.png";

const TopNav = ({image}) => {
    return (
        <React.Fragment>
            <div className="navbar-custom topnav-navbar bg-light">
                <div className="container-fluid">

                    <a href="#" className="topnav-logo ps-md-3">
                        <span className="topnav-logo-lg">
                            <img src={logo} alt="Logo" height="20" width={"80"}/>
                        </span>
                            <span className="topnav-logo-sm">
                            <img src={logo} alt="Logo" height="16"/>
                        </span>
                    </a>

                    <ul className="list-unstyled topbar-menu float-end mb-0">

                        {/*ALERTS*/}
                        <li className="dropdown notification-list">
                            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#"
                               role="button" aria-haspopup="true" aria-expanded="false">
                                <i className={"noti-icon"}>
                                    <FontAwesomeIcon icon={faBell} className={""}/>
                                </i>
                                <span className="noti-icon-badge"/>
                            </a>

                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg"
                                 aria-labelledby="topbar-notifydrop">

                                <div className="dropdown-item noti-title">
                                    <h5 className="m-0">
                                    <span className="float-end">
                                        <a href="#" className="text-dark">
                                            <small>Clear All</small>
                                        </a>
                                    </span>Notification
                                    </h5>
                                </div>
                                <a href="#"
                                   className="dropdown-item text-center text-primary notify-item notify-all">
                                    View All
                                </a>
                            </div>
                        </li>

                        {/*PROFILE*/}
                        <li className="dropdown notification-list">
                            <a className="nav-link dropdown-toggle nav-user arrow-none me-0" data-bs-toggle="dropdown"
                               href="#" role="button" aria-haspopup="true"
                               aria-expanded="false">
                            <span className="account-user-avatar">
                                {
                                    image && <img src="" alt="User" className="rounded-circle"/>
                                }

                            </span>
                                <span>
                                <span className="account-user-name">Dominic Keller</span>
                                <span className="account-position">First Year</span>
                            </span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
                                aria-labelledby="topbar-userdrop">
                                <div className=" dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Welcome !</h6>
                                </div>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <FontAwesomeIcon icon={faUserAlt} className={"me-1"}/>
                                    <span>My Account</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <FontAwesomeIcon icon={faLock} className={"me-1"}/>
                                    <span>Lock Screen</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="mdi mdi-logout me-1"/>
                                    <FontAwesomeIcon icon={faSignOutAlt} className={"me-1"}/>
                                    <span>Logout</span>
                                </a>

                            </div>
                        </li>

                    </ul>

                    <a className="button-menu-mobile disable-btn">
                        <div className="lines">
                            <span/>
                            <span/>
                            <span/>
                        </div>
                    </a>

                </div>
            </div>
        </React.Fragment>
    );
};

export default TopNav;
