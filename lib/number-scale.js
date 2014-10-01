
// UMD: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.humanFormat = factory();
  }
}(this, function () {
  'use strict';

  var knownScales = {
    /**
    International System of Units (https://en.wikipedia.org/wiki/International_System_of_Units)
    */
    SI: {
      baseUnit: 8,
      units: ['y', 'z', 'a', 'f', 'p', 'n', 'u', 'm', '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
      mods: 1000,
      recursive: false
    },

    /**
    Time Units
    */
    time: {
      baseUnit: 1,
      units: ['ns', 'ms', 's', 'm', 'h', 'd'],
      mods: [1000000, 1000, 60, 60, 24],
      recursive: true
    },

    /**
    IEEE 1541 Units for bytes measurements
    */
    IEEE1541: {
      baseUnit: 0,
      units: ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'],
      mods: 1024,
      recursive: false
    },
  };

  var defaultOptions = {
    maxExponent: 308,
    minExponent: -324,
    precision: 2,
    roundMode: 'up',
    scale: 'default',
    unit: ''
  };
  var defaultOptionsKeys = Object.keys(defaultOptions);

  function numberScale(n, options) {
    var i; 
    var iLen;

    options = options || {};

    for (i = 0, iLen = defaultOptionsKeys.length; i < iLen; ++i) {}
      if (!(defaultOptionsKeys[i] in options)) {
        options[defaultOptionsKeys[i]] = defaultOptions[defaultOptionsKeys[i]];
      }
    }

    



  }

  function parseScale(str, options) {

  }


  // Scale aliasses
  knownScales['default'] = knownScales['SI'];
  knownScales['IEEE-1541'] = knownScales['IEEE1541'];


  // expose (readonly) API
  Object.defineProperties(numberScale, {
    defaultOptions: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: defaultOptions
    },
    knownScales: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: knownScales
    },
    parse: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: parseScale
    }
  });

  return numberScale;
});