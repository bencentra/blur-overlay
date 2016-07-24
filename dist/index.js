'use strict';

(function ($) {
  'use strict';

  // For more on $.widget(), see: https://api.jqueryui.com/jquery.widget/

  $.widget('custom.blurOverlay', {

    /*
    * Default options
    */
    options: {
      // Set to true to show the overlay on init
      autoShow: false,
      // Background color of the overlay
      backgroundColor: 'rgba(255, 255, 255, 0)',
      // Amount of pixels to blur by
      blurAmount: '12px',
      // Default content to display
      content: '<h1>Hello, blur overlay!</h1>',
      // Duration of CSS transitions
      transitionDuration: '333ms',
      // Type of CSS transitions
      transitionType: 'ease-in-out'
    },

    /*
    * The "constructor"
    */
    _create: function _create() {
      this.showing = false;
      this.showDeferred = null;
      this.hideDeferred = null;
      this.transition = this.options.transitionDuration + ' ' + this.options.transitionType;
      this._initWrapper();
      this._initContent();
      this._initOverlay();
      this._initEvents();
      if (this.options.autoShow) {
        this.show();
      }
    },


    /*
    * Destroy the plugin instance and clean up the DOM
    */
    _destroy: function _destroy() {
      this.element.unwrap();
      this.$overlay.remove();
      $('body').css('overflow', 'auto');
    },


    /*
    * Show the overlay
    */
    show: function show() {
      this.showDeferred = $.Deferred();
      if (!this.showing) {
        this._beforeShow();
      }
      this.showing = true;
      return this.showDeferred.promise();
    },


    /*
    * Hide the overlay
    */
    hide: function hide() {
      this.hideDeferred = $.Deferred();
      if (this.showing) {
        this._beforeHide();
      }
      this.showing = false;
      return this.hideDeferred.promise();
    },


    /*
    * Update the contents of the overlay
    */
    content: function content(newContent) {
      var isFunction = typeof newContent === 'function';
      this.options.content = isFunction ? newContent() : newContent;
      this.$content.html(this.options.content);
    },


    /*
    * Return true if overlay is showing, false otherwise
    */
    isShowing: function isShowing() {
      return this.showing;
    },


    /*
    * Private methods
    */

    _initWrapper: function _initWrapper() {
      this.$wrapper = $('<div>').attr('class', 'blur-overlay-wrapper');
      this.$wrapper.css({
        '-webkit-filter': 'blur(0px)',
        filter: 'blur(0px)',
        '-webkit-transition': '-webkit-filter ' + this.transition + ', filter ' + this.transition,
        transition: '-webkit-filter ' + this.transition + ', filter ' + this.transition
      });
      this.element.wrapAll(this.$wrapper);
      this.$wrapper = this.element.closest('.blur-overlay-wrapper').first();
    },
    _initContent: function _initContent() {
      this.$content = $('<div>').attr('class', 'blur-overlay-content');
      this.$content.append(this.options.content);
      this.$content.hide();
    },
    _initOverlay: function _initOverlay() {
      this.$overlay = $('<div>').attr('class', 'blur-overlay-overlay');
      this.$overlay.css({
        'z-index': 1000,
        'background-color': this.options.backgroundColor,
        opacity: 0,
        '-webkit-transition': 'opacity ' + this.transition,
        transition: 'opacity ' + this.transition
      });
      this.$overlay.appendTo('body');
      this.$overlay.append(this.$content);
    },
    _initEvents: function _initEvents() {
      var _this = this;

      this.$overlay.on('transitionend webkitTransitionEnd', function () {
        if (!_this.showing) {
          _this._afterHide();
        } else {
          _this._afterShow();
        }
      });
    },
    _beforeShow: function _beforeShow() {
      var _this2 = this;

      this.element.trigger($.Event('blurOverlay.beforeShow'));
      $('body').css('overflow', 'hidden');
      setTimeout(function () {
        _this2.$wrapper.css({
          '-webkit-filter': 'blur(' + _this2.options.blurAmount + ')',
          filter: 'blur(' + _this2.options.blurAmount + ')'
        });
        _this2.$overlay.css({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 1
        });
        _this2.$content.show();
      }, 0);
    },
    _afterShow: function _afterShow() {
      this.element.trigger($.Event('blurOverlay.show'));
      this.showDeferred.resolve(true);
    },
    _beforeHide: function _beforeHide() {
      var _this3 = this;

      this.element.trigger($.Event('blurOverlay.beforeHide'));
      $('body').css('overflow', 'auto');
      setTimeout(function () {
        _this3.$wrapper.css({
          '-webkit-filter': 'blur(0px)',
          filter: 'blur(0px)'
        });
        _this3.$overlay.css({
          opacity: 0
        });
      }, 0);
    },
    _afterHide: function _afterHide() {
      this.$overlay.css('position', 'relative');
      this.$content.hide();
      this.element.trigger($.Event('blurOverlay.hide'));
      this.hideDeferred.resolve(true);
    }
  });
})(jQuery);
//# sourceMappingURL=data:application/json;base64,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RCxDQUFEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBGb3IgbW9yZSBvbiAkLndpZGdldCgpLCBzZWU6IGh0dHBzOi8vYXBpLmpxdWVyeXVpLmNvbS9qcXVlcnkud2lkZ2V0L1xuICAkLndpZGdldCgnY3VzdG9tLmJsdXJPdmVybGF5Jywge1xuXG4gICAgLypcbiAgICAqIERlZmF1bHQgb3B0aW9uc1xuICAgICovXG4gICAgb3B0aW9uczoge1xuICAgICAgLy8gU2V0IHRvIHRydWUgdG8gc2hvdyB0aGUgb3ZlcmxheSBvbiBpbml0XG4gICAgICBhdXRvU2hvdzogZmFsc2UsXG4gICAgICAvLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBvdmVybGF5XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDApJyxcbiAgICAgIC8vIEFtb3VudCBvZiBwaXhlbHMgdG8gYmx1ciBieVxuICAgICAgYmx1ckFtb3VudDogJzEycHgnLFxuICAgICAgLy8gRGVmYXVsdCBjb250ZW50IHRvIGRpc3BsYXlcbiAgICAgIGNvbnRlbnQ6ICc8aDE+SGVsbG8sIGJsdXIgb3ZlcmxheSE8L2gxPicsXG4gICAgICAvLyBEdXJhdGlvbiBvZiBDU1MgdHJhbnNpdGlvbnNcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogJzMzM21zJyxcbiAgICAgIC8vIFR5cGUgb2YgQ1NTIHRyYW5zaXRpb25zXG4gICAgICB0cmFuc2l0aW9uVHlwZTogJ2Vhc2UtaW4tb3V0JyxcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFRoZSBcImNvbnN0cnVjdG9yXCJcbiAgICAqL1xuICAgIF9jcmVhdGUoKSB7XG4gICAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd0RlZmVycmVkID0gbnVsbDtcbiAgICAgIHRoaXMuaGlkZURlZmVycmVkID0gbnVsbDtcbiAgICAgIHRoaXMudHJhbnNpdGlvbiA9IGAke3RoaXMub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb259ICR7dGhpcy5vcHRpb25zLnRyYW5zaXRpb25UeXBlfWA7XG4gICAgICB0aGlzLl9pbml0V3JhcHBlcigpO1xuICAgICAgdGhpcy5faW5pdENvbnRlbnQoKTtcbiAgICAgIHRoaXMuX2luaXRPdmVybGF5KCk7XG4gICAgICB0aGlzLl9pbml0RXZlbnRzKCk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9TaG93KSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKlxuICAgICogRGVzdHJveSB0aGUgcGx1Z2luIGluc3RhbmNlIGFuZCBjbGVhbiB1cCB0aGUgRE9NXG4gICAgKi9cbiAgICBfZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC51bndyYXAoKTtcbiAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlKCk7XG4gICAgICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgKiBTaG93IHRoZSBvdmVybGF5XG4gICAgKi9cbiAgICBzaG93KCkge1xuICAgICAgdGhpcy5zaG93RGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICBpZiAoIXRoaXMuc2hvd2luZykge1xuICAgICAgICB0aGlzLl9iZWZvcmVTaG93KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dpbmcgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuc2hvd0RlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIEhpZGUgdGhlIG92ZXJsYXlcbiAgICAqL1xuICAgIGhpZGUoKSB7XG4gICAgICB0aGlzLmhpZGVEZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgIGlmICh0aGlzLnNob3dpbmcpIHtcbiAgICAgICAgdGhpcy5fYmVmb3JlSGlkZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zaG93aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlRGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICogVXBkYXRlIHRoZSBjb250ZW50cyBvZiB0aGUgb3ZlcmxheVxuICAgICovXG4gICAgY29udGVudChuZXdDb250ZW50KSB7XG4gICAgICBjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIG5ld0NvbnRlbnQgPT09ICdmdW5jdGlvbic7XG4gICAgICB0aGlzLm9wdGlvbnMuY29udGVudCA9IGlzRnVuY3Rpb24gPyBuZXdDb250ZW50KCkgOiBuZXdDb250ZW50O1xuICAgICAgdGhpcy4kY29udGVudC5odG1sKHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFJldHVybiB0cnVlIGlmIG92ZXJsYXkgaXMgc2hvd2luZywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgKi9cbiAgICBpc1Nob3dpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaG93aW5nO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICogUHJpdmF0ZSBtZXRob2RzXG4gICAgKi9cblxuICAgIF9pbml0V3JhcHBlcigpIHtcbiAgICAgIHRoaXMuJHdyYXBwZXIgPSAkKCc8ZGl2PicpLmF0dHIoJ2NsYXNzJywgJ2JsdXItb3ZlcmxheS13cmFwcGVyJyk7XG4gICAgICB0aGlzLiR3cmFwcGVyLmNzcyh7XG4gICAgICAgICctd2Via2l0LWZpbHRlcic6ICdibHVyKDBweCknLFxuICAgICAgICBmaWx0ZXI6ICdibHVyKDBweCknLFxuICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogYC13ZWJraXQtZmlsdGVyICR7dGhpcy50cmFuc2l0aW9ufSwgZmlsdGVyICR7dGhpcy50cmFuc2l0aW9ufWAsXG4gICAgICAgIHRyYW5zaXRpb246IGAtd2Via2l0LWZpbHRlciAke3RoaXMudHJhbnNpdGlvbn0sIGZpbHRlciAke3RoaXMudHJhbnNpdGlvbn1gLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmVsZW1lbnQud3JhcEFsbCh0aGlzLiR3cmFwcGVyKTtcbiAgICAgIHRoaXMuJHdyYXBwZXIgPSB0aGlzLmVsZW1lbnQuY2xvc2VzdCgnLmJsdXItb3ZlcmxheS13cmFwcGVyJykuZmlyc3QoKTtcbiAgICB9LFxuXG4gICAgX2luaXRDb250ZW50KCkge1xuICAgICAgdGhpcy4kY29udGVudCA9ICQoJzxkaXY+JykuYXR0cignY2xhc3MnLCAnYmx1ci1vdmVybGF5LWNvbnRlbnQnKTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYXBwZW5kKHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuaGlkZSgpO1xuICAgIH0sXG5cbiAgICBfaW5pdE92ZXJsYXkoKSB7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gJCgnPGRpdj4nKS5hdHRyKCdjbGFzcycsICdibHVyLW92ZXJsYXktb3ZlcmxheScpO1xuICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moe1xuICAgICAgICAnei1pbmRleCc6IDEwMDAsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5vcHRpb25zLmJhY2tncm91bmRDb2xvcixcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbic6IGBvcGFjaXR5ICR7dGhpcy50cmFuc2l0aW9ufWAsXG4gICAgICAgIHRyYW5zaXRpb246IGBvcGFjaXR5ICR7dGhpcy50cmFuc2l0aW9ufWAsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYXBwZW5kKHRoaXMuJGNvbnRlbnQpO1xuICAgIH0sXG5cbiAgICBfaW5pdEV2ZW50cygpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkub24oJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dpbmcpIHtcbiAgICAgICAgICB0aGlzLl9hZnRlckhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9hZnRlclNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9iZWZvcmVTaG93KCkge1xuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJC5FdmVudCgnYmx1ck92ZXJsYXkuYmVmb3JlU2hvdycpKTtcbiAgICAgICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuJHdyYXBwZXIuY3NzKHtcbiAgICAgICAgICAnLXdlYmtpdC1maWx0ZXInOiBgYmx1cigke3RoaXMub3B0aW9ucy5ibHVyQW1vdW50fSlgLFxuICAgICAgICAgIGZpbHRlcjogYGJsdXIoJHt0aGlzLm9wdGlvbnMuYmx1ckFtb3VudH0pYCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGNvbnRlbnQuc2hvdygpO1xuICAgICAgfSwgMCk7XG4gICAgfSxcblxuICAgIF9hZnRlclNob3coKSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcigkLkV2ZW50KCdibHVyT3ZlcmxheS5zaG93JykpO1xuICAgICAgdGhpcy5zaG93RGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcbiAgICB9LFxuXG4gICAgX2JlZm9yZUhpZGUoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcigkLkV2ZW50KCdibHVyT3ZlcmxheS5iZWZvcmVIaWRlJykpO1xuICAgICAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuJHdyYXBwZXIuY3NzKHtcbiAgICAgICAgICAnLXdlYmtpdC1maWx0ZXInOiAnYmx1cigwcHgpJyxcbiAgICAgICAgICBmaWx0ZXI6ICdibHVyKDBweCknLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moe1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIH0pO1xuICAgICAgfSwgMCk7XG4gICAgfSxcblxuICAgIF9hZnRlckhpZGUoKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuaGlkZSgpO1xuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJC5FdmVudCgnYmx1ck92ZXJsYXkuaGlkZScpKTtcbiAgICAgIHRoaXMuaGlkZURlZmVycmVkLnJlc29sdmUodHJ1ZSk7XG4gICAgfSxcblxuICB9KTtcbn0oalF1ZXJ5KSk7XG4iXX0=