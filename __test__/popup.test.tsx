/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { usePopup } from '../src';
import { mountWithContext, TestComponentFactory } from './utils';

let TestComponent: React.ComponentType;

describe('Popups', () => {
    beforeAll(() => {
        TestComponent = TestComponentFactory.getTestComponent();
    });

    it('Should not render the popup initially', () => {
        const wrapper = mountWithContext(<TestComponent />);

        expect(wrapper.contains('popup')).toBeFalsy();
    });

    it('Should render the popup', () => {
        const wrapper = mountWithContext(<TestComponent />);

        wrapper.find('.show').simulate('click');
        expect(wrapper.contains('popup')).toBeTruthy();
    });

    it('Should close the popup from the parent component', () => {
        const wrapper = mountWithContext(<TestComponent />);

        wrapper.find('.show').simulate('click');
        expect(wrapper.contains('popup')).toBeTruthy();

        wrapper.find('.hide').simulate('click');
        expect(wrapper.contains('popup')).toBeFalsy();
    });

    it('Should close the popup from the popup', () => {
        const wrapper = mountWithContext(<TestComponent />);

        wrapper.find('.show').simulate('click');
        expect(wrapper.contains('popup')).toBeTruthy();

        wrapper.find('.close').simulate('click');
        expect(wrapper.contains('popup')).toBeFalsy();
    });

    it('Should display multiple popups', () => {
        const wrapper = mountWithContext(<TestComponent />);

        wrapper.find('.show').simulate('click');
        wrapper.find('.show-2').simulate('click');

        expect(wrapper.contains('popup')).toBeTruthy();
        expect(wrapper.contains('popup 2')).toBeTruthy();
    });

    it('Should support reusing a custom hook in separate components', () => {
        const TestComponent2 = TestComponentFactory.getTestComponent();
        mountWithContext(
            <>
                <TestComponent />
                <TestComponent2 />
            </>
        );
    });

    it('Should not allow the second use of a hook to userwrite the renderer', () => {
        const BAD_MESSAGE = 'You should not see me!';
        const TestComponent2 = () => {
            const [show] = usePopup('popup', () => (
                <span>{BAD_MESSAGE}</span>
            ));
            return (
                <button className="click-me" onClick={() => show('')}></button>
            );
        }
        const wrapper = mountWithContext(
            <>
                <TestComponent />
                <TestComponent2 />
            </>
        );
        wrapper.find('.click-me').simulate('click');
        expect(wrapper.contains(BAD_MESSAGE)).toBeFalsy();
    });

    it('Should allow for calling the show method without passing a message', () => {
        const TestComponent = () => {
            const [show] = usePopup('popup', () => (
                <span>Hello</span>
            ));
            return (
                <button className="click-me" onClick={() => show()}></button>
            );
        };
        const wrapper = mountWithContext(
            <TestComponent />
        );
        wrapper.find('.click-me').simulate('click');
        expect(wrapper.contains('Hello')).toBeTruthy();
    });

    it('Confirm promise should resolve to true when appropriate', (done) => {
        expect.assertions(1);

        const clickHandler = (confirm: () => Promise<boolean>) => () => {
            const confirmed = confirm();
            confirmed
                .then((value) => {
                    expect(value).toBe(true);
                })
                .catch(done)
                .finally(done);
        };

        const TestComponent = () => {
            const [confirm] = usePopup('confirm', ({ confirm, cancel }) => (
                <div>
                    <span>Are you sure?</span>
                    <button onClick={cancel}>Cancel</button>
                    <button className="confirm-click" onClick={confirm}>Confirm</button>
                </div>
            ));
            return (
                <button
                    className="click-me"
                    onClick={clickHandler(confirm)}
                >
                    Click Me
                </button>
            );
        };

        const wrapper = mountWithContext(<TestComponent />);
        wrapper.find('.click-me').simulate('click');
        wrapper.find('.confirm-click').simulate('click');
    });

    it('Confirm promise should resolve to false when appropriate', (done) => {
        expect.assertions(1);

        const clickHandler = (confirm: () => Promise<boolean>) => () => {
            const confirmed = confirm();
            confirmed
                .then((value) => {
                    expect(value).toBe(false);
                })
                .catch(done)
                .finally(done);
        };

        const TestComponent = () => {
            const [confirm] = usePopup('confirm', ({ confirm, cancel }) => (
                <div>
                    <span>Are you sure?</span>
                    <button className="cancel-click" onClick={cancel}>Cancel</button>
                    <button onClick={confirm}>Confirm</button>
                </div>
            ));
            return (
                <button
                    className="click-me"
                    onClick={clickHandler(confirm)}
                >
                    Click Me
                </button>
            );
        };

        const wrapper = mountWithContext(<TestComponent />);
        wrapper.find('.click-me').simulate('click');
        wrapper.find('.cancel-click').simulate('click');
    });
});
