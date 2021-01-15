import { createContext } from 'react';
import { consts } from './utils/consts';

interface IPopupContext {
    registerPopup: (
        key: string,
        popupRenderer: PopupRenderer,
        confirmResolver: (value: boolean) => void,
    ) => void;
    unRegisterPopup: (key: string) => void;
    displayPopup: (key: string, message?: string) => void;
    closePopup: (key: string) => void;
}

export const PopupContext = createContext<IPopupContext>({
    registerPopup: () => {
        throw new Error(consts.CONTEXT_ERROR_MESSAGE);
    },
    unRegisterPopup: () => {
        throw new Error(consts.CONTEXT_ERROR_MESSAGE);
    },
    displayPopup: () => {
        throw new Error(consts.CONTEXT_ERROR_MESSAGE);
    },
    closePopup: () => {
        throw new Error(consts.CONTEXT_ERROR_MESSAGE);
    },
});
