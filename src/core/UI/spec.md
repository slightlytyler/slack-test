# UI

### A "React like" module for building and render UI components

Inspire by: https://www.youtube.com/watch?v=_MAD4Oly9yg
and: https://facebook.github.io/react/contributing/implementation-notes.html

## Core modules

#### createElement
Acts as pragma for jsx transpiler. Takes in a type (either a string for DOM element, or function / class for composite element), props, and children and returns vdom object.

#### Component
Base class. Handles `props`, `state`, and `setState`.

#### render
Takes in an element, passes it to the reconciler (instantiateComponent), and appends returned node into the container node.

#### instantiateComponent
Takes in an element, checks if its composite, and instantiated either a composite component or DOM component.
