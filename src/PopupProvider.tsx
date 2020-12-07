import React from 'react';
import { PopupContext } from './PopupContext';

export const PopupProvider = ({ children }: React.PropsWithChildren<null>): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [renderer, setRenderer] = React.useState<PopupRenderer>();
    const [message, setMessage] = React.useState('');

    const [popups, setPopups] = React.useState<Record<string, PopupRenderer>>({});
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
