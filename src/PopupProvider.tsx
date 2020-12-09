import React, { useState } from 'react';
import { PopupContext } from './PopupContext';

interface Props {
    children?: React.ReactNode;
}

export const PopupProvider = ({ children }: Props): JSX.Element => {
    const [popups, setPopups] = useState<Record<string, Popup>>({});

    const addPopup = (key: string, popupRenderer: PopupRenderer): void => {
        if (popups[key]) {
            return;
        }
        setPopups((previous) => ({
            ...previous,
            [key]: {
                renderer: popupRenderer,
                open: false,
            },
        }));
    };
    const removePopup = (key: string) => {
        if (!popups[key]) {
            return;
        }
        setPopups((previous) => {
            const updatedPopups = { ...previous };
            delete updatedPopups[key];
            return updatedPopups;
        })
    };
    const displayPopup = (key: string, message: string): void => {
        setPopups({
            ...popups,
            [key]: {
                ...popups[key],
                open: true,
                message,
            },
        });
    };
    const closePopup = (key: string): void => {
        setPopups((previous) => ({
            ...previous,
            [key]: {
                ...popups[key],
                open: false,
            },
        }));
    };

    return (
        <PopupContext.Provider
            value={{
                addPopup,
                removePopup,
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
                        { key }
                    )
                );
            })}
        </PopupContext.Provider>
    );
};
