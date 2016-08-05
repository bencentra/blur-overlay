# blur-overlay [![npm version](https://badge.fury.io/js/blur-overlay.svg)](https://badge.fury.io/js/blur-overlay) [![Bower version](https://badge.fury.io/bo/blur-overlay.svg)](https://badge.fury.io/bo/blur-overlay)

![Example of the blur overlay](http://i.giphy.com/cLyoZ6vi41k4.gif)

jQuery plugin for creating blurry overlays. Can customize the content, blur amount, and transition types.

Requires jQuery (`>=2.2.4`) and jQuery UI (`>=1.12.0`).

[Check out the demo!](https://bencentra.github.io/blur-overlay/)

## Installation

You can install blur-overlay from a package manager:
* __npm__: `npm install --save blur-overlay`
* __bower__: `bower install --save blur-overlay`

Or you can grab the latest `.js` file:
* [Development](https://raw.githubusercontent.com/bencentra/blur-overlay/master/dist/blur-overlay.js) (unminified, ~8kb)
* [Production](https://raw.githubusercontent.com/bencentra/blur-overlay/master/dist/blur-overlay.js) (minified, ~4kb)

## Usage

```js
$(document).on('ready', function () {

  // Because Edge + CSS filters cause position bugs
  var browserIsEdge = /Edge\/\d+/.test(navigator.userAgent);

  // Grab the element you want to "wrap" with blur
  var $target = $('#something');

  // Grab the content you want to display in the overlay
  var $overlay = $('#overlay').detach().show();

  // Initialize the overlay
  $target.blurOverlay({
    // Overlay content
    content: $overlay,
    // Background color of the overlay (use rgba for opacity)
    backgroundColor: 'rgba(255, 255, 255, .25)',
    // Blur amount (default 12px)
    blurAmount: '10px',
    // Duration of CSS transitions
    transitionDuration: '500ms',
    // Type of CSS transitions
    transitionType: 'cubic-bezier(.22, .57, .27, .92)',
    // Elements to "mask" (adds an extra overlay to improve visual contrast)
    masks: [{
      selector: '.mask-me', // Required
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
      width: '400px',
      height: '300px'
    }],
    // Override the z-index used for the overlay and masks
    zIndex: 3333,
    // Disable the blur filter (for incompatible/buggy browsers or whatever reason)
    noFilter: browserIsEdge
  });

  // Show the overlay
  $target.blurOverlay('show').then(function () {
    console.log('overlay is showing');
  });

  // Hide the overlay
  $target.blurOverlay('hide').then(function () {
    console.log('overlay is hidden');
  });

  // Update the content of the overlay
  $target.blurOverlay('content', '<p>New Content</p>');

  // Determine if the overlay is showing (true or false)
  console.log('Overlay is showing: ' + $target.blurOverlay('isShowing'));

  // Listen for events on the overlay
  $target.on('blurOverlay.beforeShow', function () {
    console.log('beforeShow event');
  });
  $target.on('blurOverlay.show', function () {
    console.log('show event');
  });
  $target.on('blurOverlay.beforeHide', function () {
    console.log('beforeHide event');
  });
  $target.on('blurOverlay.hide', function () {
    console.log('hide event');
  });

  // Destroy the plugin instance and clean up the DOM
  $target.blurOverlay('destroy');

});
```

## Developing

First and foremost, fork/clone the repo and run:
```bash
cd blur-overlay
# Use the recommended node version (6.x)
nvm use
# Install dependencies
npm install
```

If you don't have `nvm`, get it here: https://github.com/creationix/nvm

### npm scripts

Use the npm scripts defined in `package.json` to perform common build tasks:

| Command | Description |
| --- | --- |
| `npm start` | Run lint, tests, and build upon changes to `src/` and `spec/` |
| `npm test` | Run unit tests using Karma and PhantomJS (single-run only) |
| `npm run test:serve` | Start the Karma server (can debug at http://localhost:9876) |
| `npm run lint` | Lint `src/` and `spec/` with ESLint (with `--fix` flag) |
| `npm run build` | Transpile `src/` using Babel and minify using UglifyJS2, sending output to `dist/` |
| `npm run demo` | Launch the demo page (`index.html`) |

Make sure to run `npm run build` in between code changes to keep the demo page up-to-date!

## License

MIT. See [LICENSE](LICENSE).
