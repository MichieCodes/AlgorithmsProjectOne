import React from "react";
import ReactDOM from "react-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

import "./index.css";

const Client = new ApolloClient({uri: "http://algorithms-project-one-api.herokuapp.com/graphql", cache: new InMemoryCache()});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={Client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
