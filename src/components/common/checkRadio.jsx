import React, {Fragment} from 'react';

const CheckRadio = ({label, name, value, currentValue, type, onChange}) => {
    return (
        <Fragment>
            <div className="form-check">
                <input onChange={e => onChange(e.currentTarget.value)} type={type || "checkbox"}
                       checked={value === currentValue}
                       className="form-check-input"
                       id={name}
                       value={value}
                />
                <label className="form-check-label" htmlFor={"#" + name}>{label}</label>
            </div>
        </Fragment>
    );
};

export default CheckRadio;
