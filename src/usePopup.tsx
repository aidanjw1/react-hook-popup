import { useContext, useEffect } from "react";
import { PopupContext } from "./PopupContext";


export function usePopup(key: string, popupRenderer: PopupRenderer) {
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
        closePopup,
    ];
}