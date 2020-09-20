import React from "react";
import { UseNotificationContext } from "../../GlobalComponents/Notification/NotificationContext";
import { UseSortingAlgorithmDataContext } from "../../Context/SortingAlgorithmContext";

import BigButtonPanel from "../BigButtonPanel";
import ListProperties from "../ListProperties";
import ExperimentalResults from "../ExperimentalResults";
import PrimaryButton from "../../GlobalComponents/PrimaryButton";
import LeaderBoard from "./LeaderBoard";
import Spinner from "../../GlobalComponents/Spinner";

function MainPanel() {
    const [ShowLeaderBoard, setShowLeaderBoard] = React.useState(false);
    const [ShowSpinner, setShowSpinner] = React.useState(true);
    const {DataLoaded} = UseSortingAlgorithmDataContext();
    const PushNotification = UseNotificationContext();

    React.useEffect(() => {
        if(DataLoaded === false)
            PushNotification({title: "Server Is Not Responding", body: "Please Try Again Another Time"});
    }, [DataLoaded, PushNotification])

    return (
        <>
        {!ShowSpinner ?
            <div id="MainPanel">
                <BigButtonPanel/>

                <div id="MainContent">
                    <ListProperties/>
                    <ExperimentalResults/>
                    <PrimaryButton onClick={() => setShowLeaderBoard(true)}>View Leader Board</PrimaryButton>
                    {ShowLeaderBoard &&
                        <LeaderBoard setShowLeaderBoard={setShowLeaderBoard}/>
                    }
                </div> 
            </div>
            :
            <Spinner Loading={DataLoaded !== true} CloseCallback={setShowSpinner}/>
        }
        </>
    );
}

export default MainPanel;
