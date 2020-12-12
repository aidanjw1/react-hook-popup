import React from 'react';
import { Alert } from '../components';
import { PopupMethods, usePopup } from './usePopup';

const DEFAULT_KEY = 'rhp-alert';

interface UseAlertOptions {
    key?: string;
}

export function useAlert({ key = DEFAULT_KEY }: UseAlertOptions = {}): PopupMethods {
    return usePopup(key, ({ message, handleClose }) => (
        <Alert handleClose={handleClose}>{message}</Alert>
    ));
}
