import React from 'react';
import { mount, ReactWrapper } from "enzyme";
import { PopupProvider, usePopup } from "../src";

export const TestComponent = (): JSX.Element => {
    const [show, hide] = usePopup('popup', ({ message, handleClose }) => (
        <>
            <span>{message}</span>
            <button className="close" onClick={handleClose}>Close</button>
        </>
    ));
    return (
        <>
            <button className="show" onClick={() => show('popup')}>Show</button>
            <button className="hide" onClick={() => hide('popup')}>Hide</button>
        </>
    );
}

export function mountWithContext(Component: JSX.Element): ReactWrapper {
    return mount(
        <PopupProvider>
            {Component}
        </PopupProvider>
    );
}
