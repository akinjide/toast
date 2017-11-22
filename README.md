# toast

Lightweight javascript toast notifications.

## Demo
- Demo can be found at https://akinjide.github.io/toast/

## Install

#### [Bower](http://bower.io/search/?q=toast)
```
bower install toast
```

#### Minified
[JS](https://github.com/akinjide/toast/blob/master/build/toast.min.js) | [CSS](https://github.com/akinjide/toast/blob/master/build/toast.min.css)

#### Full
[JS](https://github.com/akinjide/toast/blob/master/toast.js) | [CSS](https://github.com/akinjide/toast/blob/master/toast.css)

## Quick Start

### 3 Easy Steps

1. Link to toast.css `<link href="toast.min.css" rel="stylesheet"/>`

2. Link to toast.js `<script src="toast.min.js"></script>`

3. Display info, success, warning or error using toast
	```js
	toast.info('Addicted to Chocolates');
	```

### Other Options
```js
toast.warn('User error - Replace user.')
toast.success('Humming is fun.')
toastr.error('An error occurred while displaying the previous error.')
```

### Configuration

```js
var options = {
  // Fallback Text
  // Default: yo! toast
  text: 'Mommy is that you??',

  // Show Toast Duration
  // Default: 3000
  showDuration: 3000,

  // Prepend Toast to HTML Element
  // Default: body
  target: 'body',

  // Touch or Tap Toast to remove
  // Default: true
  tapToDismiss: false,

  // Fallback Toast Background Color
  // Default: 'rgba(0, 0, 10, 0.7)'
  bgColor: 'rgba(0, 0, 10, 0.7)',

  // Toast HTML Element to use
  // Default: toast
  toastClass: 'toast',

  // Show close button
  // Default: true
  closeButton: true,

  // Close HTML Element to use
  // Default: closer
  closeClass: 'closer'
};

toast.config(options);
````

## Build

Building Toast minified and css versions requires [node](http://nodejs.org) installed.

```bash
$ npm install -g gulp karma-cli
$ npm install

# Run analytics
$ gulp analyze

# Run test
$ gulp test

# Run build
$ gulp
```

## Copyright
Copyright © 2017