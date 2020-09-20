import React from "react";

import BigButton from "../BigButton";

import "./PrimaryButton.scss";

function PrimaryButton({onClick, children}) {
    return (
        <BigButton className="PrimaryButton" onClick={onClick}>
            {children}
        </BigButton>
    );
}

export default PrimaryButton;
