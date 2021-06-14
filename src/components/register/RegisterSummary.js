import React, {Component, Fragment} from 'react';
import {Redirect}  from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/pecb.png";

class RegisterSummary extends Component {
    render() {

        const {firstname, lastname, email, msisdn, residence, nationality, gender} = this.props.data;

        if( !email )
            return <Redirect to={"/register/details"}/>

        return (
            <Fragment>

                <div className={"row"}>

                    <div className={"col order-1"}>

                        <div className={"card"}>
                            <div className="card-header">
                                <div className="card-actions float-end">
                                    <div className="dropdown show">
                                        <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                                            <FontAwesomeIcon icon={faEllipsisH}/>
                                        </a>

                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <h5 className="card-title mb-0">{`${firstname} ${lastname}`}</h5>
                            </div>

                            <div className="card-body">
                                <div className="row g-0">
                                    <div className="col-sm-3 col-xl-12 col-xxl-3 text-center">
                                        <img src={logo} width="64" height="64"
                                             className="rounded-circle mt-2" alt="Angelica Ramos"/>
                                    </div>
                                </div>

                                <table className="table table-sm my-2">
                                    <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{`${firstname} ${lastname}`}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{msisdn}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender</th>
                                        <td><span className="badge bg-success">{gender.toUpperCase()}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Residence</th>
                                        <td>{residence}</td>
                                    </tr>
                                    <tr>
                                        <th>Nationality</th>
                                        <td>{nationality}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>

                            <div className={"card-footer"}>
                                <a href={"https://eficon.co.ug/pecb/login"}
                                   className={"btn btn-outline-warning w-100 d-block"}>Get Started</a>
                            </div>

                        </div>

                    </div>

                </div>


            </Fragment>
        );
    }
}

export default RegisterSummary;