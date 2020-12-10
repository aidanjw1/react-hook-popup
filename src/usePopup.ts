import { useContext, useEffect } from 'react';
import { PopupContext } from './PopupContext';

type ReturnType = [(message: string) => void, () => void];

export function usePopup(key: string, popupRenderer: PopupRenderer): ReturnType {
    const { addPopup, removePopup, displayPopup, closePopup } = useContext(PopupContext);
    useEffect(() => {
        addPopup(key, popupRenderer);
        return () => {
            removePopup(key);
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
