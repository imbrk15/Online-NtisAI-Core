import { createContext, useContext } from "react";

const ValidationContext = createContext({});

export const useValidation = () => useContext(ValidationContext);

export const ValidationProvider = ({ rules, children }) => {
    return (
        <ValidationContext.Provider value={rules}>
            {children}
        </ValidationContext.Provider>
    );
};
