import { createContext } from 'react';

interface IPopupContext {
    addPopup: (key: string, popupRenderer: PopupRenderer) => void;
    displayPopup: (key: string, message: string) => void;
    closePopup: () => void;
}

export const PopupContext = createContext<IPopupContext>({
    addPopup: () => { throw new Error('Something has gone wrong') },
    displayPopup: () => { throw new Error('Something has gone wrong') },
    closePopup: () => { throw new Error('Something has gone wrong') },
});
