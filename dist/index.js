'use strict';

(function ($) {
  'use strict';

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
    * Destroy the plugin instance and clean up the DOM
    */
    // destroy() {
    //   this.element.unwrap();
    //   this.$overlay.remove();
    //   this.element.data('custom-blurOverlay', null);
    //   $('body').css('overflow', 'auto');
    // },

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
//# sourceMappingURL=data:application/json;base64,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QVEsQ0FIUTtBQUloQixnQkFBTSxDQUpVO0FBS2hCLGlCQUFPLENBTFM7QUFNaEIsbUJBQVM7QUFOTyxTQUFsQjtBQVFBLGVBQUssUUFBTCxDQUFjLElBQWQ7QUFDRCxPQWRELEVBY0csQ0FkSDtBQWVELEtBdEo0QjtBQXdKN0IsY0F4SjZCLHdCQXdKaEI7QUFDWCxXQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLEVBQUUsS0FBRixDQUFRLGtCQUFSLENBQXJCO0FBQ0EsV0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLElBQTFCO0FBQ0QsS0EzSjRCO0FBNko3QixlQTdKNkIseUJBNkpmO0FBQUE7O0FBQ1osV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixFQUFFLEtBQUYsQ0FBUSx3QkFBUixDQUFyQjtBQUNBLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLE1BQTFCO0FBQ0EsaUJBQVcsWUFBTTtBQUNmLGVBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7QUFDaEIsNEJBQWtCLFdBREY7QUFFaEIsa0JBQVE7QUFGUSxTQUFsQjtBQUlBLGVBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7QUFDaEIsbUJBQVM7QUFETyxTQUFsQjtBQUdELE9BUkQsRUFRRyxDQVJIO0FBU0QsS0F6SzRCO0FBMks3QixjQTNLNkIsd0JBMktoQjtBQUNYLFdBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxJQUFkO0FBQ0EsV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixFQUFFLEtBQUYsQ0FBUSxrQkFBUixDQUFyQjtBQUNBLFdBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQixJQUExQjtBQUNEO0FBaEw0QixHQUEvQjtBQW1MRCxDQXRMQSxFQXNMQyxNQXRMRCxDQUFEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAkLndpZGdldCgnY3VzdG9tLmJsdXJPdmVybGF5Jywge1xuXG4gICAgLypcbiAgICAqIERlZmF1bHQgb3B0aW9uc1xuICAgICovXG4gICAgb3B0aW9uczoge1xuICAgICAgLy8gU2V0IHRvIHRydWUgdG8gc2hvdyB0aGUgb3ZlcmxheSBvbiBpbml0XG4gICAgICBhdXRvU2hvdzogZmFsc2UsXG4gICAgICAvLyBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBvdmVybGF5XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDApJyxcbiAgICAgIC8vIEFtb3VudCBvZiBwaXhlbHMgdG8gYmx1ciBieVxuICAgICAgYmx1ckFtb3VudDogJzEycHgnLFxuICAgICAgLy8gRGVmYXVsdCBjb250ZW50IHRvIGRpc3BsYXlcbiAgICAgIGNvbnRlbnQ6ICc8aDE+SGVsbG8sIGJsdXIgb3ZlcmxheSE8L2gxPicsXG4gICAgICAvLyBEdXJhdGlvbiBvZiBDU1MgdHJhbnNpdGlvbnNcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogJzMzM21zJyxcbiAgICAgIC8vIFR5cGUgb2YgQ1NTIHRyYW5zaXRpb25zXG4gICAgICB0cmFuc2l0aW9uVHlwZTogJ2Vhc2UtaW4tb3V0JyxcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFRoZSBcImNvbnN0cnVjdG9yXCJcbiAgICAqL1xuICAgIF9jcmVhdGUoKSB7XG4gICAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd0RlZmVycmVkID0gbnVsbDtcbiAgICAgIHRoaXMuaGlkZURlZmVycmVkID0gbnVsbDtcbiAgICAgIHRoaXMudHJhbnNpdGlvbiA9IGAke3RoaXMub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb259ICR7dGhpcy5vcHRpb25zLnRyYW5zaXRpb25UeXBlfWA7XG4gICAgICB0aGlzLl9pbml0V3JhcHBlcigpO1xuICAgICAgdGhpcy5faW5pdENvbnRlbnQoKTtcbiAgICAgIHRoaXMuX2luaXRPdmVybGF5KCk7XG4gICAgICB0aGlzLl9pbml0RXZlbnRzKCk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9TaG93KSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKlxuICAgICogU2hvdyB0aGUgb3ZlcmxheVxuICAgICovXG4gICAgc2hvdygpIHtcbiAgICAgIHRoaXMuc2hvd0RlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgaWYgKCF0aGlzLnNob3dpbmcpIHtcbiAgICAgICAgdGhpcy5fYmVmb3JlU2hvdygpO1xuICAgICAgfVxuICAgICAgdGhpcy5zaG93aW5nID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLnNob3dEZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgKiBIaWRlIHRoZSBvdmVybGF5XG4gICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgdGhpcy5oaWRlRGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICBpZiAodGhpcy5zaG93aW5nKSB7XG4gICAgICAgIHRoaXMuX2JlZm9yZUhpZGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZURlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFVwZGF0ZSB0aGUgY29udGVudHMgb2YgdGhlIG92ZXJsYXlcbiAgICAqL1xuICAgIGNvbnRlbnQobmV3Q29udGVudCkge1xuICAgICAgY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiBuZXdDb250ZW50ID09PSAnZnVuY3Rpb24nO1xuICAgICAgdGhpcy5vcHRpb25zLmNvbnRlbnQgPSBpc0Z1bmN0aW9uID8gbmV3Q29udGVudCgpIDogbmV3Q29udGVudDtcbiAgICAgIHRoaXMuJGNvbnRlbnQuaHRtbCh0aGlzLm9wdGlvbnMuY29udGVudCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgKiBSZXR1cm4gdHJ1ZSBpZiBvdmVybGF5IGlzIHNob3dpbmcsIGZhbHNlIG90aGVyd2lzZVxuICAgICovXG4gICAgaXNTaG93aW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2hvd2luZztcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIERlc3Ryb3kgdGhlIHBsdWdpbiBpbnN0YW5jZSBhbmQgY2xlYW4gdXAgdGhlIERPTVxuICAgICovXG4gICAgLy8gZGVzdHJveSgpIHtcbiAgICAvLyAgIHRoaXMuZWxlbWVudC51bndyYXAoKTtcbiAgICAvLyAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlKCk7XG4gICAgLy8gICB0aGlzLmVsZW1lbnQuZGF0YSgnY3VzdG9tLWJsdXJPdmVybGF5JywgbnVsbCk7XG4gICAgLy8gICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgLy8gfSxcblxuICAgIC8qXG4gICAgKiBQcml2YXRlIG1ldGhvZHNcbiAgICAqL1xuXG4gICAgX2luaXRXcmFwcGVyKCkge1xuICAgICAgdGhpcy4kd3JhcHBlciA9ICQoJzxkaXY+JykuYXR0cignY2xhc3MnLCAnYmx1ci1vdmVybGF5LXdyYXBwZXInKTtcbiAgICAgIHRoaXMuJHdyYXBwZXIuY3NzKHtcbiAgICAgICAgJy13ZWJraXQtZmlsdGVyJzogJ2JsdXIoMHB4KScsXG4gICAgICAgIGZpbHRlcjogJ2JsdXIoMHB4KScsXG4gICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiBgLXdlYmtpdC1maWx0ZXIgJHt0aGlzLnRyYW5zaXRpb259LCBmaWx0ZXIgJHt0aGlzLnRyYW5zaXRpb259YCxcbiAgICAgICAgdHJhbnNpdGlvbjogYC13ZWJraXQtZmlsdGVyICR7dGhpcy50cmFuc2l0aW9ufSwgZmlsdGVyICR7dGhpcy50cmFuc2l0aW9ufWAsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZWxlbWVudC53cmFwQWxsKHRoaXMuJHdyYXBwZXIpO1xuICAgICAgdGhpcy4kd3JhcHBlciA9IHRoaXMuZWxlbWVudC5jbG9zZXN0KCcuYmx1ci1vdmVybGF5LXdyYXBwZXInKS5maXJzdCgpO1xuICAgIH0sXG5cbiAgICBfaW5pdENvbnRlbnQoKSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gJCgnPGRpdj4nKS5hdHRyKCdjbGFzcycsICdibHVyLW92ZXJsYXktY29udGVudCcpO1xuICAgICAgdGhpcy4kY29udGVudC5hcHBlbmQodGhpcy5vcHRpb25zLmNvbnRlbnQpO1xuICAgICAgdGhpcy4kY29udGVudC5oaWRlKCk7XG4gICAgfSxcblxuICAgIF9pbml0T3ZlcmxheSgpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCc8ZGl2PicpLmF0dHIoJ2NsYXNzJywgJ2JsdXItb3ZlcmxheS1vdmVybGF5Jyk7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcyh7XG4gICAgICAgICd6LWluZGV4JzogMTAwMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogYG9wYWNpdHkgJHt0aGlzLnRyYW5zaXRpb259YCxcbiAgICAgICAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHt0aGlzLnRyYW5zaXRpb259YCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kb3ZlcmxheS5hcHBlbmRUbygnYm9keScpO1xuICAgICAgdGhpcy4kb3ZlcmxheS5hcHBlbmQodGhpcy4kY29udGVudCk7XG4gICAgfSxcblxuICAgIF9pbml0RXZlbnRzKCkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5vbigndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc2hvd2luZykge1xuICAgICAgICAgIHRoaXMuX2FmdGVySGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2FmdGVyU2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2JlZm9yZVNob3coKSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcigkLkV2ZW50KCdibHVyT3ZlcmxheS5iZWZvcmVTaG93JykpO1xuICAgICAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy4kd3JhcHBlci5jc3Moe1xuICAgICAgICAgICctd2Via2l0LWZpbHRlcic6IGBibHVyKCR7dGhpcy5vcHRpb25zLmJsdXJBbW91bnR9KWAsXG4gICAgICAgICAgZmlsdGVyOiBgYmx1cigke3RoaXMub3B0aW9ucy5ibHVyQW1vdW50fSlgLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kY29udGVudC5zaG93KCk7XG4gICAgICB9LCAwKTtcbiAgICB9LFxuXG4gICAgX2FmdGVyU2hvdygpIHtcbiAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCQuRXZlbnQoJ2JsdXJPdmVybGF5LnNob3cnKSk7XG4gICAgICB0aGlzLnNob3dEZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xuICAgIH0sXG5cbiAgICBfYmVmb3JlSGlkZSgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCQuRXZlbnQoJ2JsdXJPdmVybGF5LmJlZm9yZUhpZGUnKSk7XG4gICAgICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy4kd3JhcHBlci5jc3Moe1xuICAgICAgICAgICctd2Via2l0LWZpbHRlcic6ICdibHVyKDBweCknLFxuICAgICAgICAgIGZpbHRlcjogJ2JsdXIoMHB4KScsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRvdmVybGF5LmNzcyh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgfSk7XG4gICAgICB9LCAwKTtcbiAgICB9LFxuXG4gICAgX2FmdGVySGlkZSgpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgdGhpcy4kY29udGVudC5oaWRlKCk7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcigkLkV2ZW50KCdibHVyT3ZlcmxheS5oaWRlJykpO1xuICAgICAgdGhpcy5oaWRlRGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcbiAgICB9LFxuXG4gIH0pO1xufShqUXVlcnkpKTtcbiJdfQ==