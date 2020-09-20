import React from "react";

import "./RadioButton.scss"

function RadioButton({size= "1.25rem", name, label, description, defaultChecked, onChange}) {
    const TimeoutRef = React.useRef(null)
    const [ShowToolTip, setShowToolTip] = React.useState(null);

    const onMouseEnter = () => {
        TimeoutRef.current = setTimeout(() => {setShowToolTip(true)}, 1000);
    }

    const onMouseOut = () => {
        clearTimeout(TimeoutRef.current);
        TimeoutRef.current = null;
        setShowToolTip((OldShowValue) => OldShowValue ? false : null);
    }

    return (
        <label className="RadioButton">
            <input type="radio" name={name} defaultChecked={defaultChecked} onChange={onChange}/>
            <span className="CheckMarkBorder" style={{width: size, height: size}}>
                <span className="CheckMark">
                    <span style={{width: `calc(0.52 * ${size}`, height: `calc(0.52 * ${size}`}}></span>
                </span>
            </span>
            {label && <span className="RadioLabel" onMouseOver={onMouseEnter} onMouseLeave={onMouseOut}>
                {label}
                {description && <div className="ToolTip" style={{
                    animation: ShowToolTip !== null ? ShowToolTip ? 
                    "ToolTipScaleIn 0.3s ease-in-out forwards" : 
                    "ToolTipScaleOut 0.5s ease-in-out forwards" : null
                }}>{description}</div>}
            </span>}
        </label>
    );
}

export default RadioButton;
