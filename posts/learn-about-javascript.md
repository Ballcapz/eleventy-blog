---
layout: post-layout.njk
title: On my learnings of JavaScript
date: 2020-08-10
tags: ["post", "learning", "wip", "javascript"]
---

# This is WIP - and Always will be

<!-- Excerpt Start -->

This is a Work in progress post that I am continually updating as I continue to deepen my knowledge of JavaScript.
Most everything here are just for coming back to review, but sometimes I'll note down something new I learn here too.

<!-- Excerpt End -->

# Learning more about Vue

A year ago I would have said I was pretty good using Vue, now I know how much I don't really know.

## Three sentence summaries:

- `v-model` is used to bind data to elements on the page
- `v-if` is used to conditionally render content on the page, it is NOT in the DOM
- `v-show` also conditionally renders content, it IS stil in the dom (sets display: none)

## Extrapolations:

# JavaScript

General learning and knowledge about javascript

## Higher Order Functions

- Arrays:

  - map : The map function takes a callback and applies it to each element of an array.

  ```js
  const arr = [
    { first: "First", last: "Last" },
    { first: "Sam", last: "Smith" },
  ];

  console.log(arr.map((person) => person.first + " " + person.last));
  // Produces: ["First Last", "Sam Smith"]
  ```

  - filter : The filter function takes a callback and if the element in the array satisfies the callback (i.e. makes it true), that element gets to stay!

  ```js
  const arr = [1, 3, 4, 5, 6, 9];

  console.log(arr.filter((num) => num % 2 !== 0));
  // Produces: [1, 3, 5, 9]
  ```

  - reduce : The reduce function is probably one of the most versatile, and I'm positive I don't know half of the uses for it yet, but what I've found it useful for compiling a list down to a single value, kinda like reducing it

  ```js
  const arr = [1, 2, 3];

  console.log(
    arr.reduce((total, nums) => (total += nums)),
    0
  ); // setting total to start at 0
  // Produces: 6
  ```

# React

## Hooks

### useState

EX:

```js
function App() {
  const [value, setValue] = useState(10);
}
```

- Can only be used in functional components
- `value` is the value of the state
- `setValue` is a function that allows us to modify the state
- `10` (or whatever object, string, etc...) is the initial value of the state

EX 2:

```js
function veryTimeConsuming() {
    ...
    ...
    return { /* COMPLICATED STATE */ };
}

function App() {
    const [value, setValue] = useState(() => veryTimeConsuming());
}
```

- In this case, we may want to call use state with an initial value as a function, because if our initial state is expensive or timeconsuming, this will only get ran 1 time, wheras if we just call `veryTimeConsuming()` without it being part of a function call, it will get re-called every render of the `App()`

Ex 3, the set function:

```js
function App() {
  const [count, setCount] = useState(10);

  return (
    <div>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        +
      </button>
      <div>{count}</div>
    </div>
  );
}
```

- The reason for the function in the `onClick` event handler is so we can prevent things like race conditions, as well as being more explicit about what is going on.
- There may also be some cases where it can help prevent extra re-renders

EX 4, set function with multiple values in the state:

```js
const [{ count, count2 }, setCount] = useState({ count: 10, count2: 20 });

return (
  <div>
    <button
      onClick={() =>
        setCount((currentState) => ({
          ...currentState,
          count: currentState.count + 1,
        }))
      }
    >
      +
    </button>
    <div>count 1: {count}</div>
    <div>count 2: {count2}</div>
  </div>
);
```

- with hooks react does not automatically merge, so if we do not spread the current state `...currentState`, the count2 value will just become empty when the update is made to `currentState.count`
- using it this way, we keep the `count2` reference and it continues to work when `count` is updated

### useEffect

Whatever happens inside of this function gets called on every re-render of the component.

EX:

```js
useEffect(() => {
  console.log("mounted");
}, []);
```

- here we see we are passing an Empty dependency array as the second argument to `useEffect`, in which case the work inside of it happens once, on mount of the component.

EX 2, Cleanup:

```js
useEffect(() => {
  console.log("mounted");

  // The useEffect returns this as a clean up function
  return () => {
    console.log("unmount");
  };
}, []);
```

- in this case it gets called when the component is unmounting
