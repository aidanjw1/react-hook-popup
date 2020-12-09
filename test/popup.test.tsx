/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { usePopup } from '../src';
import { mountWithContext, TestComponent } from './utils';

describe('Popups', () => {
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

    it('Should throw an error when a key is used twice', () => {
        const Component = () => {
            usePopup('popup', () => <span>Popup</span>);
            usePopup('popup', () => <span>Popup</span>);
            return <></>;
        };

        jest.spyOn(console, 'error');
        // @ts-ignore
        console.error.mockImplementation(() => { });
        
        expect.assertions(1);
        try {
            mountWithContext(<Component />);
        } catch (e) {
            expect(e).toBeTruthy();
        }

        // @ts-ignore
        console.error.mockRestore();
    });
});
