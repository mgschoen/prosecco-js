# Prosecco JS

Prosecco JS is a library that provides super light (and super fizzy 🥂) data binding – and just that. It is intentionally kept as minimal as possible. All you can do is:

- bind certain values in the DOM to primitive variables
- hide and show elements based on variable values
- define DOM loops that reflect the current state of an Array
- execute functions whenever a primitive or an Array changes.

That said, it's the perfect choice if you want that and _only_ that. So let's see if this is for you!

## Setup

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

If you wish, define multiple roots for multiple apps on the same page. But don't nest them – that is forbidden.

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

Wait. What is that object in our `Prosecco()` constructor? That is our data model. We can bind DOM elements to the properties in there.

Let's bind some elements to our `text` property:

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

I'll cover the details of all those `ps-` attributes later. For the moment, let's just see what happens here:

![](http://argonn.me/share/prosecco-demo-1.gif)

## Documentation

### Prosecco's constructor

- rootElement
- model
- multiple apps on the same page
  - nesting not allowed

### Binding to primitive values

- ps-bind
- ps-bind-attribute
- ps-bind-event

### Conditional rules (ps-if)

- ps-if

### Iterating over arrays

- ps-each
- ps-each-value-target
  - same element
  - some child (but only one!)

### Watching value changes

- Prosecco.watch()