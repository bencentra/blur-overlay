(function (window, $) {
  jasmine.getFixtures().fixturesPath = 'base/spec/fixtures';

  describe('Blur Overlay plugin', function () {
    var $target;
    var $overlay;

    beforeEach(function () {
      $('body').append(readFixtures('page.html'));
      $target = $('#target');
      $overlay = $(readFixtures('overlay.html'));
    });

    afterEach(function () {
      $target.remove();
    });

    it('is defined', function () {
      expect($.fn.blurOverlay).toBeDefined();
    });

    it('is a function', function () {
      expect(typeof $.fn.blurOverlay).toBe('function');
    });

    describe('constructor', function () {
      var data;

      beforeEach(function () {
        data = null;
      });

      afterEach(function () {
        $target.blurOverlay('destroy');
      });

      it('initializes the plugin with defaults', function () {
        $target.blurOverlay();
        data = $target.data('custom-blurOverlay');
        expect(data).toBeDefined();
        expect(data.options).toEqual(jasmine.objectContaining({
          content: jasmine.any(String),
          autoShow: false,
          blurAmount: '12px'
        }));
        expect($target.blurOverlay('isShowing')).toBe(false);
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
        expect($target.blurOverlay('isShowing')).toBe(true);
      });
    });

    describe('public methods', function () {

      beforeEach(function() {
        $target.blurOverlay({
          content: $overlay
        });
      });

      afterEach(function() {
        $target.blurOverlay('destroy');
      });

      describe('show()', function () {

        it('displays the overlay', function () {

        });

      });

      describe('hide()', function () {

      });

      describe('content()', function () {

      });

      describe('isShowing()', function () {

      });

      describe('destroy()', function () {

      });

    });

    describe('events', function () {

    });
  });
}(window, jQuery));
