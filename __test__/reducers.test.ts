import {
    addPopup,
    removePopup,
    setPopupOpen,
    setPopupClosed,
    setPopupMessage,
} from '../src/utils/reducers';
import { mockConfirmResolver, TestPopupFactory } from './utils';

describe('addPopup', () => {
    it('should add a new popup with the correct key', () => {
        const popups: Record<string, Popup> = {};
        const newPopupKey = 'new';
        const newRenderer = TestPopupFactory.getSimplePopupRenderer();

        expect(addPopup(popups, newPopupKey, newRenderer, mockConfirmResolver)[newPopupKey]).toBeTruthy();
    });

    it('should add the correct renderer', () => {
        const popups: Record<string, Popup> = {};
        const newPopupKey = 'new';
        const newRenderer = TestPopupFactory.getSimplePopupRenderer();

        expect(addPopup(popups, newPopupKey, newRenderer, mockConfirmResolver)[newPopupKey].renderer).toBe(newRenderer);
    });

    it('should add a popup with the open field = false', () => {
        const popups: Record<string, Popup> = {};
        const newPopupKey = 'new';
        const newRenderer = TestPopupFactory.getSimplePopupRenderer();

        expect(addPopup(popups, newPopupKey, newRenderer, mockConfirmResolver)[newPopupKey].open).toBe(false);
    });

    it('should not overwrite the previous renderer when called with a duplicate key ', () => {
        let popups: Record<string, Popup> = {};
        const newPopupKey = 'new';
        const newRenderer1 = TestPopupFactory.getSimplePopupRenderer();
        const newRenderer2 = TestPopupFactory.getSimplePopupRenderer();

        popups = addPopup(popups, newPopupKey, newRenderer1, mockConfirmResolver);
        expect(popups[newPopupKey].renderer).toBe(newRenderer1);

        popups = addPopup(popups, newPopupKey, newRenderer2, mockConfirmResolver);
        expect(popups[newPopupKey].renderer).toBe(newRenderer1);
        expect(popups[newPopupKey].renderer).not.toBe(newRenderer2);
    });
});

describe('removePopup', () => {
    it('should remove a popup with the correct key', () => {
        const existingKey = 'existing';
        const popups: Record<string, Popup> = {
            [existingKey]: TestPopupFactory.getPopup(),
        };
        expect(removePopup(popups, existingKey)[existingKey]).toBeUndefined();
    });

    it('should do nothing when a non-existing key is passed', () => {
        const popups = {
            existing: TestPopupFactory.getPopup(),
        };
        expect(removePopup(popups, 'not-there')).toBe(popups);
    });
});

describe('setPopupOpen', () => {
    it("should set a closed popup's open field to true", () => {
        const key = 'key';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: false }),
        };
        expect(setPopupOpen(popups, key)[key].open).toBe(true);
    });

    it("should leave an open popup's open field as true", () => {
        const key = 'key';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: true }),
        };
        expect(setPopupOpen(popups, key)[key].open).toBe(true);
    });

    it('should throw an error when called with a non-existing key', () => {
        const key = 'key';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: true }),
        };
        expect(() => {
            setPopupOpen(popups, 'not-there');
        }).toThrow();
    });
});

describe('setPopupMessage', () => {
    it('should set the message of the popup with the correct key', () => {
        const key = 'key';
        const message = 'hello world';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: true }),
        };
        expect(setPopupMessage(popups, key, message)[key].message).toBe(message);
    });

    it('should overwrite the message of a popup with an existing message', () => {
        const key = 'key';
        const message = 'hello world';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: true, message: 'should not see me' }),
        };
        expect(setPopupMessage(popups, key, message)[key].message).toBe(message);
    });

    it('should throw an error when called with a non-existing key', () => {
        const key = 'key';
        const message = 'hello world';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: true }),
        };
        expect(() => {
            setPopupMessage(popups, 'not-there', message);
        }).toThrow();
    });
});

describe('setPopupClosed', () => {
    it("should set an open popup's open field to false", () => {
        const key = 'key';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: true }),
        };
        expect(setPopupClosed(popups, key)[key].open).toBe(false);
    });

    it("should leave a closed popup's open field as false", () => {
        const key = 'key';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: false }),
        };
        expect(setPopupClosed(popups, key)[key].open).toBe(false);
    });

    it('should throw an error when called with a non-existing key', () => {
        const key = 'key';
        const popups = {
            [key]: TestPopupFactory.getPopup({ open: true }),
        };
        expect(() => {
            setPopupOpen(popups, 'not-there');
        }).toThrow();
    });
});
