import React from "react";
import { UseSortingAlgorithmDataContext } from "../../Context/SortingAlgorithmContext";

import PrimaryModal from "../../GlobalComponents/PrimaryModal";

function ListModal({setShowListModal}) {
    const {ListInfo} = UseSortingAlgorithmDataContext();

    return (
        <PrimaryModal CloseCallback={setShowListModal} HeaderTitle="View List">
            {ListInfo?.list && 
                <>
                    <p className="ListTitle">{ListInfo.dataType?.replace(/-?order/, "Order")} List</p>
                    <p className="List">{ListInfo.list}</p>
                </>
            }
            {ListInfo?.sortedList && 
                <>
                    <p className="ListTitle">Sorted List</p>
                    <p className="List">{ListInfo.sortedList}</p>
                </>
            }
        </PrimaryModal>
    );
}

export default ListModal;
