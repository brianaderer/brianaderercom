import React, { FC } from 'react';
import "../styles/globals.css";
import {AppProps} from "@/interfaces";

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
            <div className="w-full flex flex-col items-center justify-center overflow-x-hidden relative">
                <Component {...pageProps} />
            </div>
    );
}

export default App;
