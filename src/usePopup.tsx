import { useContext, useEffect } from "react";
import { PopupContext } from "./PopupContext";


export function usePopup(key: string, popupRenderer: PopupRenderer) {
    const { addPopup, displayPopup, closePopup } = useContext(PopupContext);
    useEffect(() => {
        addPopup(key, popupRenderer);
        return () => {
            // TODO: Unregister popup
        };
    }, []);
    return [
        (message: string) => {
            displayPopup(key, message);
        },
        closePopup,
    ];
}