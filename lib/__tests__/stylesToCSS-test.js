'use strict';

jest.autoMockOff();

describe('stylesToCSS', function() {

  it('should ignore pseudo classes', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        backgroundColor: 'orange',
        ':not(something': {
          color: 'green'
        },
        ':hover': {
          color: 'orange'
        }
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf(':not(')).toBe(-1);
    expect(compiled.css.indexOf(':hover')).toBe(-1);
  });

  it('should warn when using pseudo classes', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        backgroundColor: 'orange',
        ':hover': {
          color: 'green'
        }
      }
    };
    var _msg = '';
    var originalConsoleWarn = console.warn;
    console.warn = function(msg) {
      _msg = msg;
    };
    stylesToCSS(fooStyle, 10);
    expect(_msg).toBe('You are trying to use pseudo class :hover, which we ' +
                      'don\'t support as this is better implemented using ' +
                      'JavaScript.');
    console.warn = originalConsoleWarn;
  });

  it('should not add style without a className', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {

    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toEqual('');
  });

  it('should not add a style if it\'s already present', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        backgroundColor: 'orange'
      }
    };
    var fooStyle2 = {
      className: 'yolo',
      style: {
        backgroundColor: 'orange'
      }
    };

    var oneStyle = stylesToCSS(fooStyle, 10);
    var doubleStyle = stylesToCSS([fooStyle, fooStyle2], 10);

    expect(oneStyle.css).toEqual(doubleStyle.css);
  });

  it('should replicate the selector', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        backgroundColor: 'purple'
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    var replicatedSelector = compiled.css.split(' {')[0].split(',');
    var selector = '.yolo';
    for (var i = 0, l = replicatedSelector.length; i < l; i++) {
      if(i > 0) {
        selector += '.yolo' + i;
      }
      expect(selector).toEqual(replicatedSelector[i]);
    }
  });

  it('compiles numbers into px literals', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        top: 0
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.yolo1',
    '.yolo.yolo1.yolo2',
    '.yolo.yolo1.yolo2.yolo3',
    '.yolo.yolo1.yolo2.yolo3.yolo4',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
    ].join(',') + ' {',
    '  top: 0px;',
    '}',
    ''
    ].join('\n'));
  });

  it('should not add px to unitless numbers', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        zIndex: 4
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('z-index: 4;')).toBeGreaterThan(0);
  });

  it('compiles styles', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        color: 'red'
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.yolo1',
    '.yolo.yolo1.yolo2',
    '.yolo.yolo1.yolo2.yolo3',
    '.yolo.yolo1.yolo2.yolo3.yolo4',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
    ].join(',') + ' {',
    '  color: red;',
    '}',
    ''
    ].join('\n'));
  });

  it('replicates with the duplicate style key', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        color: ['red', 'white']
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.yolo1',
    '.yolo.yolo1.yolo2',
    '.yolo.yolo1.yolo2.yolo3',
    '.yolo.yolo1.yolo2.yolo3.yolo4',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
    ].join(',') + ' {',
    '  color: red;',
    '  color: white;',
    '}',
    ''
    ].join('\n'));
  });

  it('should quote content value', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        content: "hello"
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('content: \'hello\';')).toBeGreaterThan(0);
  });

  it('should escape quoted content value', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        content: "''"
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('content: \'\\\'\\\'\';')).toBeGreaterThan(0);
  });

  it('should not quote valid content values', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        content: 'url(boo) attr(data-foo) open-quote'
      }
    };
    var compiled = stylesToCSS(fooStyle, 10);
    expect(compiled.css.indexOf('content: url(boo) attr(data-foo) open-quote;')).toBeGreaterThan(0);
  });
});
