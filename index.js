$(function() {

  var showing = false;

  $.widget('custom.blurOverlay', {

    // Defaults
    options: {
      autoShow: false, // Set to true to show the overlay on init
      prefix: 'blur-overlay', // Prefix for wrapper selectors
      content: '<h1>Hello, blur overlay!</h1>', // Default content to display
      blurAmount: '12px' // Amount of pixels to blur by
    },

    // "Constructor"
    _create: function() {
      // Initialize elements
      this.$wrapper = $('<div>').attr('id', this.options.prefix + '-wrapper');
      this.$wrapper.css({
        'position': 'absolute',
        'top': 0,
        'bottom': 0,
        'left': 0,
        'right': 0,
        '-webkit-filter': 'blur(' + this.options.blurAmount + ')',
        'filter': 'blur(' + this.options.blurAmount + ')'
      });
      this.$overlay = $('<div>').attr('id', this.options.prefix + '-overlay');
      this.$overlay.css({
        'position': 'absolute',
        'top': 0,
        'bottom': 0,
        'left': 0,
        'right': 0,
        'z-index': 1000
      });
      this.$content = $('<div>').attr('id', this.options.prefix + '-content');
      this.$content.append(this.options.content);
      this.$overlay.append(this.$content);
      // Optionally show the overlay
      if (this.options.autoShow) {
        this.show();
      }
    },

    // Show the overlay
    show: function() {
      if (!showing) {
        // Trigger beforeShow event
        this.element.trigger($.Event('blurOverlay.beforeShow'));
        // Disable scrolling
        $('body').css('overflow', 'hidden');
        // Wrap the target element
        this.element.wrapAll(this.$wrapper);
        // Create the overlay
        $('body').prepend(this.$overlay);
        // Trigger show event
        showing = true;
        this.element.trigger($.Event('blurOverlay.show'));
      }
    },

    // Hide the overlay
    hide: function() {
      if (showing) {
        // Trigger beforeHide event
        this.element.trigger($.Event('blurOverlay.beforeHide'));
        // Enable scrolling
        $('body').css('overflow', 'auto');
        // Unwrap the target element
        this.element.unwrap();
        // Destroy the overlay
        this.$overlay = this.$overlay.detach();
        // Trigger hide event
        showing = false
        this.element.trigger($.Event('blurOverlay.hide'));
      }
    },

    // Update the contents of the overlay
    content: function(newContent) {
      var isFunction = typeof newContent === 'function';
      this.options.content = isFunction ? newContent() : newContent;
      this.$content.html(this.options.content);
    }

  });

});
