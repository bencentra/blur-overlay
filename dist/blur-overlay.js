'use strict';

(function ($) {
  'use strict';

  var MASK_DEFAULTS = {
    color: 'rgba(255, 255, 255, 0.5)',
    opacity: 1
  };

  var isFunc = function isFunc(fn) {
    return typeof fn === 'function';
  };

  var returnOrCall = function returnOrCall(val) {
    return isFunc(val) ? val() : val;
  };

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
      // Array of "mask" objects, with possible options:
      // {
      //   selector: '.mask-me', // Required
      //   color: 'rgba(255, 255, 255, 0.5)',
      //   opacity: 1,
      //   width: '300px',
      //   height: '200px'
      masks: [],
      // Some browsers have quirks related to blur and other filters,
      // especially when dealing with absolute/fixed position elements.
      // Set this flag to true to disable the blur filter entirely.
      noFilter: false,
      // Duration of CSS transitions
      transitionDuration: '333ms',
      // Type of CSS transitions
      transitionType: 'ease-in-out',
      // Override z-index for overlay
      zIndex: 1000
    },

    /*
    * The "constructor"
    */
    _create: function _create() {
      this.showing = false;
      this.showDeferred = null;
      this.hideDeferred = null;
      this.transition = this.options.transitionDuration + ' ' + this.options.transitionType;
      this.masks = [];
      this.noFilter = returnOrCall(this.options.noFilter);
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
      this._removeWrapper();
      this._removeMasks();
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
      } else {
        this.showDeferred.resolve(false);
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
      } else {
        this.hideDeferred.resolve(false);
      }
      this.showing = false;
      return this.hideDeferred.promise();
    },


    /*
    * Update the contents of the overlay
    */
    content: function content(newContent) {
      this.options.content = returnOrCall(newContent);
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
      if (this.options.noFilter) return;
      this.$wrapper = $('<div>').attr('class', 'blur-overlay-wrapper');
      this.$wrapper.css({
        '-webkit-filter': 'blur(0px)',
        filter: 'blur(0px)',
        '-webkit-transition': '-webkit-filter ' + this.transition + ', filter ' + this.transition,
        transition: '-webkit-filter ' + this.transition + ', filter ' + this.transition
      });
    },
    _initContent: function _initContent() {
      this.$content = $('<div>').attr('class', 'blur-overlay-content');
      this.$content.append(this.options.content);
      this.$content.hide();
    },
    _initOverlay: function _initOverlay() {
      this.$overlay = $('<div>').attr('class', 'blur-overlay-overlay');
      this.$overlay.css({
        'z-index': this.options.zIndex,
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
    _applyWrapper: function _applyWrapper() {
      if (this.options.noFilter) return;
      this.element.wrapAll(this.$wrapper);
      this.$wrapper = this.element.closest('.blur-overlay-wrapper').first();
    },
    _blurWrapper: function _blurWrapper() {
      if (this.options.noFilter) return;
      this.$wrapper.css({
        '-webkit-filter': 'blur(' + this.options.blurAmount + ')',
        filter: 'blur(' + this.options.blurAmount + ')'
      });
    },
    _unblurWrapper: function _unblurWrapper() {
      if (this.options.noFilter) return;
      this.$wrapper.css({
        '-webkit-filter': 'blur(0px)',
        filter: 'blur(0px)'
      });
    },
    _removeWrapper: function _removeWrapper() {
      if (this.options.noFilter) return;
      this.element.unwrap('.blur-overlay-wrapper');
    },
    _showOverlay: function _showOverlay() {
      this.$overlay.css({
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 1
      });
    },
    _hideOverlay: function _hideOverlay() {
      this.$overlay.css({
        opacity: 0
      });
    },
    _addMasks: function _addMasks() {
      var _this2 = this;

      this.masks = [];
      this.options.masks.forEach(function (config) {
        var $contentToMask = $(config.selector);
        var contentOffset = $contentToMask.offset();
        var $mask = $('<div>').attr('class', 'blur-overlay-mask');
        $mask.css({
          width: config.width || $contentToMask.width(),
          height: config.height || $contentToMask.height(),
          position: 'fixed',
          top: contentOffset.top - window.pageYOffset,
          left: contentOffset.left - window.pageXOffset,
          opacity: 0,
          transition: 'opacity ' + _this2.transition,
          'z-index': _this2.options.zIndex,
          'background-color': config.color || MASK_DEFAULTS.color
        });
        $contentToMask.after($mask);
        _this2.masks.push({
          config: config,
          $mask: $mask
        });
      });
    },
    _showMasks: function _showMasks() {
      this.masks.forEach(function (mask) {
        mask.$mask.css({
          opacity: mask.config.opacity || MASK_DEFAULTS.opacity
        });
      });
    },
    _hideMasks: function _hideMasks() {
      this.masks.forEach(function (mask) {
        mask.$mask.css({
          opacity: 0
        });
      });
    },
    _removeMasks: function _removeMasks() {
      this.masks.forEach(function (mask) {
        mask.$mask.remove();
      });
      this.masks = [];
    },
    _beforeShow: function _beforeShow() {
      var _this3 = this;

      this.element.trigger($.Event('blurOverlay.beforeShow'));
      $('body').css('overflow', 'hidden');
      this._applyWrapper();
      this._addMasks();
      setTimeout(function () {
        _this3._blurWrapper();
        _this3._showOverlay();
        _this3._showMasks();
        _this3.$content.show();
      }, 0);
    },
    _afterShow: function _afterShow() {
      this.element.trigger($.Event('blurOverlay.show'));
      this.showDeferred.resolve(true);
    },
    _beforeHide: function _beforeHide() {
      var _this4 = this;

      this.element.trigger($.Event('blurOverlay.beforeHide'));
      $('body').css('overflow', 'auto');
      setTimeout(function () {
        _this4._unblurWrapper();
        _this4._hideOverlay();
        _this4._hideMasks();
      }, 0);
    },
    _afterHide: function _afterHide() {
      this.$overlay.css('position', 'relative');
      this.$content.hide();
      this._removeWrapper();
      this._removeMasks();
      this.element.trigger($.Event('blurOverlay.hide'));
      this.hideDeferred.resolve(true);
    }
  });
})(jQuery);