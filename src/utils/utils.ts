import { consts } from './consts';

export function enforceExistingPopup(popups: Record<string, Popup>, key: string): void {
    if (!popups[key]) {
        throw new Error(consts.UNFOUND_POPUP(key));
    }
}
