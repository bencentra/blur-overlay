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
      // Default content to display
      content: '<h1>Hello, blur overlay!</h1>',
      // Amount of pixels to blur by
      blurAmount: '12px',
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
//# sourceMappingURL=data:application/json;base64,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TyxTQUFsQjtBQVFBLGVBQUssUUFBTCxDQUFjLElBQWQ7QUFDRCxPQWRELEVBY0csQ0FkSDtBQWVELEtBbko0QjtBQXFKN0IsY0FySjZCLHdCQXFKaEI7QUFDWCxXQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLEVBQUUsS0FBRixDQUFRLGtCQUFSLENBQXJCO0FBQ0EsV0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLElBQTFCO0FBQ0QsS0F4SjRCO0FBMEo3QixlQTFKNkIseUJBMEpmO0FBQUE7O0FBQ1osV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixFQUFFLEtBQUYsQ0FBUSx3QkFBUixDQUFyQjtBQUNBLFFBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLE1BQTFCO0FBQ0EsaUJBQVcsWUFBTTtBQUNmLGVBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7QUFDaEIsNEJBQWtCLFdBREY7QUFFaEIsa0JBQVE7QUFGUSxTQUFsQjtBQUlBLGVBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7QUFDaEIsbUJBQVM7QUFETyxTQUFsQjtBQUdELE9BUkQsRUFRRyxDQVJIO0FBU0QsS0F0SzRCO0FBd0s3QixjQXhLNkIsd0JBd0toQjtBQUNYLFdBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxJQUFkO0FBQ0EsV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixFQUFFLEtBQUYsQ0FBUSxrQkFBUixDQUFyQjtBQUNBLFdBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQixJQUExQjtBQUNEO0FBN0s0QixHQUEvQjtBQWdMRCxDQW5MQSxFQW1MQyxNQW5MRCxDQUFEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAkLndpZGdldCgnY3VzdG9tLmJsdXJPdmVybGF5Jywge1xuXG4gICAgLypcbiAgICAqIERlZmF1bHQgb3B0aW9uc1xuICAgICovXG4gICAgb3B0aW9uczoge1xuICAgICAgLy8gU2V0IHRvIHRydWUgdG8gc2hvdyB0aGUgb3ZlcmxheSBvbiBpbml0XG4gICAgICBhdXRvU2hvdzogZmFsc2UsXG4gICAgICAvLyBEZWZhdWx0IGNvbnRlbnQgdG8gZGlzcGxheVxuICAgICAgY29udGVudDogJzxoMT5IZWxsbywgYmx1ciBvdmVybGF5ITwvaDE+JyxcbiAgICAgIC8vIEFtb3VudCBvZiBwaXhlbHMgdG8gYmx1ciBieVxuICAgICAgYmx1ckFtb3VudDogJzEycHgnLFxuICAgICAgLy8gRHVyYXRpb24gb2YgQ1NTIHRyYW5zaXRpb25zXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246ICczMzNtcycsXG4gICAgICAvLyBUeXBlIG9mIENTUyB0cmFuc2l0aW9uc1xuICAgICAgdHJhbnNpdGlvblR5cGU6ICdlYXNlLWluLW91dCcsXG4gICAgfSxcblxuICAgIC8qXG4gICAgKiBUaGUgXCJjb25zdHJ1Y3RvclwiXG4gICAgKi9cbiAgICBfY3JlYXRlKCkge1xuICAgICAgdGhpcy5zaG93aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dEZWZlcnJlZCA9IG51bGw7XG4gICAgICB0aGlzLmhpZGVEZWZlcnJlZCA9IG51bGw7XG4gICAgICB0aGlzLnRyYW5zaXRpb24gPSBgJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9ufSAke3RoaXMub3B0aW9ucy50cmFuc2l0aW9uVHlwZX1gO1xuICAgICAgdGhpcy5faW5pdFdyYXBwZXIoKTtcbiAgICAgIHRoaXMuX2luaXRDb250ZW50KCk7XG4gICAgICB0aGlzLl9pbml0T3ZlcmxheSgpO1xuICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvU2hvdykge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFNob3cgdGhlIG92ZXJsYXlcbiAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICB0aGlzLnNob3dEZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgIGlmICghdGhpcy5zaG93aW5nKSB7XG4gICAgICAgIHRoaXMuX2JlZm9yZVNob3coKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hvd2luZyA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5zaG93RGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICogSGlkZSB0aGUgb3ZlcmxheVxuICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgIHRoaXMuaGlkZURlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgaWYgKHRoaXMuc2hvd2luZykge1xuICAgICAgICB0aGlzLl9iZWZvcmVIaWRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLmhpZGVEZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgKiBVcGRhdGUgdGhlIGNvbnRlbnRzIG9mIHRoZSBvdmVybGF5XG4gICAgKi9cbiAgICBjb250ZW50KG5ld0NvbnRlbnQpIHtcbiAgICAgIGNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlb2YgbmV3Q29udGVudCA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIHRoaXMub3B0aW9ucy5jb250ZW50ID0gaXNGdW5jdGlvbiA/IG5ld0NvbnRlbnQoKSA6IG5ld0NvbnRlbnQ7XG4gICAgICB0aGlzLiRjb250ZW50Lmh0bWwodGhpcy5vcHRpb25zLmNvbnRlbnQpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICogUmV0dXJuIHRydWUgaWYgb3ZlcmxheSBpcyBzaG93aW5nLCBmYWxzZSBvdGhlcndpc2VcbiAgICAqL1xuICAgIGlzU2hvd2luZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dpbmc7XG4gICAgfSxcblxuICAgIC8qXG4gICAgKiBEZXN0cm95IHRoZSBwbHVnaW4gaW5zdGFuY2UgYW5kIGNsZWFuIHVwIHRoZSBET01cbiAgICAqL1xuICAgIC8vIGRlc3Ryb3koKSB7XG4gICAgLy8gICB0aGlzLmVsZW1lbnQudW53cmFwKCk7XG4gICAgLy8gICB0aGlzLiRvdmVybGF5LnJlbW92ZSgpO1xuICAgIC8vICAgdGhpcy5lbGVtZW50LmRhdGEoJ2N1c3RvbS1ibHVyT3ZlcmxheScsIG51bGwpO1xuICAgIC8vICAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgIC8vIH0sXG5cbiAgICAvKlxuICAgICogUHJpdmF0ZSBtZXRob2RzXG4gICAgKi9cblxuICAgIF9pbml0V3JhcHBlcigpIHtcbiAgICAgIHRoaXMuJHdyYXBwZXIgPSAkKCc8ZGl2PicpLmF0dHIoJ2NsYXNzJywgJ2JsdXItb3ZlcmxheS13cmFwcGVyJyk7XG4gICAgICB0aGlzLiR3cmFwcGVyLmNzcyh7XG4gICAgICAgICctd2Via2l0LWZpbHRlcic6ICdibHVyKDBweCknLFxuICAgICAgICBmaWx0ZXI6ICdibHVyKDBweCknLFxuICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogYC13ZWJraXQtZmlsdGVyICR7dGhpcy50cmFuc2l0aW9ufSwgZmlsdGVyICR7dGhpcy50cmFuc2l0aW9ufWAsXG4gICAgICAgIHRyYW5zaXRpb246IGAtd2Via2l0LWZpbHRlciAke3RoaXMudHJhbnNpdGlvbn0sIGZpbHRlciAke3RoaXMudHJhbnNpdGlvbn1gLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmVsZW1lbnQud3JhcEFsbCh0aGlzLiR3cmFwcGVyKTtcbiAgICAgIHRoaXMuJHdyYXBwZXIgPSB0aGlzLmVsZW1lbnQuY2xvc2VzdCgnLmJsdXItb3ZlcmxheS13cmFwcGVyJykuZmlyc3QoKTtcbiAgICB9LFxuXG4gICAgX2luaXRDb250ZW50KCkge1xuICAgICAgdGhpcy4kY29udGVudCA9ICQoJzxkaXY+JykuYXR0cignY2xhc3MnLCAnYmx1ci1vdmVybGF5LWNvbnRlbnQnKTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYXBwZW5kKHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuaGlkZSgpO1xuICAgIH0sXG5cbiAgICBfaW5pdE92ZXJsYXkoKSB7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gJCgnPGRpdj4nKS5hdHRyKCdjbGFzcycsICdibHVyLW92ZXJsYXktb3ZlcmxheScpO1xuICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moe1xuICAgICAgICAnei1pbmRleCc6IDEwMDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiBgb3BhY2l0eSAke3RoaXMudHJhbnNpdGlvbn1gLFxuICAgICAgICB0cmFuc2l0aW9uOiBgb3BhY2l0eSAke3RoaXMudHJhbnNpdGlvbn1gLFxuICAgICAgfSk7XG4gICAgICB0aGlzLiRvdmVybGF5LmFwcGVuZFRvKCdib2R5Jyk7XG4gICAgICB0aGlzLiRvdmVybGF5LmFwcGVuZCh0aGlzLiRjb250ZW50KTtcbiAgICB9LFxuXG4gICAgX2luaXRFdmVudHMoKSB7XG4gICAgICB0aGlzLiRvdmVybGF5Lm9uKCd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zaG93aW5nKSB7XG4gICAgICAgICAgdGhpcy5fYWZ0ZXJIaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fYWZ0ZXJTaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfYmVmb3JlU2hvdygpIHtcbiAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCQuRXZlbnQoJ2JsdXJPdmVybGF5LmJlZm9yZVNob3cnKSk7XG4gICAgICAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLiR3cmFwcGVyLmNzcyh7XG4gICAgICAgICAgJy13ZWJraXQtZmlsdGVyJzogYGJsdXIoJHt0aGlzLm9wdGlvbnMuYmx1ckFtb3VudH0pYCxcbiAgICAgICAgICBmaWx0ZXI6IGBibHVyKCR7dGhpcy5vcHRpb25zLmJsdXJBbW91bnR9KWAsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRvdmVybGF5LmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRjb250ZW50LnNob3coKTtcbiAgICAgIH0sIDApO1xuICAgIH0sXG5cbiAgICBfYWZ0ZXJTaG93KCkge1xuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJC5FdmVudCgnYmx1ck92ZXJsYXkuc2hvdycpKTtcbiAgICAgIHRoaXMuc2hvd0RlZmVycmVkLnJlc29sdmUodHJ1ZSk7XG4gICAgfSxcblxuICAgIF9iZWZvcmVIaWRlKCkge1xuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJC5FdmVudCgnYmx1ck92ZXJsYXkuYmVmb3JlSGlkZScpKTtcbiAgICAgICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLiR3cmFwcGVyLmNzcyh7XG4gICAgICAgICAgJy13ZWJraXQtZmlsdGVyJzogJ2JsdXIoMHB4KScsXG4gICAgICAgICAgZmlsdGVyOiAnYmx1cigwcHgpJyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuY3NzKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICB9KTtcbiAgICAgIH0sIDApO1xuICAgIH0sXG5cbiAgICBfYWZ0ZXJIaWRlKCkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgICB0aGlzLiRjb250ZW50LmhpZGUoKTtcbiAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCQuRXZlbnQoJ2JsdXJPdmVybGF5LmhpZGUnKSk7XG4gICAgICB0aGlzLmhpZGVEZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xuICAgIH0sXG5cbiAgfSk7XG59KGpRdWVyeSkpO1xuIl19