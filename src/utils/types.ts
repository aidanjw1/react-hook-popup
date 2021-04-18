declare global {
    interface Popup {
        open: boolean;
        renderer: PopupRenderer;
        message?: string;
        confirmResolver: (value: boolean) => void;
    }
    interface PopupRenderProps {
        message?: string;
        handleClose: () => void;
        confirm: () => void;
        cancel: () => void;
    }

    type PopupRenderer = (renderProps: PopupRenderProps) => JSX.Element;
}

export {};
