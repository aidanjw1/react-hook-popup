# React Hook Popup

React Hook Popup is a lightweight Javascript and Typescript library to easily manage popups in React with a single hook. Display alerts, modals, snackbars, and more from anywhere in your React application without needing to manage your own open/closed state or crowd your components' JSX with popups.

## Installation

```
npm install react-hook-popup
```

## Usage

### Basic Usage
React Hook Popup is completely centered around one single, simple to use hook: `usePopup`.

The `usePopup` hook takes two arguments: 
- A `string` key that is unique to each popup.
- A function that returns JSX to render the popup.

The hook returns a function to show that popup, and a function to it.

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

### Render Props
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
