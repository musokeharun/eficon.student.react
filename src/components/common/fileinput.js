import React, {Fragment} from 'react';

const FileInput = ({label, name, handleChange}) => {

    return (
        <Fragment>
            <label className={"w-100"} htmlFor={"#fileInput"}>
                {label || ""}
                <input className={"btn btn-outline-primary btn-lg px-1 py-2 w-100"} id={"fileInput"} type={"file"}
                       name={name} onChange={e => handleChange(e)}/>
            </label>
        </Fragment>
    );
};

export default FileInput;
