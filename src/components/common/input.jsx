import React from "react";

const Input = ({name, label, error, ...rest}) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} className="form-control form-control-lg input-lg"/>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
