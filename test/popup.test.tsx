import React from 'react';
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
});
