import React from "react";
import { UseSortingAlgorithmDataContext } from "../../Context/SortingAlgorithmContext";

import Result from "./Result";

const Titles = [
    {title: "size", name: "N"},
    {title: "dataType", name: "DataType"},
    {title: "algorithm", name: "Sort"},
    {title: "comparisons", name: "Comparisons"},
    {title: "movements", name: "Movements"},
    {title: "time", name: "Time"}
];

function ExperimentalResults() {
    const {AlgorithmStatisics} = UseSortingAlgorithmDataContext();
    
    return (
        <div id="ExperimentalResults">
            <h2>Experimental Results</h2>

            <div id="Results">
                {Titles.map((Title, t) => (
                    <Result key={t} title={Title.name} value={AlgorithmStatisics[Title.title]}/>
                ))}
            </div>
        </div>
    );
}

export default ExperimentalResults;
