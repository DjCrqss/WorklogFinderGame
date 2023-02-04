import React, {useState, createContext} from 'react';

export const DataContext = createContext({});

export const DataContextProvider = (props) => {
    const [qrPopupOpen, setQrPopupOpen] = useState(false);


    const dataContextStore = {
        qrPopupOpen,
        setQrPopupOpen
    }

    return <DataContext.Provider value={dataContextStore}>{props.children}</DataContext.Provider>

}
