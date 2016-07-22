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
      // _create: function () {
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
      //   this.$wrapper.addClass('active');
      //   this.$overlay.addClass('active');
      //   setTimeout(() => {
      //     this.$overlay.css({
      //     position: 'absolute',
      //     top: 0,
      //     bottom: 0,
      //     left: 0,
      //     right: 0
      //   });
      //   this.$content.show();
      // }, 0);
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
        // this.$wrapper.removeClass('active');
        // this.$overlay.removeClass('active');
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
//# sourceMappingURL=data:application/json;base64,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UztBQU5PLFNBQWxCO0FBUUEsZUFBSyxRQUFMLENBQWMsSUFBZDtBQUNELE9BZEQsRUFjRyxDQWRIO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsS0FoSzRCO0FBa0s3QixjQWxLNkIsd0JBa0toQjtBQUNYLFdBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsRUFBRSxLQUFGLENBQVEsa0JBQVIsQ0FBckI7QUFDQSxXQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBMEIsSUFBMUI7QUFDRCxLQXJLNEI7QUF1SzdCLGVBdks2Qix5QkF1S2Y7QUFBQTs7QUFDWixXQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLEVBQUUsS0FBRixDQUFRLHdCQUFSLENBQXJCO0FBQ0EsUUFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFVBQWQsRUFBMEIsTUFBMUI7QUFDQSxpQkFBVyxZQUFNO0FBQ2YsZUFBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjtBQUNoQiw0QkFBa0IsV0FERjtBQUVoQixrQkFBUTtBQUZRLFNBQWxCO0FBSUEsZUFBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjtBQUNoQixtQkFBUztBQURPLFNBQWxCO0FBR0E7QUFDQTtBQUNELE9BVkQsRUFVRyxDQVZIO0FBV0QsS0FyTDRCO0FBdUw3QixjQXZMNkIsd0JBdUxoQjtBQUNYLFdBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxJQUFkO0FBQ0EsV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixFQUFFLEtBQUYsQ0FBUSxrQkFBUixDQUFyQjtBQUNBLFdBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQixJQUExQjtBQUNEO0FBNUw0QixHQUEvQjtBQStMRCxDQWxNQSxFQWtNQyxNQWxNRCxDQUFEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAkLndpZGdldCgnY3VzdG9tLmJsdXJPdmVybGF5Jywge1xuXG4gICAgLypcbiAgICAqIERlZmF1bHQgb3B0aW9uc1xuICAgICovXG4gICAgb3B0aW9uczoge1xuICAgICAgLy8gU2V0IHRvIHRydWUgdG8gc2hvdyB0aGUgb3ZlcmxheSBvbiBpbml0XG4gICAgICBhdXRvU2hvdzogZmFsc2UsXG4gICAgICAvLyBEZWZhdWx0IGNvbnRlbnQgdG8gZGlzcGxheVxuICAgICAgY29udGVudDogJzxoMT5IZWxsbywgYmx1ciBvdmVybGF5ITwvaDE+JyxcbiAgICAgIC8vIEFtb3VudCBvZiBwaXhlbHMgdG8gYmx1ciBieVxuICAgICAgYmx1ckFtb3VudDogJzEycHgnLFxuICAgICAgLy8gRHVyYXRpb24gb2YgQ1NTIHRyYW5zaXRpb25zXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246ICczMzNtcycsXG4gICAgICAvLyBUeXBlIG9mIENTUyB0cmFuc2l0aW9uc1xuICAgICAgdHJhbnNpdGlvblR5cGU6ICdlYXNlLWluLW91dCdcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFRoZSBcImNvbnN0cnVjdG9yXCJcbiAgICAqL1xuICAgIF9jcmVhdGUoKSB7XG4gICAgLy8gX2NyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zaG93aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dEZWZlcnJlZCA9IG51bGw7XG4gICAgICB0aGlzLmhpZGVEZWZlcnJlZCA9IG51bGw7XG4gICAgICB0aGlzLnRyYW5zaXRpb24gPSBgJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9ufSAke3RoaXMub3B0aW9ucy50cmFuc2l0aW9uVHlwZX1gO1xuICAgICAgdGhpcy5faW5pdFdyYXBwZXIoKTtcbiAgICAgIHRoaXMuX2luaXRDb250ZW50KCk7XG4gICAgICB0aGlzLl9pbml0T3ZlcmxheSgpO1xuICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvU2hvdykge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFNob3cgdGhlIG92ZXJsYXlcbiAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICB0aGlzLnNob3dEZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgIGlmICghdGhpcy5zaG93aW5nKSB7XG4gICAgICAgIHRoaXMuX2JlZm9yZVNob3coKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hvd2luZyA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5zaG93RGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICogSGlkZSB0aGUgb3ZlcmxheVxuICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgIHRoaXMuaGlkZURlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgaWYgKHRoaXMuc2hvd2luZykge1xuICAgICAgICB0aGlzLl9iZWZvcmVIaWRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLmhpZGVEZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgKiBVcGRhdGUgdGhlIGNvbnRlbnRzIG9mIHRoZSBvdmVybGF5XG4gICAgKi9cbiAgICBjb250ZW50KG5ld0NvbnRlbnQpIHtcbiAgICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG5ld0NvbnRlbnQgPT09ICdmdW5jdGlvbic7XG4gICAgICB0aGlzLm9wdGlvbnMuY29udGVudCA9IGlzRnVuY3Rpb24gPyBuZXdDb250ZW50KCkgOiBuZXdDb250ZW50O1xuICAgICAgdGhpcy4kY29udGVudC5odG1sKHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIFJldHVybiB0cnVlIGlmIG92ZXJsYXkgaXMgc2hvd2luZywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgKi9cbiAgICBpc1Nob3dpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaG93aW5nO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICogRGVzdHJveSB0aGUgcGx1Z2luIGluc3RhbmNlIGFuZCBjbGVhbiB1cCB0aGUgRE9NXG4gICAgKi9cbiAgICAvLyBkZXN0cm95KCkge1xuICAgIC8vICAgdGhpcy5lbGVtZW50LnVud3JhcCgpO1xuICAgIC8vICAgdGhpcy4kb3ZlcmxheS5yZW1vdmUoKTtcbiAgICAvLyAgIHRoaXMuZWxlbWVudC5kYXRhKCdjdXN0b20tYmx1ck92ZXJsYXknLCBudWxsKTtcbiAgICAvLyAgICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICAvLyB9LFxuXG4gICAgLypcbiAgICAqIFByaXZhdGUgbWV0aG9kc1xuICAgICovXG5cbiAgICBfaW5pdFdyYXBwZXIoKSB7XG4gICAgICB0aGlzLiR3cmFwcGVyID0gJCgnPGRpdj4nKS5hdHRyKCdjbGFzcycsICdibHVyLW92ZXJsYXktd3JhcHBlcicpO1xuICAgICAgdGhpcy4kd3JhcHBlci5jc3Moe1xuICAgICAgICAnLXdlYmtpdC1maWx0ZXInOiAnYmx1cigwcHgpJyxcbiAgICAgICAgZmlsdGVyOiAnYmx1cigwcHgpJyxcbiAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbic6IGAtd2Via2l0LWZpbHRlciAke3RoaXMudHJhbnNpdGlvbn0sIGZpbHRlciAke3RoaXMudHJhbnNpdGlvbn1gLFxuICAgICAgICB0cmFuc2l0aW9uOiBgLXdlYmtpdC1maWx0ZXIgJHt0aGlzLnRyYW5zaXRpb259LCBmaWx0ZXIgJHt0aGlzLnRyYW5zaXRpb259YFxuICAgICAgfSk7XG4gICAgICB0aGlzLmVsZW1lbnQud3JhcEFsbCh0aGlzLiR3cmFwcGVyKTtcbiAgICAgIHRoaXMuJHdyYXBwZXIgPSB0aGlzLmVsZW1lbnQuY2xvc2VzdCgnLmJsdXItb3ZlcmxheS13cmFwcGVyJykuZmlyc3QoKTtcbiAgICB9LFxuXG4gICAgX2luaXRDb250ZW50KCkge1xuICAgICAgdGhpcy4kY29udGVudCA9ICQoJzxkaXY+JykuYXR0cignY2xhc3MnLCAnYmx1ci1vdmVybGF5LWNvbnRlbnQnKTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYXBwZW5kKHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuaGlkZSgpO1xuICAgIH0sXG5cbiAgICBfaW5pdE92ZXJsYXkoKSB7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gJCgnPGRpdj4nKS5hdHRyKCdjbGFzcycsICdibHVyLW92ZXJsYXktb3ZlcmxheScpO1xuICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moe1xuICAgICAgICAnei1pbmRleCc6IDEwMDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiBgb3BhY2l0eSAke3RoaXMudHJhbnNpdGlvbn1gLFxuICAgICAgICB0cmFuc2l0aW9uOiBgb3BhY2l0eSAke3RoaXMudHJhbnNpdGlvbn1gXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYXBwZW5kKHRoaXMuJGNvbnRlbnQpO1xuICAgIH0sXG5cbiAgICBfaW5pdEV2ZW50cygpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkub24oJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dpbmcpIHtcbiAgICAgICAgICB0aGlzLl9hZnRlckhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9hZnRlclNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9iZWZvcmVTaG93KCkge1xuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJC5FdmVudCgnYmx1ck92ZXJsYXkuYmVmb3JlU2hvdycpKTtcbiAgICAgICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuJHdyYXBwZXIuY3NzKHtcbiAgICAgICAgICAnLXdlYmtpdC1maWx0ZXInOiBgYmx1cigke3RoaXMub3B0aW9ucy5ibHVyQW1vdW50fSlgLFxuICAgICAgICAgIGZpbHRlcjogYGJsdXIoJHt0aGlzLm9wdGlvbnMuYmx1ckFtb3VudH0pYFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRjb250ZW50LnNob3coKTtcbiAgICAgIH0sIDApO1xuICAgICAgLy8gICB0aGlzLiR3cmFwcGVyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIC8vICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAvLyAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuJG92ZXJsYXkuY3NzKHtcbiAgICAgIC8vICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIC8vICAgICB0b3A6IDAsXG4gICAgICAvLyAgICAgYm90dG9tOiAwLFxuICAgICAgLy8gICAgIGxlZnQ6IDAsXG4gICAgICAvLyAgICAgcmlnaHQ6IDBcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyAgIHRoaXMuJGNvbnRlbnQuc2hvdygpO1xuICAgICAgLy8gfSwgMCk7XG4gICAgfSxcblxuICAgIF9hZnRlclNob3coKSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcigkLkV2ZW50KCdibHVyT3ZlcmxheS5zaG93JykpO1xuICAgICAgdGhpcy5zaG93RGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcbiAgICB9LFxuXG4gICAgX2JlZm9yZUhpZGUoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcigkLkV2ZW50KCdibHVyT3ZlcmxheS5iZWZvcmVIaWRlJykpO1xuICAgICAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuJHdyYXBwZXIuY3NzKHtcbiAgICAgICAgICAnLXdlYmtpdC1maWx0ZXInOiAnYmx1cigwcHgpJyxcbiAgICAgICAgICBmaWx0ZXI6ICdibHVyKDBweCknXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRvdmVybGF5LmNzcyh7XG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcy4kd3JhcHBlci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIC8vIHRoaXMuJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSwgMCk7XG4gICAgfSxcblxuICAgIF9hZnRlckhpZGUoKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIHRoaXMuJGNvbnRlbnQuaGlkZSgpO1xuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJC5FdmVudCgnYmx1ck92ZXJsYXkuaGlkZScpKTtcbiAgICAgIHRoaXMuaGlkZURlZmVycmVkLnJlc29sdmUodHJ1ZSk7XG4gICAgfVxuXG4gIH0pO1xufShqUXVlcnkpKTtcbiJdfQ==