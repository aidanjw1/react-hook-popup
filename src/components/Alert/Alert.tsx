import React from 'react';
import './alert.css';

export interface AlertProps {
    handleClose: () => void;
    children?: React.ReactNode;
    variant?: 'error' | 'success' | 'info' | 'warning';
}

export const Alert = ({ handleClose, variant, children }: AlertProps): JSX.Element => (
    <>
        <div className={`rhp-alert ${variant}`}>
            <div className="rhp-alert__content">
                {children}
            </div>
            <div className="rhp-alert__actions">
                <button onClick={handleClose} className="rhp-alert__ok-button">
                    Ok
                </button>
            </div>
        </div>
        <div className="rhp-alert__dimmer"></div>
    </>
);
