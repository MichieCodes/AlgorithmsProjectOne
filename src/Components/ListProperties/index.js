import React from "react";

import RadioButtons from "./RadioButtons";
import SizeSlider from "./SizeSlider";
import ListModal from "./ListModal";
import ListButtons from "./ListButtons";

function ListProperties() {
    const [ShowListModal, setShowListModal] = React.useState(false);

    return (
        <>
        <div id="ListProperties">
            <h2>List Properties</h2>
            <div style={{width: "min-content", margin: "auto auto 20px"}}>
                <RadioButtons/>
                <SizeSlider/>
            </div>
        </div>

        <ListButtons setShowListModal={setShowListModal}/>

        {ShowListModal &&
            <ListModal setShowListModal={setShowListModal}/>
        }
        </>
    );
}

export default ListProperties;
