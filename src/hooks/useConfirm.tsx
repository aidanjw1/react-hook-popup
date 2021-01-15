import React from 'react';
import { Confirm } from '../components';
import { PopupMethods, usePopup } from './usePopup';

const DEFAULT_KEY = 'rhp-confirm';

interface UseConfirmOptions {
    key?: string;
}

export function useConfirm({ key = DEFAULT_KEY }: UseConfirmOptions = {}): PopupMethods {
    return usePopup(key, ({ message, confirm, cancel }) => (
        <Confirm
            confirm={confirm}
            cancel={cancel}
        >
                {message}
        </Confirm>
    ));
}
