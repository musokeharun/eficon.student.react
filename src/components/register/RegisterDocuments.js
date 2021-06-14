import React from 'react';
import Joi from "joi-browser";
import {v1} from "uuid";
import Form from "../common/form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import FileInput from "../common/fileinput";
import Input from "../common/input";
import $ from "jquery";
import {toast} from "react-toastify";
import {serialize} from "object-to-formdata";
import httpService from "../../services/httpService";
import {studentApi} from "../../config.json";
import is from "is_js";
import {removePreloader} from "../../App";
import {Redirect} from "react-router-dom";


class RegisterDocuments extends Form {

    state = {
        inputs: [{key: v1(), file: null, title: ""}],
    };

    schema = {
        title: Joi.string()
            .required()
            .label("Title"),
        key: Joi.string()
            .required()
            .label("Key"),
        file: Joi
            .any()
            .required()
    };

    validate = (data, schema) => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(data, schema, options);
        if (!error) return null;

        const errors = [];
        for (let item of error.details) errors.push(item.message);
        return errors;
    };

    handleAddField = () => {
        let newField = {key: v1(), file: null, title: ""};
        const state = {...this.state};
        state.inputs.push(newField)
        this.setState(state);
    }

    handleFileChange = (e) => {
        const {name} = e.currentTarget;
        const state = {...this.state};

        let index = state.inputs.findIndex(i => i.key === name);
        state.inputs[index].file = e.currentTarget.files[0];
        this.setState(state);
    }

    handleRemove = (e, title) => {
        let currentTarget = e.currentTarget;
        $(currentTarget).closest("div.row").animate({width: 'toggle', opacity: '0.8'}, "slow");
        const state = {...this.state};
        state.inputs = state.inputs.filter(i => i.title !== title);
        this.setState(state);
    }

    handleInputChange = (e) => {

        const {name, value} = e.currentTarget;
        const state = {...this.state};

        let index = state.inputs.findIndex(i => i.key === name);
        state.inputs[index].title = value;
        this.setState(state);

    }

    doSubmit = () => {

        const {inputs} = this.state;
        const {email} = this.props;
        console.log(inputs);

        inputs.forEach(input => {
            let errors = this.validate(input, this.schema);
            if (errors) {
                console.log(errors)
                errors.forEach(err => toast(err, {type: "error"}))
            } else {
                try {
                    const formData = serialize(
                        {...input, email},
                    );
                    let {data: res} = httpService.post(studentApi + "/data", formData);
                    this.props.onProgressChange();
                    this.props.history.push("/register/summary");
                    console.log(res);
                } catch (ex) {
                    let res = ex.response.data;
                    let content = is.string(res) ? res : "Could not load document";
                    toast(content, {type: "error"})
                } finally {
                    removePreloader()
                }

            }
        })

    }

    render() {

        const {inputs} = this.state;

        if( !this.props.email )
            return <Redirect to={"/register/details"}/>

        return (
            <div>
                <h1 className={"my-3 text-dark fw-light"}>Documents</h1>
                <form onSubmit={this.handleSubmit}>

                    {
                        inputs.length && inputs.map((input, index) => (
                            <div className={"row g-0 mb-3 mt-1 position-relative"} key={input.key}>
                                <div className={"col-12 my-0"}>
                                    <Input label={"Title"} name={input.key}
                                           onChange={e => this.handleInputChange(e)}/>
                                </div>
                                <div className={"col-12 my-0"}>
                                    <FileInput name={input.key} handleChange={e => this.handleFileChange(e)}/>
                                </div>
                                <span style={{cursor: "pointer"}} onClick={(e) => this.handleRemove(e, input.title)}
                                      className={"position-absolute top-0 end-0 text-danger right-0 w-auto"}>
                                    <FontAwesomeIcon icon={faTimesCircle} className={"fa-2x"}/>
                                </span>
                            </div>
                        ))
                    }

                    <button type="button" onClick={(e) => this.handleAddField()}
                            className="btn btn-link btn-rounded">Add Field
                    </button>
                    <button data-bs-toggle={"collapse"} data-bs-target={"#moreFields"} type="button"
                            className="btn btn-outline-warning btn-lg" onClick={e => this.doSubmit()}>
                        Continue <FontAwesomeIcon icon={faArrowRight} className={"mx-2"}/>
                    </button>
                </form>
            </div>
        );
    }
}

export default RegisterDocuments;