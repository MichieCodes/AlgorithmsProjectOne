import React from "react";

import "./BigButton.scss";

function BigButton({className, onClick, children}) {
    return (
        <div className={`BigButton${className ? " " + className : ""}`} onClick={onClick}>
            <button>
                {children}
            </button>
        </div>
    );
}

export default BigButton;
