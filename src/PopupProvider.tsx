import React, { useState } from 'react';
import { PopupContext } from './PopupContext';

interface Props {
    children?: React.ReactNode;
}

export const PopupProvider = ({ children }: Props): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [renderer, setRenderer] = useState<PopupRenderer>();
    const [message, setMessage] = useState('');

    const [popups, setPopups] = useState<Record<string, PopupRenderer>>({});
    const addPopup = (key: string, popupRenderer: PopupRenderer): void => {
        if (popups[key]) {
            return;
        }
        setPopups({
            ...popups,
            [key]: popupRenderer,
        });
    };
    const removePopup = (key: string) => {
        if (!popups[key]) {
            return;
        }
        const updatedPopups = { ...popups };
        delete updatedPopups[key];
        setPopups(updatedPopups);
    };
    const displayPopup = (key: string, message: string): void => {
        setMessage(message);
        setRenderer(() => popups[key]);
        setOpen(true);
    };
    const closePopup = (): void => {
        setOpen(false);
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
            {open && renderer?.({ message, handleClose: closePopup })}
        </PopupContext.Provider>
    );
};
