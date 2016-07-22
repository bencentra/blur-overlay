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
      });

      it('initializes the plugin with custom content', function () {
        $target.blurOverlay({
          content: $overlay
        });
        data = $target.data('custom-blurOverlay');
        expect(data.options.content).toEqual($overlay);
      });

      it('initializes the plugin with custom blur amount', function () {
        var newBlur = '8px';
        $target.blurOverlay({
          blurAmount: newBlur
        });
        data = $target.data('custom-blurOverlay');
        expect(data.options.blurAmount).toEqual(newBlur);
      });

      it('initializes the plugin and shows the overlay', function () {
        $target.blurOverlay({
          autoShow: true
        });
        data = $target.data('custom-blurOverlay');
        expect(data.options.autoShow).toEqual(true);
      });

      it('initializes the plugin with custom transition settings', function () {
        var newDuration = '1s';
        var newType = 'linear';
        $target.blurOverlay({
          transitionDuration: newDuration,
          transitionType: newType
        });
        data = $target.data('custom-blurOverlay');
        expect(data.options.transitionDuration).toEqual(newDuration);
        expect(data.options.transitionType).toEqual(newType);
      });
    });

    describe('public methods', function () {
      beforeEach(function () {
        $target.blurOverlay({
          content: $overlay
        });
      });
      describe('show()', function () {
        it('displays the overlay', function (done) {
          $target.blurOverlay('show').then(function () {
            expect($('.blur-overlay-overlay').css('opacity')).toBe('1');
            done();
          });
        });
      });

      describe('hide()', function () {
        it('hides the overlay', function (done) {
          $target.blurOverlay('show').then(function () {
            $target.blurOverlay('hide').then(function () {
              expect($('.blur-overlay-overlay').css('opacity')).toBe('0');
              done();
            });
          });
        });
      });

      describe('content()', function () {
        var newContent;
        var content;

        it('changes the content of the overlay (jQuery selector)', function () {
          newContent = $('<h1>').text('LOL');
          content = $('.blur-overlay-content').children().first();
          expect(content.html()).toEqual($overlay.html());
          $target.blurOverlay('content', newContent);
          content = $('.blur-overlay-content').children().first();
          expect(content.html()).toEqual(newContent.html());
        });

        it('changes the content of the overlay (string)', function () {
          newContent = '<h1>LOL</h1>';
          content = $('.blur-overlay-content').children().first();
          expect(content.html()).toEqual($overlay.html());
          $target.blurOverlay('content', newContent);
          content = $('.blur-overlay-content').children().first();
          expect(content[0].outerHTML).toEqual(newContent);
        });
      });

      describe('isShowing()', function () {
        it('returns true if overlay is showing', function () {
          $target.blurOverlay('show');
          expect($target.blurOverlay('isShowing')).toBe(true);
        });

        it('returns false if overlay is not showing', function () {
          expect($target.blurOverlay('isShowing')).toBe(false);
        });
      });

      // describe('destroy()', function () {
      //
      // });
    });

    describe('events', function () {
      var callOrder;
      var beforeEventSpy;
      var eventSpy;

      beforeEach(function () {
        callOrder = [];
        $target.blurOverlay({
          content: $overlay
        });
      });

      it('beforeShow and show fired on show()', function (done) {
        beforeEventSpy = jasmine.createSpy('beforeShow').and.callFake(function () {
          callOrder.push('beforeShow');
        });
        eventSpy = jasmine.createSpy('show').and.callFake(function () {
          callOrder.push('show');
        });
        $target.on('blurOverlay.beforeShow', beforeEventSpy);
        $target.on('blurOverlay.show', eventSpy);
        $target.blurOverlay('show').then(function () {
          expect(beforeEventSpy).toHaveBeenCalled();
          expect(eventSpy).toHaveBeenCalled();
          expect(callOrder[0]).toBe('beforeShow');
          expect(callOrder[1]).toBe('show');
          done();
        });
      });

      it('beforeHide and hide fired on hide()', function (done) {
        beforeEventSpy = jasmine.createSpy('beforeHide').and.callFake(function () {
          callOrder.push('beforeHide');
        });
        eventSpy = jasmine.createSpy('hide').and.callFake(function () {
          callOrder.push('hide');
        });
        $target.on('blurOverlay.beforeHide', beforeEventSpy);
        $target.on('blurOverlay.hide', eventSpy);
        $target.blurOverlay('show').then(function () {
          $target.blurOverlay('hide').then(function () {
            expect(beforeEventSpy).toHaveBeenCalled();
            expect(eventSpy).toHaveBeenCalled();
            expect(callOrder[0]).toBe('beforeHide');
            expect(callOrder[1]).toBe('hide');
            done();
          });
        });
      });
    });
  });
}(window, jQuery));
