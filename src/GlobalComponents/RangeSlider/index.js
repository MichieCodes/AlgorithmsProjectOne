import React from "react";

import "./RangeSlider.scss";

function RangeSlider({min, max, step = 1, value, onChange, onMouseLeave}) {
    const [ShowToolTip, setShowToolTip] = React.useState(null);

    return (
        <div className="RangeSlider" onMouseLeave={onMouseLeave}>
            <div className="Range" style={{
                width: `calc(${100*(value - min)/(max - min)}% - 1px)`,
                border: value === min ? 0 : null,
                borderRight: (value === max || value === min) ? 0 : null,
            }}></div>

            <input type="range" className="Handle" value={value} 
                min={min} max={max} step={step} onChange={onChange}
                onMouseOver={() => setShowToolTip(true)}
                onMouseLeave={() => setShowToolTip(false)}
                style={{
                    borderLeftColor: value === min ? "transparent" : null, 
                    borderRightColor: value === max ? "transparent" : null
                }}
            />
            
            <div className="RangeSliderThumb" style={{
                left: `calc(${(value - min)/(max - min)} * (100% - 1.25rem / 2))`
            }}></div>

            <div className="ToolTip" style={{
                left: `calc(${(value - min)/(max - min)} * (100% - 0.375 * 3.75rem) - 0.25 * 3.75rem)`,
                animation: ShowToolTip !== null ? ShowToolTip ? 
                    "ToolTipScaleIn 0.3s ease-in-out forwards" : 
                    "ToolTipScaleOut 0.5s ease-in-out forwards" : null
            }}>{value}</div>
        </div>
    );
}

export default RangeSlider;
