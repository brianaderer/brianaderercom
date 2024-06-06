import React, { FC } from 'react';
import "../styles/globals.css";
import {AppProps} from "@/interfaces";

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <div className="m-10 pl-8">
            <Component {...pageProps} />
        </div>
    );
}

export default App;
