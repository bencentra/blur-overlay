/* eslint-disable max-len */
(function (window, $) {
  var targetFixture = '<div id="target">' +
                        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
                        '<button type="button" id="openButton">Open Me</button>' +
                      '</div>';
  var overlayFixture = '<div id="overlay">' +
                          '<h1>This is a pretty blurry overlay, I bet!</h1>' +
                          '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
                          '<button type="button" id="closeButton">Close Me</button>' +
                        '</div>';

  describe('Blur Overlay plugin', function () {
    var $target;
    var $overlay;
    var data;

    beforeEach(function () {
      $target = $(targetFixture).appendTo('body');
      $overlay = $(overlayFixture);
      data = null;
    });

    afterEach(function () {
      $target.remove();
      $overlay.remove();
      $('.blur-overlay-wrapper').remove();
      $('.blur-overlay-overlay').remove();
    });

    it('is defined', function () {
      expect($.fn.blurOverlay).toBeDefined();
    });

    it('is a function', function () {
      expect(typeof $.fn.blurOverlay).toBe('function');
    });

    describe('constructor', function () {
      it('initializes the plugin with defaults', function () {
        $target.blurOverlay();
        data = $target.data('custom-blurOverlay');
        expect(data).toBeDefined();
        expect(data.options).toEqual(jasmine.objectContaining({
          content: jasmine.any(String),
          autoShow: false,
          blurAmount: '12px'
        }));
        expect($('.blur-overlay-overlay').css('opacity')).toBe('0');
        expect($('.blur-overlay-wrapper').css('-webkit-filter')).toBe('blur(0px)');
      });

      it('initializes the plugin with custom content', function () {
        $target.blurOverlay({
          content: $overlay
        });
        data = $target.data('custom-blurOverlay');
        expect(data.options.content).toEqual($overlay);
        expect($('.blur-overlay-overlay').css('opacity')).toBe('0');
        expect($('.blur-overlay-wrapper').css('-webkit-filter')).toBe('blur(0px)');
      });

      it('initializes the plugin with custom blur amount', function () {
        var newBlur = '8px';
        $target.blurOverlay({
          blurAmount: newBlur
        });
        data = $target.data('custom-blurOverlay');
        expect(data.options.blurAmount).toEqual(newBlur);
        expect($('.blur-overlay-overlay').css('opacity')).toBe('0');
        expect($('.blur-overlay-wrapper').css('-webkit-filter')).toBe('blur(0px)');
      });

      it('initializes the plugin and shows the overlay', function () {
        $target.blurOverlay({
          autoShow: true
        });
        data = $target.data('custom-blurOverlay');
        expect(data.options.autoShow).toEqual(true);
        expect($('.blur-overlay-overlay').css('opacity')).toBe('1');
        expect($('.blur-overlay-wrapper').css('-webkit-filter')).toBe('blur(12px)');
      });
    });

    describe('public methods', function () {
      describe('show()', function () {
        it('displays the overlay', function (done) {
          $target.blurOverlay({
            content: $overlay
          });
          expect($('.blur-overlay-overlay').css('opacity')).toBe('0');
          $target.blurOverlay('show').then(function () {
            expect($('.blur-overlay-overlay').css('opacity')).toBe('1');
            done();
          });
        });
      });

      describe('hide()', function () {
        it('hides the overlay', function (done) {
          $target.blurOverlay({
            content: $overlay,
            autoShow: true
          });
          expect($('.blur-overlay-overlay').css('opacity')).toBe('1');
          $target.blurOverlay('hide').then(function () {
            expect($('.blur-overlay-overlay').css('opacity')).toBe('0');
            done();
          });
        });
      });

      describe('content()', function () {
        var newContent;
        var content;

        it('changes the content of the overlay (jQuery selector)', function () {
          newContent = $('<h1>').text('LOL');
          $target.blurOverlay({
            content: $overlay
          });
          content = $('.blur-overlay-content').children().first();
          expect(content.html()).toEqual($overlay.html());
          $target.blurOverlay('content', newContent);
          content = $('.blur-overlay-content').children().first();
          expect(content.html()).toEqual(newContent.html());
        });

        it('changes the content of the overlay (string)', function () {
          newContent = '<h1>LOL</h1>';
          $target.blurOverlay({
            content: $overlay
          });
          content = $('.blur-overlay-content').children().first();
          expect(content.html()).toEqual($overlay.html());
          $target.blurOverlay('content', newContent);
          content = $('.blur-overlay-content').children().first();
          expect(content[0].outerHTML).toEqual(newContent);
        });
      });

      describe('isShowing()', function () {
        it('returns true if overlay is showing', function () {
          $target.blurOverlay({
            content: $overlay,
            autoShow: true
          });
          expect($target.blurOverlay('isShowing')).toBe(true);
        });

        it('returns false if overlay is not showing', function () {
          $target.blurOverlay({
            content: $overlay
          });
          expect($target.blurOverlay('isShowing')).toBe(false);
        });
      });

      // describe('destroy()', function () {
      //
      // });
    });

    describe('events', function () {

    });
  });
}(window, jQuery));
