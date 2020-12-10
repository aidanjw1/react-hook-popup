export function enforceExistingPopup(popups: Record<string, Popup>, key: string): void {
    if (!popups[key]) {
        throw new Error(`Attempted to act on a non-existing popup with key: ${key}`);
    }
}
