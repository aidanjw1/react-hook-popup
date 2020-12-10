import React, { useState } from 'react';
import { PopupContext } from './PopupContext';
import {
    addPopup,
    removePopup,
    setPopupClosed,
    setPopupMessage,
    setPopupOpen,
} from './utils/reducers';

interface Props {
    children?: React.ReactNode;
}

export const PopupProvider = ({ children }: Props): JSX.Element => {
    const [popups, setPopups] = useState<Record<string, Popup>>({});

    const registerPopup = (key: string, popupRenderer: PopupRenderer): void => {
        setPopups((previous) => addPopup(previous, key, popupRenderer));
    };
    const unRegisterPopup = (key: string) => {
        setPopups((previous) => removePopup(previous, key));
    };
    const displayPopup = (key: string, message: string): void => {
        setPopups((previous) => setPopupOpen(previous, key));
        setPopups((previous) => setPopupMessage(previous, key, message));
    };
    const closePopup = (key: string): void => {
        setPopups((previous) => setPopupClosed(previous, key));
    };

    return (
        <PopupContext.Provider
            value={{
                registerPopup,
                unRegisterPopup,
                displayPopup,
                closePopup,
            }}
        >
            {children}
            {Object.entries(popups).map(([key, popup]) => {
                return (
                    popup.open &&
                    React.cloneElement(
                        popup.renderer?.({
                            message: popup.message,
                            handleClose: () => closePopup(key),
                        }),
                        { key },
                    )
                );
            })}
        </PopupContext.Provider>
    );
};
