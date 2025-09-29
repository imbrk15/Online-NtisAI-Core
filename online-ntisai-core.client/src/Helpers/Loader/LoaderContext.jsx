import React, { createContext, useContext, useState } from "react";
import Loader from "../Loader/Loader"
const LoaderContext = createContext();

export function LoaderProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ setLoading }}>
            {loading && <Loader />}
            {children}
        </LoaderContext.Provider>
    );
}

export function useLoader() {
    return useContext(LoaderContext);
}
