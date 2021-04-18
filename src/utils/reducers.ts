import { enforceExistingPopup } from "./utils";

export function addPopup(
    popups: Record<string, Popup>,
    key: string,
    renderer: PopupRenderer,
    confirmResolver: (value: boolean) => void,
): Record<string, Popup> {
    if (popups[key]) {
        return popups;
    }
    return {
        ...popups,
        [key]: {
            renderer,
            open: false,
            confirmResolver,
        },
    };
}

export function removePopup(popups: Record<string, Popup>, key: string): Record<string, Popup> {
    if (!popups[key]) {
        return popups;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...updatedPopups } = popups;
    return updatedPopups;
}

function togglePopupOpenState(
    popups: Record<string, Popup>,
    key: string,
    value: boolean,
): Record<string, Popup> {
    enforceExistingPopup(popups, key);
    return {
        ...popups,
        [key]: {
            ...popups[key],
            open: value,
        },
    };
}

export function setPopupOpen(popups: Record<string, Popup>, key: string): Record<string, Popup> {
    enforceExistingPopup(popups, key);
    return togglePopupOpenState(popups, key, true);
}

export function setPopupClosed(popups: Record<string, Popup>, key: string): Record<string, Popup> {
    enforceExistingPopup(popups, key);
    return togglePopupOpenState(popups, key, false);
}

export function setPopupMessage(
    popups: Record<string, Popup>,
    key: string,
    message?: string,
): Record<string, Popup> {
    enforceExistingPopup(popups, key);
    return {
        ...popups,
        [key]: {
            ...popups[key],
            message,
        },
    };
}
