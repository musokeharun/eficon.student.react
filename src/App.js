import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import $ from "jquery";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.min.css";

import store from './store';
import RegisterWizard from "./components/register/RegisterWizard";

import './App.css';


class App extends React.Component {


    componentDidMount() {
        removePreloader();
    }


    render() {
        return (
            <Provider store={store}>
                <ToastContainer/>
                <HashRouter>
                    <Switch>
                        <Route path={"/register"} render={props => <RegisterWizard {...props}/>}/>
                        {/*<Route path={"/login"} render={props => <Login {...props}/>}/>*/}
                        <Redirect to={"/register/start"}/>
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}

export const showPreloader = () => {
    $("#preloader").fadeIn();
    $("body").removeClass("show").addClass("loading");
}

export const removePreloader = () => {
    $("#preloader").fadeOut();
    $("body").addClass("show").removeClass("loading");
}

export default App;
