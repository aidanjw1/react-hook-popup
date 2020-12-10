import { createContext } from 'react';

interface IPopupContext {
    registerPopup: (key: string, popupRenderer: PopupRenderer) => void;
    unRegisterPopup: (key: string) => void;
    displayPopup: (key: string, message?: string) => void;
    closePopup: (key: string) => void;
}

export const PopupContext = createContext<IPopupContext>({
    registerPopup: () => {
        throw new Error('Something has gone wrong');
    },
    unRegisterPopup: () => {
        throw new Error('Something has gone wrong');
    },
    displayPopup: () => {
        throw new Error('Something has gone wrong');
    },
    closePopup: () => {
        throw new Error('Something has gone wrong');
    },
});
