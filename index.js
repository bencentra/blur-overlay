$(function() {

  var showing = false;

  $.widget('custom.blurOverlay', {

    // Defaults
    options: {
      autoShow: false, // Set to true to show the overlay on init
      content: '<h1>Hello, blur overlay!</h1>', // Default content to display
      blurAmount: '12px' // Amount of pixels to blur by
    },

    // "Constructor"
    _create: function() {
      // Initialize elements
      this.$wrapper = $('<div>').attr('class', 'blur-overlay-wrapper');
      this.$wrapper.css({
        '-webkit-filter': 'blur(0px)',
        'filter': 'blur(0px)',
        'transition': '-webkit-filter 600ms linear, filter 600ms linear'
      });
      this.$overlay = $('<div>').attr('class', 'blur-overlay-overlay');
      this.$overlay.css({
        'position': 'absolute',
        'top': 0,
        'bottom': 0,
        'left': 0,
        'right': 0,
        'z-index': 1000
      });
      this.$content = $('<div>').attr('class', 'blur-overlay-content');
      this.$content.append(this.options.content);
      this.$overlay.append(this.$content);
      // Wrap the target element
      this.element.wrapAll(this.$wrapper);
      this.$wrapper = this.element.closest('.blur-overlay-wrapper').first();
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
        // Blur the background content
        this.$wrapper.css({
          '-webkit-filter': 'blur(' + this.options.blurAmount + ')',
          'filter': 'blur(' + this.options.blurAmount + ')'
        });
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
        // Unblur the background content
        this.$wrapper.css({
          '-webkit-filter': 'blur(0px)',
          'filter': 'blur(0px)'
        });
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
