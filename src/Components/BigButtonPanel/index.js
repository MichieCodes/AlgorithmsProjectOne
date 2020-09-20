import React from "react";
import { gql, useMutation } from '@apollo/client';
import { UseNotificationContext } from "../../GlobalComponents/Notification/NotificationContext";
import { UseSortingAlgorithmDataContext, UseSortingAlgorithmFunctionContext } from "../../Context/SortingAlgorithmContext";

import BigButton from "../../GlobalComponents/BigButton";
import Spinner from "../../GlobalComponents/Spinner";

const SORT_LIST = gql`
    mutation SortList($dataType: String, $size: Int, $algorithm: String) {
        SortList(dataType: $dataType, size: $size, algorithm: $algorithm) {
            size dataType algorithm comparisons movements time
        }
    }
`;

function BigButtonPanel() {
    const CurrentAlgorithm = React.useRef(null);
    const [Loading, setLoading] = React.useState(false);
    const [ShowSpinner, setShowSpinner] = React.useState(false);
    const {Algorithms, Size, SelectedDataType} = UseSortingAlgorithmDataContext();
    const {setAlgorithmStatisics} = UseSortingAlgorithmFunctionContext();
    const PushNotification = UseNotificationContext();
    const [SortList, {data, error}] = useMutation(SORT_LIST, {errorPolicy: "all", onError: () => 0});

    const RunSort = (Algorithm) => {
        setLoading(true);
        setShowSpinner(true);
        CurrentAlgorithm.current = Algorithm;

        SortList({variables: {dataType: SelectedDataType, size: Size, algorithm: Algorithm.title}});
    }

    React.useEffect(() => {
        if(!data?.SortList) return;

        setAlgorithmStatisics({...data.SortList, 
            dataType: data.SortList.dataType !== null ? data.SortList.dataType.replace("-order", "") : null,
            algorithm: CurrentAlgorithm.current.displayName?.replace(" Sort", ""),
        });

        setTimeout(() => {
            setLoading(false);
            PushNotification({type: "Success", title: `${CurrentAlgorithm.current.displayName} Complete`, timeout: 4500});
        }, 500);
    }, [CurrentAlgorithm, data, setAlgorithmStatisics, setLoading, PushNotification]);

    React.useEffect(() => {
        if(!error) return;

        let body = error.message?.split(": ");
        body && (body = body[body.length >= 2 ? 1 : 0]);
        
        setTimeout(() => {
            setLoading(false);
            PushNotification({
                title: `${CurrentAlgorithm.current.displayName} Failed`, 
                body, timeout: 4500
            });
        }, 500);
    }, [CurrentAlgorithm, error, setLoading, PushNotification]);

    return (
        <>
            <div id="BigButtonPanel">
                {
                    Algorithms.map((Algorithm, a) => (
                        <BigButton key={a} onClick={() => RunSort(Algorithm)}>
                            {Algorithm.displayName}
                        </BigButton>
                    ))
                }
            </div>

            {ShowSpinner && <Spinner Loading={Loading} CloseCallback={setShowSpinner}/>}
        </>
    );
}

export default BigButtonPanel;
