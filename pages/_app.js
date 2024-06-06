import React from 'react';
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <div className="m-10 pl-8">
            <Component {...pageProps} />
        </div>
    );
}