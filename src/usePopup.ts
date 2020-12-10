import { useContext, useEffect } from 'react';
import { PopupContext } from './PopupContext';

type ReturnType = [(message: string) => void, () => void];

export function usePopup(key: string, popupRenderer: PopupRenderer): ReturnType {
    const { registerPopup, unRegisterPopup, displayPopup, closePopup } = useContext(PopupContext);
    useEffect(() => {
        registerPopup(key, popupRenderer);
        return () => {
            unRegisterPopup(key);
        };
    }, []);
    return [
        (message: string) => {
            displayPopup(key, message);
        },
        () => {
            closePopup(key);
        },
    ];
}
