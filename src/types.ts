declare global {
    interface PopupRenderProps {
        message: string;
        handleClose: () => void;
    }
    
    type PopupRenderer = (renderProps: PopupRenderProps) => JSX.Element;
}

export {}
