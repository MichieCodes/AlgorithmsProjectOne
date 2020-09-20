import React from "react";

function Ranking({algorithm, size, selectedStat, selectedStatValue, winner, rank}) {
    const TimeoutRef = React.useRef(null)
    const [ShowToolTip, setShowToolTip] = React.useState(null);

    const onMouseEnter = () => {
        TimeoutRef.current = setTimeout(() => {setShowToolTip(true)}, 1000);
    }

    const onMouseOut = () => {
        clearTimeout(TimeoutRef.current);
        TimeoutRef.current = null;
        setShowToolTip((OldShowValue) => OldShowValue ? false : null);
    }

    return (
        <div className="Rank" style={size < 0 ? {opacity: 0.5} : null}>
            <span className={`RankNumber ${winner ? "RankWinner" : ""}`}><div></div><span>{rank}</span></span> 
            <span className="RankName" 
                onMouseOver={selectedStatValue !== null ? onMouseEnter : null}
                onMouseLeave={selectedStatValue !== null ? onMouseOut : null}
            >
                {algorithm.replace("-", " ")}
                {size > 0 && <div className="ToolTip" style={{
                    animation: ShowToolTip !== null ? ShowToolTip ? 
                    "ToolTipScaleIn 0.3s ease-in-out forwards" : 
                    "ToolTipScaleOut 0.5s ease-in-out forwards" : null
                }}>
                    Size = {size} <br/>
                    {selectedStat} = {selectedStatValue}
                </div>}
            </span>
        </div>
    );
}

export default Ranking;
