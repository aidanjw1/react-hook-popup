import { useContext } from "react";
import { PopupContext } from "./PopupContext";


export function usePopup(key: string, popupRenderer: PopupRenderer) {
    const { addPopup, displayPopup, closePopup } = useContext(PopupContext);
    addPopup(key, popupRenderer);
    return [
        (message: string) => {
            displayPopup(key, message);
        },
        closePopup,
    ];
}