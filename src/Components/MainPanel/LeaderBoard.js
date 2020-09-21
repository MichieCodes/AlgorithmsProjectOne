import React from "react";
import { gql, useLazyQuery, useMutation} from '@apollo/client';
import { UseSortingAlgorithmDataContext } from "../../Context/SortingAlgorithmContext";
import { UseNotificationContext } from "../../GlobalComponents/Notification/NotificationContext";

import PrimaryModal from "../../GlobalComponents/PrimaryModal";
import PrimaryButton from "../../GlobalComponents/PrimaryButton";
import Ranking from "./Ranking";
import Spinner from "../../GlobalComponents/Spinner";

const Stats = ["Comparisons", "Movements", "Time"];

const GET_LEADER_BOARD_STATS = gql`
    query GetLeaderBoardStats {
        GetLeaderBoardStats {
            dataType
            comparisons {algorithm comparisons size}
            movements {algorithm movements size}
            time {algorithm time size}
        }
    }
`;
const RESET_LEADER_BOARD = gql`
    mutation ResetLeaderBoard {
        ResetLeaderBoard
    }
`;

function LeaderBoard({setShowLeaderBoard}) {
    const [Loading, setLoading] = React.useState(true);
    const [ShowSpinner, setShowSpinner] = React.useState(true);
    const [Rankings, setRankings] = React.useState(null);
    const [DataType, setDataType] = React.useState(null);
    const [SelectedStat, setSelectedStat] = React.useState(Stats[0].toLowerCase());
    const {DataTypes} = UseSortingAlgorithmDataContext();
    const PushNotification =  UseNotificationContext();

    const [LoadLeaderBoardStats] = useLazyQuery(GET_LEADER_BOARD_STATS, {fetchPolicy: "cache-and-network", 
        onCompleted: (LeaderBoardStatQueryData) => {
            setRankings(LeaderBoardStatQueryData.GetLeaderBoardStats.reduce((a, c) => 
                ({...a, [c.dataType]: c}), {})
            );
            setDataType(LeaderBoardStatQueryData.GetLeaderBoardStats[0]?.dataType);

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }, onError: () => {
            setTimeout(() => {
                setLoading(false);
                setShowLeaderBoard(false);
                PushNotification({title: "Failed To View Leader Board", 
                    body: "Please Try Again Another Time", timeout: 4500});
            }, 500);
        }
    });

    const [ResetLeaderBoard] = useMutation(RESET_LEADER_BOARD, {errorPolicy: "all",  
        onCompleted: () => PushNotification(
            {type: "Success", title: `Leader Board Is Reset`, timeout: 4500}
        ), onError: () => PushNotification(
            {title: "Failed To Reset Leader Board", body: "Please Try Again Another Time", timeout: 4500}
        )
    });

    const CloseLeaderBoard = (e) => {
        e.ctrlKey && ResetLeaderBoard();
        setShowLeaderBoard();
    }

    React.useEffect(() => LoadLeaderBoardStats(), [LoadLeaderBoardStats]);

    return (
        <>
            {!ShowSpinner ?
                <PrimaryModal CloseCallback={CloseLeaderBoard} HeaderTitle="Leader Board" PassCloseEvent={true}>
                    <div className="LeaderBoardButtons DataTypes">
                        {DataTypes && DataTypes.map((Data, d) => (
                            <label  key={d} className="RadioButton">
                                <input type="radio" name="DataType" defaultChecked={d === 0} onChange={() => setDataType(Data.title)}/>
                                <PrimaryButton>{Data.title?.replace(/-order/, "")}</PrimaryButton>
                            </label>
                        ))}
                    </div>

                    <div className="LeaderBoardButtons Statistics">
                        {Stats.map((Stat, s) => (
                            <label key={s} className="RadioButton">
                                <input type="radio" name="Statistic" defaultChecked={s === 0} onChange={() => setSelectedStat(Stat.toLowerCase())}/>
                                <PrimaryButton>{Stat}</PrimaryButton>
                            </label>
                        ))}
                    </div>

                    <div id="Rankings">
                        {Rankings && Rankings[DataType] &&
                            Rankings[DataType][SelectedStat]?.map((Rank, r) => (
                                <Ranking 
                                    key={`${r}-${DataType}-${SelectedStat}`} 
                                    algorithm={Rank.algorithm} size={Rank.size} 
                                    selectedStat={SelectedStat} selectedStatValue={Rank[SelectedStat]}
                                    winner={r === 0 && Rank.size > 0} rank={r + 1}
                                />
                            ))
                        }
                    </div>       
                </PrimaryModal>
                :
                <Spinner Loading={Loading} CloseCallback={setShowSpinner}/>
            }
        </>
    );
}

export default LeaderBoard;


