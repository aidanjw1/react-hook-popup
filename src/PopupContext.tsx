import { createContext } from 'react';

interface IPopupContext {
    addPopup: (key: string, popupRenderer: PopupRenderer) => void;
    removePopup: (key: string) => void;
    displayPopup: (key: string, message: string) => void;
    closePopup: (key: string) => void;
}

export const PopupContext = createContext<IPopupContext>({
    addPopup: () => {
        throw new Error('Something has gone wrong');
    },
    removePopup: () => {
        throw new Error('Something has gone wrong');
    },
    displayPopup: () => {
        throw new Error('Something has gone wrong');
    },
    closePopup: () => {
        throw new Error('Something has gone wrong');
    },
});
