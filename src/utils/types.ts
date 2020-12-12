declare global {
    interface Popup {
        open: boolean;
        renderer: PopupRenderer;
        message?: string;
    }
    interface PopupRenderProps {
        message?: string;
        handleClose: () => void;
    }

    type PopupRenderer = (renderProps: PopupRenderProps) => JSX.Element;
}

export {};
