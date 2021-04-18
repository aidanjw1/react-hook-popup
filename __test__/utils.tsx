import React from 'react';
import { mount, ReactWrapper } from "enzyme";
import { PopupProvider, usePopup } from "../src";
import '../src/utils/types'; 

export class TestComponentFactory {
    public static getTestComponent(): React.ComponentType {
        return (): JSX.Element => {
            const [showPopup1, hidePopup1] = usePopup('popup', ({ message, handleClose }) => (
                <>
                    <span>{message}</span>
                    <button className="close" onClick={handleClose}>Close</button>
                </>
            ));
            const [showPopup2, hidePopup2] = usePopup('popup-2', ({ message, handleClose }) => (
                <>
                    <span>{message}</span>
                    <button className="close-2" onClick={handleClose}>Close</button>
                </>
            ));
            return (
                <>
                    <button className="show" onClick={() => showPopup1('popup')}>Show</button>
                    <button className="hide" onClick={() => hidePopup1()}>Hide</button>
        
                    <button className="show-2" onClick={() => showPopup2('popup 2')}>Show</button>
                    <button className="hide-2" onClick={() => hidePopup2()}>Hide</button>
                </>
            );
        };
    }
}

interface GetPopupOptions {
    open?: boolean;
    renderer?: PopupRenderer;
    message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const mockConfirmResolver = (): void => { };

export class TestPopupFactory {
    public static getSimplePopupRenderer(): PopupRenderer {
        return () => <span>Hello world</span>;
    }

    public static getPopup({ open, renderer, message }: GetPopupOptions = {}): Popup {
        return {
            open: open || false,
            renderer: renderer || this.getSimplePopupRenderer(),
            message,
            confirmResolver: mockConfirmResolver,
        };
    }
}

export function mountWithContext(Component: JSX.Element): ReactWrapper {
    return mount(
        <PopupProvider>
            {Component}
        </PopupProvider>
    );
}
