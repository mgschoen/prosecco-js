# Prosecco JS

Prosecco JS is a library that provides super light (and super fizzy 🥂) data binding – and just that. It is intentionally kept as minimal as possible. All you can do is:

- bind certain values in the DOM to primitive variables
- hide and show elements based on variable values
- define DOM loops that reflect the current state of an Array
- execute functions whenever a primitive or an Array changes.

That said, it's the perfect choice if you want that and _only_ that. So let's see if this is for you!

## Content

- [Install Prosecco](#install-prosecco)
- [Quickstart](#quickstart)
- [Documentation](#documentation)
  - [Prosecco's constructor](#proseccos-constructor)
  - [Binding to primitive values: `ps-bind`](#binding-to-primitive-values-ps-bind)
  - [Conditional rules: `ps-if`](#conditional-rules-ps-if)
  - [Iterating over arrays: `ps-each`](#iterating-over-arrays-ps-each)
  - [Watching value changes: `Prosecco.watch()`](#watching-value-changes-proseccowatch)

## Install Prosecco

### As webpack module

Install Prosecco via npm

```bash
$ npm install prosecco-js
```

and import it in your JavaScript:

```js
// index.js

import Prosecco from 'prosecco-js';
```

### Via CDN

For development purposes, include the following script in the `<head>` of your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/mgschoen/prosecco-js@latest/dist/prosecco.js">
```

For production releases, use the minified version:

```html
<script src="https://cdn.jsdelivr.net/gh/mgschoen/prosecco-js@latest/dist/prosecco.min.js">
```

## Quickstart

Somewhere in your HTML, define a root for your Prosecco app.

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

Then, initalise your app in your JavaScript.

```js
// index.js

var appRoot = document.getElementById('app-root');
var app = new Prosecco(appRoot, {
    text: 'May I bring you some beer?'
});
```

That's it! Your app is ready.

The object with the `text` property is your app's data model. You can bind DOM elements to the properties in there.

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

When you import Prosecco in your JavaScript, what you get is Prosecco's constructor function.

```js
import Prosecco from 'prosecco-js';

// ...

var app = new Prosecco(rootElement, model)
```

To instantiate your Prosecco app, you pass a DOM element and an object that will act as your app's data model.

The `rootElement` can be any [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/element) in the DOM. It defines the scope of your app: Your app will only manipulate children of that root element and be deaf to anything that happens outside its scope.

The `model` can be any [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) you like. The object's properties represent your app's data model. Note that it does not make much sense to nest other objects inside your model. The only data types you can bind to are [Primitives such as Strings, Numbers and Booleans](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) and Arrays. But as long as you don't attempt to bind to one, you can have as many objects as you like in your model.

#### Multiple apps on one page

You can instantiate multiple Prosecco apps in the same document. For each app, call the constructor with a different `rootElement`. 

There is just one restriction: You may not nest apps in the DOM. If you try to pass an element to the constructor that is part of another app's scope, Prosecco will fail.

Here is a working example:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>...</head>
<body>
    <div id="app-root-one">
        ...
    </div>
    <div id="app-root-two">
        ...
    </div>
    <script src="index.js">
</body>
</html>
```

```js
// index.js
import Prosecco from 'prosecco-js';

var rootOne = document.getElementById('app-root-one');
var rootTwo = document.getElementById('app-root-two');

var appOne = new Prosecco(rootOne, {
    // model of app one
});
var appTwo = new Prosecco(rootTwo, {
    // model of app two
});
```

### Binding to primitive values: `ps-bind`

To _bind_ an element to a variable means to create a direct connection between them: Whenever the value of the variable changes, this change will be reflected in the element.

In Prosecco JS you create this connection with the `ps-bind` attribute.

```html
<p ps-bind="greeting"></p>
```

The paragraph above is _bound_ to the value of the variable `greeting`.

In Prosecco, you can only bind to variables that you have defined in your model. So let's assume you have instantiated your app with the following model.

```js
var app = new Prosecco(rootElement, {
    greeting: 'Cheers, world!'
}); 
```

The paragraph that is bound to `greeting` will then render as

![](http://argonn.me/share/prosecco-demo-2.png)

If you want to bind to a specific attribute instead of the content of an element, use `ps-bind-attribute`.

```html
<input type="text" ps-bind="greeting" ps-bind-attribute="value">
```

In this input field, the value of the variable `greeting` will be bound to the input's `value` attribute. So, with our model from above, this would render as:

```html
<input type="text" value="Cheers, world!">
```

![](http://argonn.me/share/prosecco-demo-3.png)

If you don't specify a `ps-bind-attribute`, Prosecco will default to binding to the element's `textContent`.

You can bind as many elements as you like to a single variable. But you can only bind one variable to an element.

#### Modifying bound variables

You can modify all variables in your model directly in your JavaScript.

```js
app.model.greeting = 'À votre santé, world!';
```

Executing the line above will update both your model and all elements that are bound to it.

It also works the other way round: If you want the changes you make in the DOM to be reflected in your model, specify a `ps-bind-event`. Each time the specified event occurs on the bound element, Prosecco will update its corresponding value in the model.

```html
<input type="text"
    ps-bind="greeting"
    ps-bind-attribute="value"
    ps-bind-event="input">
```

In this input field, whenever the `input` event occurs - that is, changing the value by typing, cutting, pasting, etc. - the new value ist stored in the model. Try it by typing and looking up the value for `app.model.greeting` - it will always be the same value as you see in the input field.

Note that you can bind to any event. Should you fancy updating the model only when the user hovers the input field with her mouse, feel free to specify `ps-bind-event="mouseover"`.

### Conditional rules: `ps-if`

You can hide and show elements depending on the value of a variable.

```html
<p ps-if="error">
    <strong>Oh no!</strong> There was an error.
</p>
```

Whenever `error` is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), the paragraph above and all its children are displayed. When `error` ist [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), they are all hidden.

### Iterating over arrays: `ps-each`

At times you might need to manage a list of similar elements, for example in a shopping list. That's what `ps-each` is for.

```html
<h3>Drinks to buy</h3>
<ul>
    <li ps-each="drinks"></li>
</ul>
```

Suppose your model looks like this:

```js
{
    drinks: [ 'Prosecco', 'Bellini', 'Spritz' ]
}
```

Then the template above would render as

```html
<h3>Drinks to buy</h3>
<ul>
    <li>Prosecco</li>
    <li>Bellini</li>
    <li>Spritz</li>
</ul>
```

Whenever you manipulate the array in your code, Prosecco updates the `ps-each` loop in the template - even if you completely reassign it with a new array.

You can not only repeat individual elements, but also subtrees of the document:

```html
<div class="card" ps-each="imageUrls">
    <div class="image-wrapper">
        <img ps-each-value-target="src" alt="">
    </div>
</div>
```

The `ps-each-value-target` attribute defines

* which child element gets bound to the array values
* and which attribute of that child the value is bound to.

So the example above would render as

```html
<div class="card">
    <div class="image-wrapper">
        <img src="path/to/image1.jpg" alt="">
    </div>
</div>
<div class="card">
    <div class="image-wrapper">
        <img src="path/to/image2.jpg" alt="">
    </div>
</div>
<!-- ... -->
```

Note that _inside_ your array you can have all types of values that can be converted to a string. While it wouldn't make much sense to have objects inside your array (`{ a: 1, b: 2 }` converts to `"[object Object]"`), nesting other arrays in your array can work perfectly:

```js
{
    drinks: [ ['Prosecco', 'Frizzante'], ['Aperol', 'Spritz'] ]
}
```

would render as

```html
<h3>Drinks to buy</h3>
<ul>
    <li>Prosecco,Frizzante</li>
    <li>Aperol,Spritz</li>
</ul>
```

Note, too, that if you're feeling lucky you are free to override your value's `toString()` method. So if you really need to have objects in your array, you could do something like this:

```js
// .js
var stringifyableObject = { 
    a: 'my string representation', 
    b: 'some business logic'
};
stringifyableObject.toString = function () {
    return this.a
};

var app = new Prosecco(document.getElementById('app-root'), {
    list: [ stringifyableObject ]
});
```

```html
<!-- .html -->
<ul>
    <li ps-bind="list"></li>
</ul>
```

Looping over the `list` variable would then render as:

```html
<ul>
    <li>my string representation</li>
</ul>
```

### Watching value changes: `Prosecco.watch()`

You can execute your own code whenever a variable value changes, for example to make API calls whenever the user types in an input field. That's what watcher functions are for.

To add a watcher to a variable, simply call the `watch()` function on your Prosecco instance and pass it the variable name and the function you want to execute each time the value changes.

```js
var app = new Prosecco(appRoot, {
    query: ''
});

app.watch('query', function (oldValue, newValue) {
    // do something
});
```

The function you pass to `.watch()` is called _watcher_. It always has the same signature, with the variable's previous value as its first argument and the new value as its second argument.

You are free to execute arbitrary code in a watcher. Be aware, however, that watchers tend to fire more often than you think. Try for example watching an array variable, reassign a whole new array to it and see what happens...

```js
var app = new Prosecco(appRoot, {
    list: [ 1, 2, 3 ]
});

app.watch('list', function (oldValue, newValue) {
    alert('list changed from "' + oldValue + '" to "' + newValue + '")';
});

app.model.list = [ 4, 5, 6 ]
```
