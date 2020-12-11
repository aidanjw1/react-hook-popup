import React, { useEffect } from 'react';
import './snackbar.scss';

const DEFAULT_VARIANT = 'info';
const DEFAULT_TIMEOUT = 4000;

export interface SnackBarProps {
    handleClose: () => void;
    children?: React.ReactNode;
    variant?: 'error' | 'success' | 'info' | 'warning';
    timeout?: number;
}

export const SnackBar = ({
    children,
    handleClose,
    variant = DEFAULT_VARIANT,
    timeout = DEFAULT_TIMEOUT,
}: SnackBarProps): JSX.Element => {
    useEffect(() => {
        setTimeout(handleClose, timeout);
    }, []);
    return <div className={`rhp-snackbar ${variant}`}>{children}</div>;
};
