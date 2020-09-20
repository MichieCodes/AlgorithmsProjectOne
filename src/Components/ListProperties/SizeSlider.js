import React from "react";
import { UseSortingAlgorithmFunctionContext } from "../../Context/SortingAlgorithmContext";

import RangeSlider from "../../GlobalComponents/RangeSlider";

function SizeSlider() {
    const [Size, setSize] = React.useState(1000);
    const {setSize: setContextSize} = UseSortingAlgorithmFunctionContext();

    return (
        <div id="SizeSlider">
            <span className="SliderLabel">Size</span>
            
            <RangeSlider min={1000} max={50000} value={Size} 
                onChange={(e) => setSize(parseInt(e.target.value))}
                onMouseLeave={() => setContextSize(Size)}
            />
        </div>
    );
}

export default SizeSlider;
