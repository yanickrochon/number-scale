
describe('Test Number Scale', function () {

  var numberScale = require('../lib/number-scale');


  describe('with SI (default)', function () {

    var options = {
      scale: 'SI'
    };

    it('should handle zero', function () {
      numberScale(0).should.equal('0');
      numberScale(0, options).should.equal('0');
    });

    it('should handle one', function () {
      numberScale(1).should.equal('1');
      numberScale(1, options).should.equal('1');
    });

    it('should handle positive values', function () {
      numberScale(0.123456).should.equal('123.46m');
      numberScale(0.123456, options).should.equal('123.46m');

      numberScale(0.0123456).should.equal('12.35m');
      numberScale(0.0123456, options).should.equal('12.35m');

      numberScale(0.00123456).should.equal('1.24m');
      numberScale(0.00123456, options).should.equal('1.24m');

      numberScale(0.000000000123456).should.equal('123.46p');
      numberScale(0.000000000123456, options).should.equal('123.46p');

      numberScale(123.456789).should.equal('123.46');
      numberScale(123.456789, options).should.equal('123.46');

      numberScale(12345678).should.equal('12.35M');
      numberScale(12345678, options).should.equal('12.35M');

      numberScale(123456789).should.equal('123.46M');
      numberScale(123456789, options).should.equal('123.46M');

      numberScale(1234567890).should.equal('1.24G');
      numberScale(1234567890, options).should.equal('1.24G');

      numberScale(1234567890123456).should.equal('1.24P');
      numberScale(1234567890123456, options).should.equal('1.24P');
    });

    it('should handle negative values', function () {
      numberScale(-0.123456).should.equal('-123.45m');
      numberScale(-0.123456, options).should.equal('-123.45m');

      numberScale(-0.0123456).should.equal('-12.34m');
      numberScale(-0.0123456, options).should.equal('-12.34m');

      numberScale(-0.00123456).should.equal('-1.23m');
      numberScale(-0.00123456, options).should.equal('-1.23m');

      numberScale(-0.000000000123456).should.equal('-123.45p');
      numberScale(-0.000000000123456, options).should.equal('-123.45p');

      numberScale(-123.456789).should.equal('-123.45');
      numberScale(-123.456789, options).should.equal('-123.45');

      numberScale(-12345678).should.equal('-12.34M');
      numberScale(-12345678, options).should.equal('-12.34M');

      numberScale(-123456789).should.equal('-123.45M');
      numberScale(-123456789, options).should.equal('-123.45M');

      numberScale(-1234567890).should.equal('-1.23G');
      numberScale(-1234567890, options).should.equal('-1.23G');

      numberScale(-1234567890123456).should.equal('-1.23P');
      numberScale(-1234567890123456, options).should.equal('-1.23P');
    });

    it('should handle recursion', function () {
      numberScale(123456789.0123456789, {
        scale: 'SI',
        recursive: 4
      }).should.eql([ '123M', '456k', '789', '12m', '345.68µ' ]);

      numberScale(-123456789.0123456789, {
        scale: 'SI',
        recursive: 4
      }).should.eql([ '-123M', '-456k', '-789', '-12m', '-345.67µ' ]);
    });

    it('should parse numbers', function () {
      numberScale.parse('0').should.equal(0);
      numberScale.parse('0', options).should.equal(0);

      numberScale.parse('1').should.equal(1);
      numberScale.parse('1', options).should.equal(1);

      numberScale.parse('-123.45p').should.approximately(-0.000000000123456, 1e-14);
      numberScale.parse('-123.45p', options).should.approximately(-0.000000000123456, 1e-14);

      numberScale.parse('-123.45M').should.equal(-123450000);
      numberScale.parse('-123.45M', options).should.equal(-123450000);

      numberScale.parse([ '123M', '456k', '789', '12m', '345.68µ' ]).should.equal(123456789.0123456789);
      numberScale.parse([ '123M', '456k', '789', '12m', '345.68µ' ], options).should.equal(123456789.0123456789);

      numberScale.parse([ '-123M', '-456k', '-789', '-12m', '-345.67µ' ]).should.equal(-123456789.0123456789);
      numberScale.parse([ '-123M', '-456k', '-789', '-12m', '-345.67µ' ], options).should.equal(-123456789.0123456789);

      /*jshint -W030 */
      numberScale.parse('A123Q').should.be.NaN;
    });

  });


  describe('with time', function () {

    var options = {
      scale: 'time'
    };

    it('should handle zero', function () {
      numberScale(0, options).should.equal('0s');
    });

    it('should handle one', function () {
      numberScale(1, options).should.equal('1s');
    });

    it('should handle positive values', function () {
      numberScale(0.00000123456, options).should.equal('1234.56ns');
      numberScale(0.123456, options).should.equal('123.46ms');

      numberScale(30, options).should.equal('30s');
      numberScale(30.123, options).should.equal('30.13s');
      numberScale(60, options).should.equal('1m');
      numberScale(120, options).should.equal('2m');
      numberScale(150, options).should.equal('2.50m');
      numberScale(150.123, options).should.equal('2.51m');

      numberScale(1234567890.123456, options).should.equal('14288.99d');
    });

    it('should handle negative values', function () {
      numberScale(-0.00000123456, options).should.equal('-1234.56ns');
      numberScale(-0.123456, options).should.equal('-123.45ms');

      numberScale(-30, options).should.equal('-30s');
      numberScale(-30.123, options).should.equal('-30.12s');
      numberScale(-60, options).should.equal('-1m');
      numberScale(-120, options).should.equal('-2m');
      numberScale(-150, options).should.equal('-2.50m');
      numberScale(-150.123, options).should.equal('-2.50m');

      numberScale(-1234567890.123456, options).should.equal('-14288.98d');
    });

    it('should handle recursion', function () {
      numberScale(123456789.0123456789, {
        scale: 'time',
        recursive: 5
      }).should.eql([ '1428d', '21h', '33m', '9s', '12ms', '345671.66ns' ]);

      numberScale(-123456789.0123456789, {
        scale: 'time',
        recursive: 5
      }).should.eql([ '-1428d', '-21h', '-33m', '-9s', '-12ms', '-345671.65ns' ]);
    });

    it('should parse numbers', function () {
      var options = {
        scale: 'time'
      };

      numberScale.parse([ '1428d', '21h', '33m', '9s', '12ms', '345671.66ns' ], options).should.equal(123456789.0123456789);
    });

  });


  describe('with IEEE-1541', function () {

   var options = {
      scale: 'IEEE1541'
    };

    it('should handle zero', function () {
      numberScale(0).should.equal('0');
      numberScale(0, options).should.equal('0');
    });

    it('should handle one', function () {
      numberScale(1).should.equal('1');
      numberScale(1, options).should.equal('1');
    });

    it('should handle positive values', function () {
      numberScale(0.123456, options).should.equal('0.13');
      numberScale(0.0123456, options).should.equal('0.02');
      numberScale(0.00123456, options).should.equal('0.01');
      numberScale(0.000000000123456, options).should.equal('0.01');

      numberScale(123.456789, options).should.equal('123.46');
      numberScale(12345678, options).should.equal('12.35Mi');
      numberScale(123456789, options).should.equal('123.46Mi');
      numberScale(1234567890, options).should.equal('1.24Gi');

      numberScale(1234567890123456, options).should.equal('1.24Pi');
    });

    it('should handle negative values', function () {
      numberScale(-0.123456, options).should.equal('-0.12');
      numberScale(-0.0123456, options).should.equal('-0.01');
      numberScale(-0.00123456, options).should.equal('0');
      numberScale(-0.000000000123456, options).should.equal('0');

      numberScale(-123.456789, options).should.equal('-123.45');
      numberScale(-12345678, options).should.equal('-12.34Mi');
      numberScale(-123456789, options).should.equal('-123.45Mi');
      numberScale(-1234567890, options).should.equal('-1.23Gi');

      numberScale(-1234567890123456, options).should.equal('-1.23Pi');
    });

    it('should handle recursion', function () {
      numberScale(123456789.0123456789, {
        scale: 'IEEE1541',
        recursive: 4
      }).should.eql([ '123Mi', '456Ki', '789' ]);

      numberScale(-123456789.0123456789, {
        scale: 'IEEE1541',
        recursive: 4
      }).should.eql([ '-123Mi', '-456Ki', '-789' ]);
    });

  });

  describe('Test rounding', function () {

    it('should round half up', function () {
      var testCandidates = {
        '-123.7890': ['-123', '-123.7', '-123.78', '-123.789', '-123.7890'],
        '-0.123456789': ['0', '-0.1', '-0.12', '-0.123', '-0.1234', '-0.12345'],
        '0.123456789': ['1', '0.2', '0.13', '0.124', '0.1235', '0.12346'],
        '123.7890': ['124', '123.8', '123.79', '123.789', '123.7890']
      };

      Object.keys(testCandidates).forEach(function (real) {
        testCandidates[real].forEach(function (integer, precision) {
          numberScale(real, {
            scale: 'IEEE1541',  // no fraction
            roundMode: 'up',
            precision: precision
          }).should.eql(integer);
        });
      });
    });

    it('should round half down', function () {
      var testCandidates = {
        '-123.7890': ['-124', '-123.8', '-123.79', '-123.789', '-123.7890'],
        '-0.123456789': ['-1', '-0.2', '-0.13', '-0.124', '-0.1235', '-0.12346'],
        '0.123456789': ['0', '0.1', '0.12', '0.123', '0.1234', '0.12345'],
        '123.7890': ['123', '123.7', '123.78', '123.789', '123.7890']
      };

      Object.keys(testCandidates).forEach(function (real) {
        testCandidates[real].forEach(function (integer, precision) {
          numberScale(real, {
            scale: 'IEEE1541',  // no fraction
            roundMode: 'down',
            precision: precision
          }).should.eql(integer);
        });
      });
    });

    it('should round half odd', function () {
      var testCandidates = {
        '-123.7890': ['-123', '-123.7', '-123.77', '-123.789', '-123.7889'],
        '-0.123456789': ['-1', '-0.1', '-0.11', '-0.123', '-0.1233', '-0.12345'],
        '0.123456789': ['1', '0.1', '0.13', '0.123', '0.1235', '0.12345'],
        '123.7890': ['123', '123.7', '123.79', '123.789', '123.7891']
      };

      Object.keys(testCandidates).forEach(function (real) {
        testCandidates[real].forEach(function (integer, precision) {
          numberScale(real, {
            scale: 'IEEE1541',  // no fraction
            roundMode: 'odd',
            precision: precision
          }).should.eql(integer);
        });
      });
    });

    it('should round half even', function () {
      var testCandidates = {
        '-123.7890': ['-122', '-123.6', '-123.78', '-123.788', '-123.7890'],
        '-0.123456789': ['0', '0', '-0.12', '-0.122', '-0.1234', '-0.12344'],
        '0.123456789': ['0', '0.2', '0.12', '0.124', '0.1234', '0.12346'],
        '123.7890': ['124', '123.8', '123.78', '123.790', '123.7890']
      };

      Object.keys(testCandidates).forEach(function (real) {
        testCandidates[real].forEach(function (integer, precision) {
          numberScale(real, {
            scale: 'IEEE1541',  // no fraction
            roundMode: 'even',
            precision: precision
          }).should.eql(integer);
        });
      });
    });

    it('should round half', function () {
      var testCandidates = {
        '-123.7890': ['-124', '-123.8', '-123.79', '-123.789', '-123.7890'],
        '-0.123456789': ['0', '-0.1', '-0.12', '-0.123', '-0.1235', '-0.12346'],
        '0.123456789': ['0', '0.1', '0.12', '0.123', '0.1235', '0.12346'],
        '123.7890': ['124', '123.8', '123.79', '123.789', '123.7890']
      };

      Object.keys(testCandidates).forEach(function (real) {
        testCandidates[real].forEach(function (integer, precision) {
          numberScale(real, {
            scale: 'IEEE1541',  // no fraction
            roundMode: '',
            precision: precision
          }).should.eql(integer);
        });
      });
    });

  });


  describe('Test custom scale', function () {

    var customScaleName = 'testScale';
    var customScale = {
      'c': 0.005,
      'b': 0.01,
      'a': 0.6,
      '*': 1,
      'A': 500,
      'B': 1000,
      'C': 5000
    };
    var customScaleBase = 1;
    var options = {
      scale: customScaleName
    };

    before(function () {
      numberScale.defineScale(customScaleName, customScale, customScaleBase);
    });

    it('should format with custom scale', function () {
      numberScale(0, options).should.equal('0*');
      numberScale(1, options).should.equal('1*');

      numberScale(0.000001, options).should.equal('0.01c');
      numberScale(0.001, options).should.equal('0.20c');
      numberScale(0.005, options).should.equal('1c');

      numberScale(0.05, options).should.equal('5b');
      numberScale(0.5, options).should.equal('50b');
      numberScale(0.6, options).should.equal('1a');

      numberScale(499, options).should.equal('499*');
      numberScale(501, options).should.equal('1.01A');
    });

    it('should format with custom scale recursively', function () {
      options.recursive = 8;

      numberScale(123456789.987654321, options).should.eql(['24691C','1B','1A','289*','1a','38b','1c']);

      delete options.recursive;
    });

    it('should parse with custom scale', function () {
      numberScale.parse(['24691C','1B','1A','289*','1a','38b','1c'], options).should.approximately(123456789.98, 0.005);
    });

  });

});