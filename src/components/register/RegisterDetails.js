import React from "react";
import Joi from "joi-browser";
import is from "is_js";
import Form from "../common/form";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FileInput from "../common/fileinput";
import CheckRadio from "../common/checkRadio";
import {studentApi} from "../../config.json";
import httpService from "../../services/httpService";
import {serialize} from "object-to-formdata";
import {Collapse} from "bootstrap";
import {toast} from "react-toastify";
import {removePreloader, showPreloader} from "../../App";

class RegisterDetails extends Form {

    state = {
        data: {firstname: "", lastname: "", email: "", gender: ""},
        errors: {},
        isSecond: false,
        files: {
            id: null,
            image : null
        }
    };

    schema = {
        firstname: Joi.string()
            .required()
            .label("First Name"),
        lastname: Joi.string()
            .required()
            .label("Lastname"),
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        msisdn: Joi.string()
            .required()
            .label("Contact"),
        residence: Joi.string()
            .required()
            .label("Residence"),
        nationality: Joi.string()
            .required()
            .label("Nationality"),
        dob: Joi.string()
            .required()
            .label("Date o Birth"),
        gender: Joi.string()
            .required()
            .label("Gender"),
        password: Joi.string()
            .required()
            .min(6)
            .label("Password")
    };

    doSubmit = async () => {

        showPreloader()

        const options = {
            indices: false,
            nullsAsUndefineds: false,
            booleansAsIntegers: false,
            allowEmptyArrays: false,
        };
        try {
            const {data, files} = this.state;
            let all = {...data, ...files};

            const formData = serialize(
                all,
                options
            );
            console.log(all);

            let {data: res} = httpService.post(studentApi + "/register", formData);
            this.props.onProgressChange();
            this.props.setData(all);
            this.props.history.push("/register/documents");
            console.log(res);

        } catch (ex) {
            let res = ex.response.data;
            let content = is.string(res) ? res : "Could not load details";
            toast( content ,{ type : "error" })
        } finally {
            removePreloader()
        }
    };

    checkChange = (name, value) => {
        const state = {...this.state};
        state.data[name] = value;
        this.setState(state);
    }


    toggleCollapseOrSubmit = () => {
        const state = {...this.state};
        if (state.isSecond) {
            this.handleSubmit(new Event("submit"));
            return;
        }
        const myCollapse = document.getElementById('moreFields');
        let bsCollapse;
        bsCollapse = new Collapse(myCollapse);
        bsCollapse.toggle();
        state.isSecond = true;
        this.setState(state);
    }

    render() {

        const {data} = this.state;

        let name = "id";
        return (
            <div>
                <h1 className={"my-3 text-dark fw-light"}>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("firstname", "Firstname")}
                    {this.renderInput("lastname", "Lastname")}
                    {this.renderInput("email", "Email")}
                    {this.renderInput("msisdn", "Contact", "number")}

                    <label>Gender</label>
                    <div className={"d-flex justify-content-around align-items-center mb-3"}>
                        <CheckRadio label={"Male"} currentValue={data.gender} name={"gender"} type={"radio"}
                                    value={"m"} onChange={value => this.checkChange("gender", value)}/>
                        <CheckRadio label={"Female"} currentValue={data.gender} name={"gender"} type={"radio"}
                                    value={"f"} onChange={value => this.checkChange("gender", value)}/>
                    </div>

                    <div className={"collapse fade"} id={"moreFields"}>
                        {this.renderInput("dob", "DOB", "date")}
                        {this.renderInput("residence", "Residence", "text")}
                        {this.renderInput("nationality", "Nationality", "text")}
                        {this.renderInput("password", "Password", "text")}
                        <div className={"row mb-3"}>
                            <div className={"col-6"}>
                                <FileInput label={"Upload Identification document"}
                                           handleChange={e => this.handleFileChange(e.currentTarget.name, e.currentTarget.files[0])}
                                           name={name}
                                />
                            </div>
                            <div className={"col-6"}>
                                <FileInput label={"Upload Personal photo (passport size)"}
                                           handleChange={e => this.handleFileChange(e.currentTarget.name, e.currentTarget.files[0])}
                                           name={"image"}
                                />
                            </div>
                        </div>
                    </div>

                    <button onClick={() => this.toggleCollapseOrSubmit()} type="button"
                            className="btn btn-outline-warning btn-lg">
                        Continue <FontAwesomeIcon icon={faArrowRight} className={"mx-2"}/>
                    </button>
                </form>
            </div>
        );
    }
}

export default RegisterDetails;
