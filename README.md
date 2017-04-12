# Hey Slack!
Let's get this thing running.

#### Dev
```
npm run dev
```

#### Deploy
```
npm run deploy
```

## So what's going on here?
I wrote this app in the style of React. How did I do that you ask? I thought we said no JavaScript libraries... Hear me out.

#### Did you break the rules?
Maybe, but I feel I *reinterpreted* the rules.
> ...using only native JavaScript (no libraries such as jQuery, although CSS preprocessors are fine)

My CSS preprocessor of choice ([Stylus](http://stylus-lang.com/)) happens to be a JS library. With that in my mind I decided that I would build an app that didn't ship any **3rd party, runtime dependencies**. Libraries used only in the development environment (babel, webpack, eslint) are fine. And I accomplished that! Except the fetch polyfill but hey that's only smoothing out what is native between browsers.

### Ok so how did you do it?
My inspiration was this [video](https://www.youtube.com/watch?v=_MAD4Oly9yg) from a conference last year. After watching that I was able to gleam the implementation details from this [blog post](https://facebook.github.io/react/contributing/implementation-notes.html) and a few others. From there I started implementing the core of React in `src/core/UI`. The core modules are as follows:

- `createElement` used as the JSX transpiler pragma, creates the vdom representation.
- `instantiateComponent` a very naive reconciliation engine. But it works!
- `render` method that takes in an element, instantiates it as a component, and appends the rendered output to the container node.
- `Component` base class that handle `props`, `state`, and `setState`

You can use it pretty much like React.
```js
import UI from 'core/UI';

UI.render(<div>I can't believe it's not React!</div>, document.querySelector('#root'));
```

After that I was ready to build the app (finally), which I did in the exact style I would've in a proper React dev environment.

### Where is it hosted?
Here's the [live site](http://slack-test.surge.sh/). It's hosted with [surge.sh](surge.sh) which makes deployments a snap. It runs in Chrome, Firefox, & Safari for sure but I didn't have an easy way to test it in Edge so not sure there.

### What would you like to improve?
So the React implementation is janky to be honest. Problems that I currently see:
- Lifecycles aren't all implemented and some are hacked.
- Single object children is only supported through a hack. No diffing happens, just a straight replace.
- Returning `null` or `false` from a component doesn't work. Have to return a `<span />` instead.
- No support for `key` which doesn't really matter here since  we're not manipulating lists but would be nice.
- No support for `context`. I wanted to reimplement redux too but that was just too much for one week.
- No support for `propTypes` which made development quite a bit more difficult.
