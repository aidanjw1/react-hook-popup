import React from 'react';
import { PopupContext } from './PopupContext';

export const PopupProvider = ({ children }: React.PropsWithChildren<{}>): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [jsx, setJsx] = React.useState<JSX.Element>();

    const [popups, setPopups] = React.useState<Record<string, JSX.Element>>({});
    const addPopup = (key: string, jsx: JSX.Element): void => {
        if (popups[key]) {
            return;
        }
        setPopups({
            ...popups,
            [key]: jsx,
        });
    };
    const displayPopup = (key: string): void => {
        setJsx(popups[key]);
        setOpen(true);
    };
    const closePopup = (): void => {
        setOpen(false);
    }

    return (
        <PopupContext.Provider value={{
            addPopup,
            displayPopup,
            closePopup,
        }}>
            {children}
            {open && jsx}
        </PopupContext.Provider>
    )
}
