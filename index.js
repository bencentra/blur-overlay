$(function() {

  $.widget('custom.blurOverlay', {

    // Defaults
    options: {
      prefix: 'blur-overlay', // Prefix for wrapper selectors
      content: '<h1>Hello, blur overlay!</h1>', // Default content to display
      blurAmount: '12px' // Amount of pixels to blur by
    },

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
      this.$overlay.append(this.$content);
    },

    show: function() {
      // Wrap the target element
      $('body').css('overflow', 'hidden');
      this.element.wrapAll(this.$wrapper);
      // Create the overlay
      this.$content.html(this.options.content);
      $('body').prepend(this.$overlay);
    },

    hide: function() {
      $('body').css('overflow', 'auto');
      this.element.unwrap();
      this.$overlay.remove();
    },

    content: function(stringOrElement) {
      this.options.content = stringOrElement;
    }

  });

});
