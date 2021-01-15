# React Hook Popup

React Hook Popup is a lightweight Javascript and Typescript library to easily manage popups in React with a single hook. Display alerts, modals, snackbars, and more from anywhere in your React application without needing to manage your own open/closed state or crowd your components' JSX with popups.

## Installation

```
npm install react-hook-popup
```

## Basic Usage
React Hook Popup is completely centered around one single, simple to use hook: `usePopup`. It can be imported like

```javascript
import { usePopup } from 'react-hook-popup';
```

Any component that uses this hook __must appear below the `<PopupProvider>` component__ in the tree. You probably want to wrap your whole application in this component.

```javascript
import { PopupProvider } from 'react-hook-popup';
```
```javascript
<PopupProvider>
    <YourApplication />
</PopupProvider>
```

The `usePopup` hook takes two arguments: 
- A `string` key that is unique to each popup.
- A function that returns JSX to render the popup.

The hook __returns a function to show that popup__, and a function to it.

```javascript
const [showPopup, hidePopup] = usePopup('alert', () => (
    <div className="alert">
        This is an alert!
    </div>
));
```

```javascript
<button onClick={showPopup}>Show Alert</button>
```

In the above example, clicking the button to call `showPopup` will display the alert. That's it! However, React Hook Popup provides functionality for more advanced and dynamic popups which you can read about below.

## Render Props
In a style similar to the [render props pattern](https://reactjs.org/docs/render-props.html), the function that renders the popup provides access to a few utility values and functions that can be used within the popup to make it more dynamic. These include

- `message`: Used to display a dynamic content inside of the popup. This content is set via an argument to the `showPopup` function, as shown below.
- `handleClose`: A function to close the popup from within its own JSX.

```javascript
const [showPopup, hidePopup] = usePopup('popup', ({ message, handleClose }) => (
    <div className="modal">
        {message}
        <button onClick={handleClose}>
            Close this modal
        </button>
    </div>
));
```
```javascript
<button onClick={() => showPopup('I am a modal!')}>
    Show the modal
</button>
```

## Promise-Based Confirmations
React hook popup allows you to easily show confirm popups in a similar fashion to the browser's built in `confirm` function - however, React hook gives you a promise that will resolve to a boolean based on the user's action in the confirmation popup. See the example below.

```javascript
const [confirm] = usePopup('confirm', ({ message, confirm, cancel }) => (
    <div className="confirm-modal">
        Are you sure?
        <button onClick={confirm}>Confirm</button>
        <button onClick={cancel}>Cancel</button>
    </div>
));
```
```javascript
const confirmed = await confirm();
if (confirmed) {
    // do something...
} else {
    // do something else...
}
```

## Reusability
Popups created through the `usePopup` hook can be easily defined once and shared accross the entire application by writing your own custom hooks. For example, you could create your own `useAlert` and import it everywhere to get access to that alert.
```javascript
// useAlert.jsx
export function useAlert('alert', ({ message, handleClose }) => (
    // ...your alert JSX
));
```
```javascript
// SomeComponent.jsx
import { useAlert } from 'useAlert';

export const SomeComponent = () => {
    const [alert] = useAlert();
    return (
        <button onClick={() => alert('hello')}>Alert</button>
    );
};
```
```javascript
// SomeOtherComponent.jsx
import { useAlert } from 'useAlert';

export const SomeOtherComponent = () => {
    const [alert] = useAlert();
    return (
        <button onClick={() => alert('world!')}>Alert</button>
    );
};
```

## UI Component Library Integration
Using `react-hook-popup` with any 3rd party component library, such as [material-ui](), [react-bootstrap](), or [semantic-ui](), is incredibly simple! Because it gives you the ability to render whatever JSX you want for the popup, you can simply render a 3rd party component. For example...
```javascript
import { Snackbar } from '@material-ui/core';
import { usePopup } from 'react-hook-popup';
```
```javascript
const [alert] = usePopup('snackbar-alert', ({ message, handleClose }), () => (
    <Snackbar open autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            This is a success message!
        </Alert>
    </Snackbar>
));
```
_*Note that any UI components you use should be set to open, because `react-hook-popup` manages the display state for you._

## Built In Popups
`react-hook-popup` provides a couple of simple, lightweight built in popups that you can import quickly without having to define any JSX or styling yourslef. These popups can be imported as hooks, and include

- `useSnackBar`
    ```javascript
    import { useSnackBar } from 'react-hook-popup';

    // ...

    const [showSnackbar] = useSnackBar();

    // ...

    showSnackBar('There was an error!');
    ```
    This hook can also take an optional options argument, which is an object including the fields

    `key: string` : override the default internal key used by the hook if necessary

    `variant: 'error' | success' | 'info' | 'warning'` : pre defined styling to apply to the snackbar (DEFAULT: `'info'`)

    `timeout: number` : milliseconds to timeout and close the alert automatically. (DEFAULT: `5000`)

---

- `useAlert`
    ```javascript
    import { useAlert } from 'react-hook-popup';

    // ...

    const [alert] = useAlert();

    // ...

    alert('There was an error!');
    ```

---
