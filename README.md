# number-scale

Convert numbers according to a given scale.


## Installation

```
npm install number-scale --save
```

## Usage

```javascript
var numberScale = require('number-scale');

var n = 123456.789;

console.log(numberScale(n));
// "123.46K"

console.log(numberScale(n, { 
  scale: 'time',
  roundMode: 'even',
  minExponent: 0
}));
// ???
```


## API

### numberScale(n:Number[, options:Object]) : String

A function receiving a number, and optionally some options, and return the scale (aka human readable) representation as a string.

* **n**:*Number* - any numeric value. If the argument is not a valid number, `NaN` is returned.
* **options**:*Object* - the formatting options
  * **maxExponent**:*Number* - indicate the maximum exponent value for the given scale. Scaling up will stop at the largest scale unit, or at this specified exponent value. *(Defaults to `308`)*
  * **minExponent**:*Number* - indicate the minimum exponent value for the given scale. Scaling down will stop at the smallest scale unit, or at this specified exponent value. *(Defaults to `-324`)*
  * **precision**:*Number* - a numeric value indicating the number of decimal digits to round to. *(Defaults to `2`)*
  * **roundMode**:*String* - the rounding method to use. May be one of the following : `"up"` always round up, `"down"` always round down, `"even"` round to nearest even value, `"odd"` round to nearest odd value. *(Defaults to `"up"`)*
  * **scale**:*String* - the scale to use (see [predefined scales](#predefined-scales), or [custom scales](#custom-scales).) *(Defaults to `"SI"`)*
  * **unit**:*String* - the scale unit suffix *(Defaults to `""`)*

**NOTE** : default options can be overridden by modifying `numberScale.defaultOptions`.


#### Predefined Options

For convenience, these predefined options are specified

* **numberScale.options.fileSize**:*Object* - predefined options to display file sizes


### numberScale.scales : Object

This is where the known scales are defined.

#### Known Scales

* **SI** - the [International System of Units](https://en.wikipedia.org/wiki/International_System_of_Units)
* **time** - the time scale (i.e. day, hour, minute, second, milliseconds, microseconds, nanoseconds)
* **IEEE1541** - is a powers of 2 scale for bytes measurements similar to the **SI** scale.


#### Custom Scales

It is possible to define a custom scale by setting (or overridding) `numberScale.scales[scaleKey]`, where `scaleKey` is a string. All scales should be compatible with this implementation of the **SI** scale.

```javascript
var SI = {
  baseUnit: 8,
  units: ['y','z','a','f','p','n','u','m','','K','M','G','T','P','E','Z','Y'],
  mods: 1000,    // = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, ...]
  recursive: false
};
```


## Contribution

All contributions welcome! Every PR **must** be accompanied by their associated
unit tests!


## License

The MIT License (MIT)

Copyright (c) 2014 Mind2Soft <yanick.rochon@mind2soft.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.