import React from "react";
import UseSortingAlgorithmQuery from "../Hooks/UseSortingAlgorithmQuery";

const SortingAlgorithmDataContext = React.createContext(); 
const SortingAlgorithmFunctionContext = React.createContext(); 

export function SortingAlgorithmProvider({children}) {
    const [DataTypes, setDataTypes] = React.useState(null); 
    const [Algorithms, setAlgorithms] = React.useState(null); 
    const [Size, setSize] = React.useState(1000);
    const [SelectedDataType, setSelectedDataType] = React.useState(null);
    const [ListInfo, setListInfo] = React.useState({}); 
    const [AlgorithmStatisics, setAlgorithmStatisics] = React.useState({}); 
    const [DataLoaded, setDataLoaded] = React.useState(null);

    React.useEffect(() => {
        if(!DataTypes) return;

        setSelectedDataType(DataTypes[0]?.title)
    }, [DataTypes, setSelectedDataType]);

    UseSortingAlgorithmQuery({setDataTypes, setAlgorithms, setDataLoaded});

    return (
        <SortingAlgorithmFunctionContext.Provider value={{setSelectedDataType, setSize, setListInfo, setAlgorithmStatisics}}>
            <SortingAlgorithmDataContext.Provider value={{DataTypes, Algorithms, SelectedDataType, Size, ListInfo, AlgorithmStatisics, DataLoaded}}>
                {children}
            </SortingAlgorithmDataContext.Provider>
        </SortingAlgorithmFunctionContext.Provider>
    );
}

export const UseSortingAlgorithmDataContext = () => React.useContext(SortingAlgorithmDataContext);
export const UseSortingAlgorithmFunctionContext = () => React.useContext(SortingAlgorithmFunctionContext);