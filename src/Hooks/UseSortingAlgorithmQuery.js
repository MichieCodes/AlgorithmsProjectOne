import React from "react";
import {gql, useLazyQuery} from "@apollo/client";

const GET_ALGORITHMS = gql`
    query GetAlgorithms {GetAlgorithms {title displayName}}
`;
const GET_DATA_TYPES = gql`
    query GetDataTypes {GetDataTypes {title displayName description}}
`;

function UseSortingAlgorithmQuery({setDataTypes, setAlgorithms, setDataLoaded}) {
    const [LoadAlgorithms, {
        data: AlgorithmQueryData, error: AlgorithmQueryError
    }] = useLazyQuery(GET_ALGORITHMS);

    const [LoadDataTypes, {
        data: DataTypesQueryData, error: DataTypesQueryError
    }] = useLazyQuery(GET_DATA_TYPES);

    React.useEffect(() => {
        LoadAlgorithms();
        LoadDataTypes();
    }, [LoadAlgorithms, LoadDataTypes]);
    
    React.useEffect(() => {
        if(!AlgorithmQueryData || !DataTypesQueryData) return;

        setAlgorithms(AlgorithmQueryData.GetAlgorithms);
        setDataTypes(DataTypesQueryData.GetDataTypes);
        setDataLoaded(true);
    }, [AlgorithmQueryData, DataTypesQueryData, setAlgorithms, setDataTypes, setDataLoaded]);
    
    React.useEffect(() => {
        if(AlgorithmQueryError || DataTypesQueryError)
            setDataLoaded(false);
    }, [AlgorithmQueryError, DataTypesQueryError, setDataLoaded]);
}

export default UseSortingAlgorithmQuery;
