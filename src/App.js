import React from "react";
import { NotificationProvider } from "./GlobalComponents/Notification/NotificationContext";
import { SortingAlgorithmProvider } from "./Context/SortingAlgorithmContext";

import MainPanel from "./Components/MainPanel";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <NotificationProvider>
                <SortingAlgorithmProvider>
                    <MainPanel/>
                </SortingAlgorithmProvider>
            </NotificationProvider>
        </div>
    );
}

export default App;
