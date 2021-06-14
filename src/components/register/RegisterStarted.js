import React, {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export function RegisterStarted({onProgressChange, history}) {
    return <Fragment>
        <h1 className={"text-dark my-2"}>Before you get started</h1>
        <p className={"text-dark"}>
            You'll need the following to complete your application:
        </p>
        <ul className={"fs-4 text-dark"}>
            <li>Proof of identification such as national ID,passport or birth certificate.</li>
            <li>
                If applying to study our PECB with EFICON qualification, you will need to upload evidence that you meet
                our minimum
                entry requirements.
            </li>
            <li>Attach any vital documents from your previous qualifications and provide the title of the document as
                well.
            </li>
        </ul>

        <p className={"text-dark"}>
            What you need to keep in mind:
        </p>
        <ul className={"fs-4 text-dark"}>
            <li>
                The application process will take few minutes to complete.
            </li>
            <li>
                You will be contacted on your mobile or email to confirm the validity of the details provided.
            </li>
        </ul>

        <button data-bs-toggle={"collapse"} data-bs-target={"#moreFields"} type="button"
                className="btn btn-outline-warning btn-lg" onClick={e => {
            onProgressChange()
            history.push("/register/details");
        }}>
            Get Started <FontAwesomeIcon icon={faArrowRight} className={"mx-2"}/>
        </button>
    </Fragment>;
}
