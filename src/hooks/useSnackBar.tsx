import React from 'react';
import { SnackBar, SnackBarProps } from '../components';
import { PopupMethods, usePopup } from './usePopup';

const DEFAULT_KEY = 'rhp-snackbar';

interface UseSnackBarOptions {
    variant?: SnackBarProps['variant'];
    key?: string;
    timeout?: number;
}

export function useSnackBar({ key, variant, timeout }: UseSnackBarOptions = {}): PopupMethods {
    return usePopup(key || DEFAULT_KEY, ({ message, handleClose }) => (
        <SnackBar variant={variant} timeout={timeout} handleClose={handleClose}>
            {message}
        </SnackBar>
    ));
}
