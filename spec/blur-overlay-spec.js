const targetFixture = `<div id="target">
                           <p>Lorem ipsum dolor sit amet and the rest.</p>
                           <button type="button" id="openButton">Open Me</button>
                           <div class="mask-me" style="background-color:blue;width:300px;height:300px;"></div>
                         </div>`;
const overlayFixture = `<div id="overlay">
                          <h1>This is a pretty blurry overlay, I bet!</h1>
                          <p>Lorem ipsum dolor sit amet and the rest.</p>
                          <button type="button" id="closeButton">Close Me</button>
                        </div>`;

describe('Blur Overlay plugin', () => {
  let $target;
  let $overlay;
  let data;

  beforeEach(() => {
    $target = $(targetFixture).appendTo('body');
    $overlay = $(overlayFixture);
    data = null;
  });

  afterEach(() => {
    $target.remove();
    $overlay.remove();
    $('.blur-overlay-wrapper').remove();
    $('.blur-overlay-overlay').remove();
  });

  it('is defined', () => {
    expect($.fn.blurOverlay).toBeDefined();
  });

  it('is a function', () => {
    expect(typeof $.fn.blurOverlay).toBe('function');
  });

  describe('constructor', () => {
    it('initializes the plugin with defaults', () => {
      $target.blurOverlay();
      data = $target.data('custom-blurOverlay');
      expect(data).toBeDefined();
      expect(data.options).toEqual(jasmine.objectContaining({
        content: jasmine.any(String),
        autoShow: false,
        blurAmount: '12px',
        masks: [],
        noFilter: false,
        transitionDuration: '333ms',
        transitionType: 'ease-in-out',
        zIndex: 1000,
      }));
    });

    it('initializes the plugin with custom content', () => {
      $target.blurOverlay({
        content: $overlay,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.content).toEqual($overlay);
    });

    it('initializes the plugin with custom blur amount', () => {
      const newBlur = '8px';
      $target.blurOverlay({
        blurAmount: newBlur,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.blurAmount).toEqual(newBlur);
    });

    it('initializes the plugin and shows the overlay', () => {
      $target.blurOverlay({
        autoShow: true,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.autoShow).toEqual(true);
    });

    it('initializes the plugin with custom transition settings', () => {
      const newDuration = '1s';
      const newType = 'linear';
      $target.blurOverlay({
        transitionDuration: newDuration,
        transitionType: newType,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.transitionDuration).toEqual(newDuration);
      expect(data.options.transitionType).toEqual(newType);
    });

    it('initializes the plugin with custom background settings', () => {
      const newBackground = 'rgba(100, 200, 150, .5)';
      $target.blurOverlay({
        backgroundColor: newBackground,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.backgroundColor).toEqual(newBackground);
    });

    it('initializes the plugin with a content mask', () => {
      const masks = [{
        selector: '.mask-me',
        color: 'rgb(255, 0, 0)',
        opacity: '0.5',
      }];
      $target.blurOverlay({
        masks,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.masks).toEqual(masks);
    });

    it('initializes the plugin without the blur filter', () => {
      const noFilter = true;
      $target.blurOverlay({
        noFilter,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.noFilter).toEqual(noFilter);
    });

    it('initializes the plugin without the blur filter (as a function)', () => {
      const noFilter = () => true;
      $target.blurOverlay({
        noFilter,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.noFilter).toEqual(noFilter);
    });

    it('initializes the plugin with a custom z-index', () => {
      const zIndex = 3333;
      $target.blurOverlay({
        zIndex,
      });
      data = $target.data('custom-blurOverlay');
      expect(data.options.zIndex).toEqual(zIndex);
    });

    it('appends the appropriate elements to the DOM', () => {
      $target.blurOverlay({
        content: $overlay,
      });
      expect($('.blur-overlay-wrapper').length).toBe(0);
      expect($('.blur-overlay-overlay').length).toBe(1);
      expect($('.blur-overlay-content').length).toBe(1);
    });
  });

  describe('public methods', () => {
    beforeEach(() => {
      $target.blurOverlay({
        content: $overlay,
      });
    });

    describe('show()', () => {
      it('displays the overlay', done => {
        $target.blurOverlay('show').then(() => {
          expect($('.blur-overlay-overlay').css('opacity')).toBe('1');
          done();
        });
      });

      it('does not try to show again if already showing', done => {
        data = $target.data('custom-blurOverlay');
        spyOn(data, '_beforeShow').and.callThrough();
        $target.blurOverlay('show').then(result => {
          expect(data._beforeShow.calls.count()).toBe(1);
          expect(result).toBe(true);
          $target.blurOverlay('show').then(result2 => {
            expect(data._beforeShow.calls.count()).toBe(1);
            expect(result2).toBe(false);
          });
          done();
        });
      });
    });

    describe('hide()', () => {
      it('hides the overlay', done => {
        $target.blurOverlay('show').then(() => {
          $target.blurOverlay('hide').then(() => {
            expect($('.blur-overlay-overlay').css('opacity')).toBe('0');
            done();
          });
        });
      });

      it('does not try to hide again if already hiding', done => {
        data = $target.data('custom-blurOverlay');
        spyOn(data, '_beforeHide').and.callThrough();
        $target.blurOverlay('show').then(() => {
          $target.blurOverlay('hide').then(result => {
            expect(data._beforeHide.calls.count()).toBe(1);
            expect(result).toBe(true);
            $target.blurOverlay('hide').then(result2 => {
              expect(data._beforeHide.calls.count()).toBe(1);
              expect(result2).toBe(false);
            });
            done();
          });
        });
      });
    });

    describe('content()', () => {
      let newContent;
      let content;

      it('changes the content of the overlay (jQuery selector)', () => {
        newContent = $('<h1>').text('LOL');
        content = $('.blur-overlay-content').children().first();
        expect(content.html()).toEqual($overlay.html());
        $target.blurOverlay('content', newContent);
        content = $('.blur-overlay-content').children().first();
        expect(content.html()).toEqual(newContent.html());
      });

      it('changes the content of the overlay (string)', () => {
        newContent = '<h1>LOL</h1>';
        content = $('.blur-overlay-content').children().first();
        expect(content.html()).toEqual($overlay.html());
        $target.blurOverlay('content', newContent);
        content = $('.blur-overlay-content').children().first();
        expect(content[0].outerHTML).toEqual(newContent);
      });

      it('changes the content of the overlay (function)', () => {
        const expectedHtml = '<h1>LOL</h1>';
        newContent = () => expectedHtml;
        content = $('.blur-overlay-content').children().first();
        expect(content.html()).toEqual($overlay.html());
        $target.blurOverlay('content', newContent);
        content = $('.blur-overlay-content').children().first();
        expect(content[0].outerHTML).toEqual(expectedHtml);
      });
    });

    describe('isShowing()', () => {
      it('returns true if overlay is showing', () => {
        $target.blurOverlay('show');
        expect($target.blurOverlay('isShowing')).toBe(true);
      });

      it('returns false if overlay is not showing', () => {
        expect($target.blurOverlay('isShowing')).toBe(false);
      });
    });

    describe('destroy()', () => {
      it('destroys the plugin and cleans up the DOM', () => {
        $target.blurOverlay('destroy');
        expect($target.data('custom-blurOverlay')).not.toBeDefined();
        expect($('.blur-overlay-wrapper').length).toBe(0);
        expect($('.blur-overlay-overlay').length).toBe(0);
      });
    });
  });

  describe('with masks', () => {
    describe('public methods', () => {
      const masks = [{
        selector: '.mask-me',
        color: 'rgb(255, 0, 0)',
        opacity: '0.5',
      }];

      beforeEach(() => {
        $target.blurOverlay({
          content: $overlay,
          masks,
        });
      });

      describe('show()', () => {
        it('displays the overlay and masks the specified content', done => {
          $target.blurOverlay('show').then(() => {
            expect($('.blur-overlay-mask').length).toBe(1);
            expect($('.mask-me').next().attr('class')).toBe('blur-overlay-mask');
            expect($('.blur-overlay-mask').css('opacity')).toEqual(masks[0].opacity);
            expect($('.blur-overlay-mask').css('background-color')).toEqual(masks[0].color);
            done();
          });
        });
      });

      describe('hide()', () => {
        it('hides the overlay and removes the masks', done => {
          $target.blurOverlay('show').then(() => {
            $target.blurOverlay('hide').then(() => {
              expect($('.blur-overlay-mask').length).toBe(0);
              expect($('.mask-me').next().attr('class')).not.toBe('blur-overlay-mask');
              done();
            });
          });
        });
      });

      describe('destroy()', () => {
        it('destroys the plugin and cleans up the DOM', done => {
          $target.blurOverlay('show').then(() => {
            expect($('.blur-overlay-mask').length).toBe(1);
            $target.blurOverlay('destroy');
            expect($target.data('custom-blurOverlay')).not.toBeDefined();
            expect($('.blur-overlay-wrapper').length).toBe(0);
            expect($('.blur-overlay-overlay').length).toBe(0);
            expect($('.blur-overlay-mask').length).toBe(0);
            done();
          });
        });
      });
    });
  });

  describe('with no filter', () => {
    describe('public methods', () => {
      beforeEach(() => {
        $target.blurOverlay({
          content: $overlay,
          noFilter: true,
        });
      });

      describe('show()', () => {
        it('displays the overlay but does not create a wrapper', done => {
          $target.blurOverlay('show').then(() => {
            expect($('.blur-overlay-wrapper').length).toBe(0);
            done();
          });
        });
      });
    });

    describe('(as a function)', () => {
      beforeEach(() => {
        $target.blurOverlay({
          content: $overlay,
          noFilter: () => true,
        });
      });

      describe('show()', () => {
        it('displays the overlay but does not create a wrapper', done => {
          $target.blurOverlay('show').then(() => {
            expect($('.blur-overlay-wrapper').length).toBe(0);
            done();
          });
        });
      });
    });
  });

  describe('events', () => {
    let callOrder;
    let beforeEventSpy;
    let eventSpy;

    beforeEach(() => {
      callOrder = [];
      $target.blurOverlay({
        content: $overlay,
      });
    });

    it('beforeShow and show fired on show()', done => {
      beforeEventSpy = jasmine.createSpy('beforeShow').and.callFake(() => {
        callOrder.push('beforeShow');
      });
      eventSpy = jasmine.createSpy('show').and.callFake(() => {
        callOrder.push('show');
      });
      $target.on('blurOverlay.beforeShow', beforeEventSpy);
      $target.on('blurOverlay.show', eventSpy);
      $target.blurOverlay('show').then(() => {
        expect(beforeEventSpy).toHaveBeenCalled();
        expect(eventSpy).toHaveBeenCalled();
        expect(callOrder[0]).toBe('beforeShow');
        expect(callOrder[1]).toBe('show');
        done();
      });
    });

    it('beforeHide and hide fired on hide()', done => {
      beforeEventSpy = jasmine.createSpy('beforeHide').and.callFake(() => {
        callOrder.push('beforeHide');
      });
      eventSpy = jasmine.createSpy('hide').and.callFake(() => {
        callOrder.push('hide');
      });
      $target.on('blurOverlay.beforeHide', beforeEventSpy);
      $target.on('blurOverlay.hide', eventSpy);
      $target.blurOverlay('show').then(() => {
        $target.blurOverlay('hide').then(() => {
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
