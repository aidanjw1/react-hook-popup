import { useContext, useEffect, useState } from 'react';
import { PopupContext } from '../PopupContext';

export type PopupMethods = [(message?: string) => Promise<boolean>, () => void];

export function usePopup(key: string, popupRenderer: PopupRenderer): PopupMethods {
    const { registerPopup, unRegisterPopup, displayPopup, closePopup } = useContext(PopupContext);

    const [confirmPromise, setConfirmPromise] = useState<Promise<boolean> | undefined>(undefined);

    function initializePopup(): void {
        setConfirmPromise(new Promise<boolean>((resolve) => {
            registerPopup(key, popupRenderer, (val: boolean) => {
                resolve(val);
                initializePopup();
            });
        }));
    }

    useEffect(() => {
        initializePopup();
        return () => {
            unRegisterPopup(key);
        };
    }, []);

    return [
        (message?: string) => {
            displayPopup(key, message);
            return confirmPromise as Promise<boolean>;
        },
        () => {
            closePopup(key);
        },
    ];
}
