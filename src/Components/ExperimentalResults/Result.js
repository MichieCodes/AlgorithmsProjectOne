import React from "react";

function Result({title, value = null}) {
    return (
        <>
            <span className="ResultTitle">{title}:</span>
            <span className="ResultValue">{value !== null ? value : "N/A"}</span>
        </>
    );
}

export default Result;
