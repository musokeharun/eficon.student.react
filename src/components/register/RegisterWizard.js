import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faArrowAltCircleLeft,
    faFileUpload,
    faReceipt,
    faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import {NavLink, Route, Switch} from "react-router-dom";
import $ from "jquery";

import RegisterDetails from "./RegisterDetails";
import RegisterDocuments from "./RegisterDocuments";
import {RegisterStarted} from "./RegisterStarted";
import RegisterSummary from "./RegisterSummary";

class RegisterWizard extends Component {

    state = {
        current: 1,
        data: {}

    }

    constructor(props, context) {
        super(props, context);
        this.progressBar = React.createRef();
    }

    componentDidMount() {
        this.animateProgressBar();
    }

    animateProgressBar() {
        $(this.progressBar.current).animate({width: this.getWidth()}, "slow")
    }

    getWidth() {
        return ((this.state.current / 4) * 100) + "%";
    }

    progressBar = null;

    handleProgress = (index) => {
        const state = {...this.state};
        state.current = index + 1;
        this.setState(state);
        this.animateProgressBar()
    }

    setData = (data) => {
        let state = {...this.state};
        state.data = data;
        this.setState(state);
    }

    isProgressed = (index) => index <= this.state.current;

    render() {
        return (
            <Fragment>
                <div className="container-fluid px-0 mx-0">

                    <div className={"card-body rounded-0 mx-auto text-justify"} id={"cookiesSent"}>
                        <b>EFICON's</b> use of cookies. We use cookies to personalise your experience, and by using
                        the
                        site you are consenting to this.
                        <a className={""}>Find out more about cookies</a>
                        <button className={"btn btn-warning float-end h-100 my-n2"} data-bs-toggle="collapse"
                                data-bs-target="#cookiesSent">
                            Accept &amp; Close
                        </button>
                    </div>

                    <div className={"w-100 bg-light py-md-3 py-1 px-3 my-0"}>
                        <a className={"text-dark"} href={"https://eficon.co.ug"}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className={"me-md-2"}/>
                            Go to Eficon Home
                        </a>
                    </div>

                    <h1 className={"bg-white text-dark px-md-5 px-3 py-4 my-0 fw-normal"}>Student Register
                        Application</h1>
                    {/*WIZARD*/}

                    <ul className="nav nav-pills nav-justified form-wizard-header mb-3 sticky-top">
                        <li className="nav-item">
                            <NavLink to={"/register/start"}
                                     className="nav-link rounded-0 pt-2 pb-2">
                                <FontAwesomeIcon icon={faUserAlt} className={"me-1"}/>
                                <span className="d-none d-sm-inline">Get Started</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/register/details"}
                                     className="nav-link rounded-0 pt-2 pb-2">
                                <FontAwesomeIcon icon={faAddressBook} className={"me-1"}/>
                                <span className="d-none d-sm-inline">Details</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/register/documents"}
                                     className="nav-link rounded-0 pt-2 pb-2">
                                <FontAwesomeIcon icon={faFileUpload} className={"me-1"}/>
                                <span className="d-none d-sm-inline">Documents</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/register/summary"}
                                     className="nav-link rounded-0 pt-2 pb-2">
                                <FontAwesomeIcon icon={faReceipt} className={"me-1"}/>
                                <span className="d-none d-sm-inline">Summary</span>
                            </NavLink>
                        </li>
                    </ul>

                    {/*PROGRESS BAR*/}
                    <div className="tab-content b-0 mb-0">
                        <div id="bar" className="progress mb-3" style={{height: "7px"}}>
                            <div ref={this.progressBar}
                                 className="bar progress-bar progress-bar-striped progress-bar-animated bg-warning"/>
                        </div>
                        <div className={"container mb-4"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <Switch>
                                        <Route exact path={"/register/details"} render={(props) => {
                                            let index = 2;
                                            // if (!this.isProgressed(index)) {
                                            //     return <Redirect to={"/register/start"}/>;
                                            // }
                                            return <RegisterDetails  {...props}
                                                                     setData={e => this.setData(e)}
                                                                     onProgressChange={() => this.handleProgress(index)}/>
                                        }}/>
                                        <Route exact path={"/register/start"} render={(props) => (
                                            <RegisterStarted {...props}
                                                             onProgressChange={() => this.handleProgress(1)}/>
                                        )}/>
                                        <Route exact path={"/register/documents"}
                                               render={(props) => {
                                                   let index = 3;
                                                   // if (!this.isProgressed(index)) {
                                                   //     return <Redirect to={"/register/start"}/>;
                                                   // }
                                                   const {email} = this.state.data;
                                                   return <RegisterDocuments
                                                       email={email}
                                                       onProgressChange={() => this.handleProgress(index)} {...props}/>
                                               }}
                                        />
                                        <Route exact path={"/register/summary"}
                                               render={(props) => {
                                                   let index = 4;
                                                   // if (!this.isProgressed(index)) {
                                                   //     return <Redirect to={"/register/start"}/>;
                                                   // }
                                                   return <RegisterSummary
                                                       data={this.state.data}
                                                       onProgressChange={() => this.handleProgress(index)} {...props}/>
                                               }}
                                        />
                                    </Switch>
                                </div>
                                <div className={"col-lg-4 d-none d-lg-block"}>
                                    <div className={"card shadow-0 border-dark"}>

                                        <div className={"card-header fw-bold text-muted"}>
                                            Why choose PECB with EFICON?
                                        </div>

                                        <div className={"card-body"}>
                                            We are the best provider of PECB courses in the Region, Continent and Globe
                                        </div>

                                        <div className={"card-footer"}>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/*FOOTER*/}
                    <div className={"mx-auto w-100 d-flex justify-content-center"}>
                        <p className={"fs-italic text-muted"}>
                            &copy;{new Date().getFullYear()} EFICON
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default RegisterWizard;