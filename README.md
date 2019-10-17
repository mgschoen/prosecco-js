# Prosecco JS

Prosecco JS is a library that provides super light (and super fizzy) data binding – and just that. It is intentionally kept as minimal as possible. All you can do is bind certain DOM attributes to primitive values, show elements only if a value is true and define each-loops bound to an Array of primitives.

That said, let's see if this is for you!

## Usage

As of now, Prosecco JS is only available as Webpack module. Install it with

```bash
npm install https://github.com/mgschoen/prosecco-js.git#v0.1.0
```

and import it in your JavaScript:

```js
// index.js
import Prosecco from 'prosecco-js';
```

Somwhere in your HTML, define a root for your Prosecco app.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>...</head>
<body>
    <h1>My sparkling site</h1>
    <div id="#app-root">
        <!-- Prosecco's scope -->
        ...
    </div>
</body>
</html>
```

If you wish, define multiple roots. But don't nest them – that is forbidden.

Lastly, initalise your app in your JavaScript.

```js
// index.js
import Prosecco from 'prosecco-js';

var appRoot = document.getElementById('app-root');
var app = new Prosecco(appRoot, {
    text: 'May I bring you some beer?'
});
```

And your app is ready!

Wait. What is that object in our `Prosecco()` constructor? That is our data model. We can bind DOM elements to the values in there. A concept [you might be familiar with](https://vuejs.org/v2/guide/instance.html#Data-and-Methods).

Let's bind some elements to our text message:

```html
<!-- index.html -->
...
<div id="#app-root">
    <input ps-bind="text" 
        ps-bind-attribute="value" 
        ps-bind-event="input">
    <p ps-bind="text"></p>
</div>
...
```

We'll cover the details of all those `ps-` attributes later. For the moment, let's just see what happens here:

![](http://argonn.me/share/prosecco-demo-1.gif)