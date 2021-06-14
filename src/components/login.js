import React, {Fragment} from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import logo from "../assets/eficon.png";

class Login extends Form {

    state = {
        data: {email: "", password: ""},
        errors: {}
    };

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        password: Joi.string()
            .required()
            .min(5)
            .label("Password"),
    };

    doSubmit = () => {

    }

    render() {
        return (
            <Fragment>
                <div className="account-pages pt-2 pt-sm-4 pb-4 pb-sm-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xxl-4 col-lg-5">
                                <div className="card">
                                    <div className="card-header pt-4 pb-4 text-center bg-transparent">
                                        <a href="#">
                                            <span><img src={logo} alt="Logo" height="30"/></span>
                                        </a>
                                    </div>

                                    <div className="card-body p-4">

                                        <div className="text-center w-75 m-auto">
                                            <h4 className="text-dark-50 text-center mt-0 fw-bold">Sign In</h4>
                                            <p className="text-muted mb-4">
                                                Enter your email address and password to access student portal.</p>
                                        </div>

                                        <form onSubmit={e => this.handleSubmit(e)} method={"POST"}>
                                            {this.renderInput("email", "Email Address")}
                                            {this.renderInput("password", "Password", "password")}
                                            {this.renderButton("Register", "btn btn-warning mx-auto w-50")}
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer footer-alt">
                    &copy;{new Date().getFullYear()}EFICON LTD
                </footer>
            </Fragment>
        );
    }
}

export default Login;