import React from "react";
import { UseSortingAlgorithmDataContext, UseSortingAlgorithmFunctionContext } from "../../Context/SortingAlgorithmContext";

import RadioButton from "../../GlobalComponents/RadioButton";

function RadioButtons() {
    const {setSelectedDataType} = UseSortingAlgorithmFunctionContext();
    const {DataTypes, SelectedDataType} = UseSortingAlgorithmDataContext();

    return (
        <div className="RadioButtons">
            {
                DataTypes.map((DataType, d) => (
                    <RadioButton key={d} name="DataTypes" label={DataType.displayName}
                        description={DataType.description}
                        defaultChecked={DataType.title === SelectedDataType}
                        onChange={() => setSelectedDataType(DataType.title)}
                    />
                ))
            }
        </div>
    );
}

export default RadioButtons;
