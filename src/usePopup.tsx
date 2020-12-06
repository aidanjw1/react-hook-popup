import { useContext } from "react";
import { PopupContext } from "./PopupContext";

export function usePopup(key: string, alertJsx: JSX.Element) {
    const { addPopup, displayPopup, closePopup } = useContext(PopupContext);
    addPopup(key, alertJsx);
    return {
        showPopup: () => {
            displayPopup(key);
        },
        closePopup,
    };
}