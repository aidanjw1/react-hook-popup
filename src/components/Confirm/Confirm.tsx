import React from 'react';
import './confirm.css';

export interface ConfirmProps {
    confirm: () => void;
    cancel: () => void;
    children?: React.ReactNode;
}

export const Confirm = ({ confirm, cancel, children }: ConfirmProps): JSX.Element => (
    <>
        <div className={`rhp-confirm`}>
            <div className="rhp-confirm__content">
                {children}
            </div>
            <div className="rhp-confirm__actions">
                <button onClick={cancel} className="rhp-confirm__button--cancel">
                    Cancel
                </button>
                <button onClick={confirm} className="rhp-confirm__button--confirm">
                    Confirm
                </button>
            </div>
        </div>
        <div className="rhp-confirm__dimmer"></div>
    </>
);
