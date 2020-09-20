import React from "react";
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { UseSortingAlgorithmDataContext, UseSortingAlgorithmFunctionContext } from "../../Context/SortingAlgorithmContext";
import { UseNotificationContext } from "../../GlobalComponents/Notification/NotificationContext";

import PrimaryButton from "../../GlobalComponents/PrimaryButton";
import Spinner from "../../GlobalComponents/Spinner";

const UPDATE_LIST = gql`
    mutation UpdateList($dataType: String, $size: Int) {
        UpdateList(dataType: $dataType, size: $size) {
            size dataType list sortedList
        }
    }
`;
const GET_LIST = gql`
    query GetList {GetList {size dataType list sortedList}}
`;

function ListButtons({setShowListModal}) {
    const [CurrentListInfo, setCurrentListInfo] = React.useState(null);
    const [Loading, setLoading] = React.useState(false);
    const [ShowSpinner, setShowSpinner] = React.useState(false);
    const PushNotification = UseNotificationContext();
    const {SelectedDataType, Size} = UseSortingAlgorithmDataContext();
    const {setListInfo} = UseSortingAlgorithmFunctionContext();

    const RunUpdate = () => {
        setShowSpinner(true)
        setLoading(true);
        UpdateList({variables: {dataType: SelectedDataType, size: Size}});
    }

    const RunGetList = () => {
        setShowSpinner(true)
        setLoading(true);
        setCurrentListInfo({SelectedDataType, Size});
        LoadListInfo();
    }

    const [UpdateList] = useMutation(UPDATE_LIST, {errorPolicy: "all",  
        onCompleted: (UpdateListMutationData) => {
            setListInfo(UpdateListMutationData.UpdateList);
            setTimeout(() => {
                setLoading(false);
                
                if(CurrentListInfo) {
                    setShowListModal(true);
                    setCurrentListInfo(null);
                }
                    
                PushNotification({type: "Success", title: `List Updated`, timeout: 4500});
            }, 500);
        }, onError: () => {
            setTimeout(() => {
                setLoading(false);
                PushNotification({title: "Failed To Update List", 
                    body: "Please Try Again Another Time", timeout: 4500});
            }, 500);
        }
    });

    const [LoadListInfo] = useLazyQuery(GET_LIST, {fetchPolicy: "cache-and-network", 
        onCompleted: (ListInfoQueryData) => {
            if(
                ListInfoQueryData.GetList?.size !== CurrentListInfo?.Size || 
                ListInfoQueryData.GetList?.dataType !== CurrentListInfo?.SelectedDataType
            ) {
                RunUpdate();
            } else {
                setCurrentListInfo(null);
                setListInfo(ListInfoQueryData.GetList);

                setTimeout(() => {
                    setLoading(false);
                    setShowListModal(true);
                }, 500)
            }
        }, onError: () => {
            setCurrentListInfo(null);

            setTimeout(() => {
                setLoading(false);
                PushNotification({title: "Failed To View List", 
                    body: "Please Try Again Another Time", timeout: 4500});
            }, 500);
        }
    });

    return (
        <>
        <div id="ListButtons">
            <PrimaryButton onClick={() => RunGetList()}>View List</PrimaryButton>
            <PrimaryButton onClick={() => RunUpdate()}>Update List</PrimaryButton>
        </div>

        {ShowSpinner && <Spinner Loading={Loading} CloseCallback={setShowSpinner}/>}
        </>
    );
}

export default ListButtons;
