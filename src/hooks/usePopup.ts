import { useContext, useEffect } from 'react';
import { PopupContext } from '../PopupContext';

export type PopupMethods = [(message?: string) => void, () => void];

export function usePopup(key: string, popupRenderer: PopupRenderer): PopupMethods {
    const { registerPopup, unRegisterPopup, displayPopup, closePopup } = useContext(PopupContext);
    useEffect(() => {
        registerPopup(key, popupRenderer);
        return () => {
            unRegisterPopup(key);
        };
    }, []);
    return [
        (message?: string) => {
            displayPopup(key, message);
        },
        () => {
            closePopup(key);
        },
    ];
}
