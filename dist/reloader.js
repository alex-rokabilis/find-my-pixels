/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/nwjs-webpack-plugin/reloader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ansi-to-html/lib/ansi_to_html.js":
/*!*******************************************************!*\
  !*** ./node_modules/ansi-to-html/lib/ansi_to_html.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var entities = __webpack_require__(/*! entities */ "./node_modules/entities/index.js");
var defaults = {
    fg: '#FFF',
    bg: '#000',
    newline: false,
    escapeXML: false,
    stream: false,
    colors: getDefaultColors()
};

function getDefaultColors() {
    var colors = {
        0: '#000',
        1: '#A00',
        2: '#0A0',
        3: '#A50',
        4: '#00A',
        5: '#A0A',
        6: '#0AA',
        7: '#AAA',
        8: '#555',
        9: '#F55',
        10: '#5F5',
        11: '#FF5',
        12: '#55F',
        13: '#F5F',
        14: '#5FF',
        15: '#FFF'
    };

    range(0, 5).forEach(function (red) {
        range(0, 5).forEach(function (green) {
            range(0, 5).forEach(function (blue) {
                return setStyleColor(red, green, blue, colors);
            });
        });
    });

    range(0, 23).forEach(function (gray) {
        var c = gray + 232;
        var l = toHexString(gray * 10 + 8);

        colors[c] = '#' + l + l + l;
    });

    return colors;
}

/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {object} colors
 */
function setStyleColor(red, green, blue, colors) {
    var c = 16 + red * 36 + green * 6 + blue;
    var r = red > 0 ? red * 40 + 55 : 0;
    var g = green > 0 ? green * 40 + 55 : 0;
    var b = blue > 0 ? blue * 40 + 55 : 0;

    colors[c] = toColorHexString([r, g, b]);
}

/**
 * Converts from a number like 15 to a hex string like 'F'
 * @param {number} num
 * @returns {string}
 */
function toHexString(num) {
    var str = num.toString(16);

    while (str.length < 2) {
        str = '0' + str;
    }

    return str;
}

/**
 * Converts from an array of numbers like [15, 15, 15] to a hex string like 'FFF'
 * @param {[red, green, blue]} ref
 * @returns {string}
 */
function toColorHexString(ref) {
    var results = [];

    for (var j = 0, len = ref.length; j < len; j++) {
        results.push(toHexString(ref[j]));
    }

    return '#' + results.join('');
}

/**
 * @param {Array} stack
 * @param {string} token
 * @param {*} data
 * @param {object} options
 */
function generateOutput(stack, token, data, options) {
    var result;

    if (token === 'text') {
        result = pushText(data, options);
    } else if (token === 'display') {
        result = handleDisplay(stack, data, options);
    } else if (token === 'xterm256') {
        result = pushForegroundColor(stack, options.colors[data]);
    } else if (token === 'rgb') {
        result = handleRgb(stack, data);
    }

    return result;
}

/**
 * @param {Array} stack
 * @param {string} data
 * @returns {*}
 */
function handleRgb(stack, data) {
    data = data.substring(2).slice(0, -1);
    var operation = +data.substr(0, 2);

    var color = data.substring(5).split(';');
    var rgb = color.map(function (value) {
        return ('0' + Number(value).toString(16)).substr(-2);
    }).join('');

    return pushStyle(stack, (operation === 38 ? 'color:#' : 'background-color:#') + rgb);
}

/**
 * @param {Array} stack
 * @param {number} code
 * @param {object} options
 * @returns {*}
 */
function handleDisplay(stack, code, options) {
    code = parseInt(code, 10);
    var result;

    var codeMap = {
        '-1': function _() {
            return '<br/>';
        },
        0: function _() {
            return stack.length && resetStyles(stack);
        },
        1: function _() {
            return pushTag(stack, 'b');
        },
        3: function _() {
            return pushTag(stack, 'i');
        },
        4: function _() {
            return pushTag(stack, 'u');
        },
        8: function _() {
            return pushStyle(stack, 'display:none');
        },
        9: function _() {
            return pushTag(stack, 'strike');
        },
        22: function _() {
            return pushStyle(stack, 'font-weight:normal');
        },
        23: function _() {
            return closeTag(stack, 'i');
        },
        24: function _() {
            return closeTag(stack, 'u');
        },
        39: function _() {
            return pushForegroundColor(stack, options.fg);
        },
        49: function _() {
            return pushBackgroundColor(stack, options.bg);
        },
        53: function _() {
            return pushStyle(stack, 'text-decoration:overline');
        }
    };

    if (codeMap[code]) {
        result = codeMap[code]();
    } else if (4 < code && code < 7) {
        result = pushTag(stack, 'blink');
    } else if (29 < code && code < 38) {
        result = pushForegroundColor(stack, options.colors[code - 30]);
    } else if (39 < code && code < 48) {
        result = pushBackgroundColor(stack, options.colors[code - 40]);
    } else if (89 < code && code < 98) {
        result = pushForegroundColor(stack, options.colors[8 + (code - 90)]);
    } else if (99 < code && code < 108) {
        result = pushBackgroundColor(stack, options.colors[8 + (code - 100)]);
    }

    return result;
}

/**
 * Clear all the styles
 * @returns {string}
 */
function resetStyles(stack) {
    var stackClone = stack.slice(0);

    stack.length = 0;

    return stackClone.reverse().map(function (tag) {
        return '</' + tag + '>';
    }).join('');
}

/**
 * Creates an array of numbers ranging from low to high
 * @param {number} low
 * @param {number} high
 * @returns {Array}
 * @example range(3, 7); // creates [3, 4, 5, 6, 7]
 */
function range(low, high) {
    var results = [];

    for (var j = low; j <= high; j++) {
        results.push(j);
    }

    return results;
}

/**
 * Returns a new function that is true if value is NOT the same category
 * @param {string} category
 * @returns {function}
 */
function notCategory(category) {
    return function (e) {
        return (category === null || e.category !== category) && category !== 'all';
    };
}

/**
 * Converts a code into an ansi token type
 * @param {number} code
 * @returns {string}
 */
function categoryForCode(code) {
    code = parseInt(code, 10);
    var result = null;

    if (code === 0) {
        result = 'all';
    } else if (code === 1) {
        result = 'bold';
    } else if (2 < code && code < 5) {
        result = 'underline';
    } else if (4 < code && code < 7) {
        result = 'blink';
    } else if (code === 8) {
        result = 'hide';
    } else if (code === 9) {
        result = 'strike';
    } else if (29 < code && code < 38 || code === 39 || 89 < code && code < 98) {
        result = 'foreground-color';
    } else if (39 < code && code < 48 || code === 49 || 99 < code && code < 108) {
        result = 'background-color';
    }

    return result;
}

/**
 * @param {string} text
 * @param {object} options
 * @returns {string}
 */
function pushText(text, options) {
    if (options.escapeXML) {
        return entities.encodeXML(text);
    }

    return text;
}

/**
 * @param {Array} stack
 * @param {string} tag
 * @param {string} [style='']
 * @returns {string}
 */
function pushTag(stack, tag, style) {
    if (!style) {
        style = '';
    }

    stack.push(tag);

    return ['<' + tag, style ? ' style="' + style + '"' : void 0, '>'].join('');
}

/**
 * @param {Array} stack
 * @param {string} style
 * @returns {string}
 */
function pushStyle(stack, style) {
    return pushTag(stack, 'span', style);
}

function pushForegroundColor(stack, color) {
    return pushTag(stack, 'span', 'color:' + color);
}

function pushBackgroundColor(stack, color) {
    return pushTag(stack, 'span', 'background-color:' + color);
}

/**
 * @param {Array} stack
 * @param {string} style
 * @returns {string}
 */
function closeTag(stack, style) {
    var last;

    if (stack.slice(-1)[0] === style) {
        last = stack.pop();
    }

    if (last) {
        return '</' + style + '>';
    }
}

/**
 * @param {string} text
 * @param {object} options
 * @param {function} callback
 * @returns {Array}
 */
function tokenize(text, options, callback) {
    var ansiMatch = false;
    var ansiHandler = 3;

    function remove() {
        return '';
    }

    function removeXterm256(m, g1) {
        callback('xterm256', g1);
        return '';
    }

    function newline(m) {
        if (options.newline) {
            callback('display', -1);
        } else {
            callback('text', m);
        }

        return '';
    }

    function ansiMess(m, g1) {
        ansiMatch = true;
        if (g1.trim().length === 0) {
            g1 = '0';
        }

        g1 = g1.trimRight(';').split(';');

        for (var o = 0, len = g1.length; o < len; o++) {
            callback('display', g1[o]);
        }

        return '';
    }

    function realText(m) {
        callback('text', m);

        return '';
    }

    function rgb(m) {
        callback('rgb', m);

        return '';
    }

    /* eslint no-control-regex:0 */
    var tokens = [{
        pattern: /^\x08+/,
        sub: remove
    }, {
        pattern: /^\x1b\[[012]?K/,
        sub: remove
    }, {
        pattern: /^\x1b\[\(B/,
        sub: remove
    }, {
        pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
        sub: rgb
    }, {
        pattern: /^\x1b\[38;5;(\d+)m/,
        sub: removeXterm256
    }, {
        pattern: /^\n/,
        sub: newline
    }, {
        pattern: /^\x1b\[((?:\d{1,3};?)+|)m/,
        sub: ansiMess
    }, {
        // CSI n J
        // ED - Erase in Display Clears part of the screen.
        // If n is 0 (or missing), clear from cursor to end of screen.
        // If n is 1, clear from cursor to beginning of the screen.
        // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
        // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
        //   (this feature was added for xterm and is supported by other terminal applications).
        pattern: /^\x1b\[\d?J/,
        sub: remove
    }, {
        // CSI n ; m f
        // HVP - Horizontal Vertical Position Same as CUP
        pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
        sub: remove
    }, {
        // catch-all for CSI sequences?
        pattern: /^\x1b\[?[\d;]{0,3}/,
        sub: remove
    }, {
        pattern: /^([^\x1b\x08\n]+)/,
        sub: realText
    }];

    function process(handler, i) {
        if (i > ansiHandler && ansiMatch) {
            return;
        }

        ansiMatch = false;

        text = text.replace(handler.pattern, handler.sub);
    }

    var handler;
    var results1 = [];
    var length = text.length;

    outer: while (length > 0) {
        for (var i = 0, o = 0, len = tokens.length; o < len; i = ++o) {
            handler = tokens[i];
            process(handler, i);

            if (text.length !== length) {
                // We matched a token and removed it from the text. We need to
                // start matching *all* tokens against the new text.
                length = text.length;
                continue outer;
            }
        }

        if (text.length === length) {
            break;
        } else {
            results1.push(0);
        }

        length = text.length;
    }

    return results1;
}

/**
 * If streaming, then the stack is "sticky"
 *
 * @param {Array} stickyStack
 * @param {string} token
 * @param {*} data
 * @returns {Array}
 */
function updateStickyStack(stickyStack, token, data) {
    if (token !== 'text') {
        stickyStack = stickyStack.filter(notCategory(categoryForCode(data)));
        stickyStack.push({ token: token, data: data, category: categoryForCode(data) });
    }

    return stickyStack;
}

function Filter(options) {
    options = options || {};

    if (options.colors) {
        options.colors = Object.assign({}, defaults.colors, options.colors);
    }

    this.opts = Object.assign({}, defaults, options);
    this.stack = [];
    this.stickyStack = [];
}

Filter.prototype = {
    toHtml: function toHtml(input) {
        var _this = this;

        input = typeof input === 'string' ? [input] : input;
        var stack = this.stack;
        var options = this.opts;
        var buf = [];

        this.stickyStack.forEach(function (element) {
            var output = generateOutput(stack, element.token, element.data, options);

            if (output) {
                buf.push(output);
            }
        });

        tokenize(input.join(''), options, function (token, data) {
            var output = generateOutput(stack, token, data, options);

            if (output) {
                buf.push(output);
            }

            if (options.stream) {
                _this.stickyStack = updateStickyStack(_this.stickyStack, token, data);
            }
        });

        if (stack.length) {
            buf.push(resetStyles(stack));
        }

        return buf.join('');
    }
};

module.exports = Filter;

/***/ }),

/***/ "./node_modules/entities/index.js":
/*!****************************************!*\
  !*** ./node_modules/entities/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var encode = __webpack_require__(/*! ./lib/encode.js */ "./node_modules/entities/lib/encode.js"),
    decode = __webpack_require__(/*! ./lib/decode.js */ "./node_modules/entities/lib/decode.js");

exports.decode = function(data, level) {
    return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
};

exports.decodeStrict = function(data, level) {
    return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
};

exports.encode = function(data, level) {
    return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
};

exports.encodeXML = encode.XML;

exports.encodeHTML4 = exports.encodeHTML5 = exports.encodeHTML = encode.HTML;

exports.decodeXML = exports.decodeXMLStrict = decode.XML;

exports.decodeHTML4 = exports.decodeHTML5 = exports.decodeHTML = decode.HTML;

exports.decodeHTML4Strict = exports.decodeHTML5Strict = exports.decodeHTMLStrict = decode.HTMLStrict;

exports.escape = encode.escape;


/***/ }),

/***/ "./node_modules/entities/lib/decode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/decode.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var entityMap = __webpack_require__(/*! ../maps/entities.json */ "./node_modules/entities/maps/entities.json"),
    legacyMap = __webpack_require__(/*! ../maps/legacy.json */ "./node_modules/entities/maps/legacy.json"),
    xmlMap = __webpack_require__(/*! ../maps/xml.json */ "./node_modules/entities/maps/xml.json"),
    decodeCodePoint = __webpack_require__(/*! ./decode_codepoint.js */ "./node_modules/entities/lib/decode_codepoint.js");

var decodeXMLStrict = getStrictDecoder(xmlMap),
    decodeHTMLStrict = getStrictDecoder(entityMap);

function getStrictDecoder(map) {
    var keys = Object.keys(map).join("|"),
        replace = getReplacer(map);

    keys += "|#[xX][\\da-fA-F]+|#\\d+";

    var re = new RegExp("&(?:" + keys + ");", "g");

    return function(str) {
        return String(str).replace(re, replace);
    };
}

var decodeHTML = (function() {
    var legacy = Object.keys(legacyMap).sort(sorter);

    var keys = Object.keys(entityMap).sort(sorter);

    for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
        } else {
            keys[i] += ";";
        }
    }

    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
        replace = getReplacer(entityMap);

    function replacer(str) {
        if (str.substr(-1) !== ";") str += ";";
        return replace(str);
    }

    //TODO consider creating a merged map
    return function(str) {
        return String(str).replace(re, replacer);
    };
})();

function sorter(a, b) {
    return a < b ? 1 : -1;
}

function getReplacer(map) {
    return function replace(str) {
        if (str.charAt(1) === "#") {
            if (str.charAt(2) === "X" || str.charAt(2) === "x") {
                return decodeCodePoint(parseInt(str.substr(3), 16));
            }
            return decodeCodePoint(parseInt(str.substr(2), 10));
        }
        return map[str.slice(1, -1)];
    };
}

module.exports = {
    XML: decodeXMLStrict,
    HTML: decodeHTML,
    HTMLStrict: decodeHTMLStrict
};


/***/ }),

/***/ "./node_modules/entities/lib/decode_codepoint.js":
/*!*******************************************************!*\
  !*** ./node_modules/entities/lib/decode_codepoint.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var decodeMap = __webpack_require__(/*! ../maps/decode.json */ "./node_modules/entities/maps/decode.json");

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }

    if (codePoint in decodeMap) {
        codePoint = decodeMap[codePoint];
    }

    var output = "";

    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }

    output += String.fromCharCode(codePoint);
    return output;
}


/***/ }),

/***/ "./node_modules/entities/lib/encode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/encode.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var inverseXML = getInverseObj(__webpack_require__(/*! ../maps/xml.json */ "./node_modules/entities/maps/xml.json")),
    xmlReplacer = getInverseReplacer(inverseXML);

exports.XML = getInverse(inverseXML, xmlReplacer);

var inverseHTML = getInverseObj(__webpack_require__(/*! ../maps/entities.json */ "./node_modules/entities/maps/entities.json")),
    htmlReplacer = getInverseReplacer(inverseHTML);

exports.HTML = getInverse(inverseHTML, htmlReplacer);

function getInverseObj(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function(inverse, name) {
            inverse[obj[name]] = "&" + name + ";";
            return inverse;
        }, {});
}

function getInverseReplacer(inverse) {
    var single = [],
        multiple = [];

    Object.keys(inverse).forEach(function(k) {
        if (k.length === 1) {
            single.push("\\" + k);
        } else {
            multiple.push(k);
        }
    });

    //TODO add ranges
    multiple.unshift("[" + single.join("") + "]");

    return new RegExp(multiple.join("|"), "g");
}

var re_nonASCII = /[^\0-\x7F]/g,
    re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function singleCharReplacer(c) {
    return (
        "&#x" +
        c
            .charCodeAt(0)
            .toString(16)
            .toUpperCase() +
        ";"
    );
}

function astralReplacer(c) {
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    var high = c.charCodeAt(0);
    var low = c.charCodeAt(1);
    var codePoint = (high - 0xd800) * 0x400 + low - 0xdc00 + 0x10000;
    return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re) {
    function func(name) {
        return inverse[name];
    }

    return function(data) {
        return data
            .replace(re, func)
            .replace(re_astralSymbols, astralReplacer)
            .replace(re_nonASCII, singleCharReplacer);
    };
}

var re_xmlChars = getInverseReplacer(inverseXML);

function escapeXML(data) {
    return data
        .replace(re_xmlChars, singleCharReplacer)
        .replace(re_astralSymbols, astralReplacer)
        .replace(re_nonASCII, singleCharReplacer);
}

exports.escape = escapeXML;


/***/ }),

/***/ "./node_modules/entities/maps/decode.json":
/*!************************************************!*\
  !*** ./node_modules/entities/maps/decode.json ***!
  \************************************************/
/*! exports provided: 0, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 158, 159, default */
/***/ (function(module) {

module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376};

/***/ }),

/***/ "./node_modules/entities/maps/entities.json":
/*!**************************************************!*\
  !*** ./node_modules/entities/maps/entities.json ***!
  \**************************************************/
/*! exports provided: Aacute, aacute, Abreve, abreve, ac, acd, acE, Acirc, acirc, acute, Acy, acy, AElig, aelig, af, Afr, afr, Agrave, agrave, alefsym, aleph, Alpha, alpha, Amacr, amacr, amalg, amp, AMP, andand, And, and, andd, andslope, andv, ang, ange, angle, angmsdaa, angmsdab, angmsdac, angmsdad, angmsdae, angmsdaf, angmsdag, angmsdah, angmsd, angrt, angrtvb, angrtvbd, angsph, angst, angzarr, Aogon, aogon, Aopf, aopf, apacir, ap, apE, ape, apid, apos, ApplyFunction, approx, approxeq, Aring, aring, Ascr, ascr, Assign, ast, asymp, asympeq, Atilde, atilde, Auml, auml, awconint, awint, backcong, backepsilon, backprime, backsim, backsimeq, Backslash, Barv, barvee, barwed, Barwed, barwedge, bbrk, bbrktbrk, bcong, Bcy, bcy, bdquo, becaus, because, Because, bemptyv, bepsi, bernou, Bernoullis, Beta, beta, beth, between, Bfr, bfr, bigcap, bigcirc, bigcup, bigodot, bigoplus, bigotimes, bigsqcup, bigstar, bigtriangledown, bigtriangleup, biguplus, bigvee, bigwedge, bkarow, blacklozenge, blacksquare, blacktriangle, blacktriangledown, blacktriangleleft, blacktriangleright, blank, blk12, blk14, blk34, block, bne, bnequiv, bNot, bnot, Bopf, bopf, bot, bottom, bowtie, boxbox, boxdl, boxdL, boxDl, boxDL, boxdr, boxdR, boxDr, boxDR, boxh, boxH, boxhd, boxHd, boxhD, boxHD, boxhu, boxHu, boxhU, boxHU, boxminus, boxplus, boxtimes, boxul, boxuL, boxUl, boxUL, boxur, boxuR, boxUr, boxUR, boxv, boxV, boxvh, boxvH, boxVh, boxVH, boxvl, boxvL, boxVl, boxVL, boxvr, boxvR, boxVr, boxVR, bprime, breve, Breve, brvbar, bscr, Bscr, bsemi, bsim, bsime, bsolb, bsol, bsolhsub, bull, bullet, bump, bumpE, bumpe, Bumpeq, bumpeq, Cacute, cacute, capand, capbrcup, capcap, cap, Cap, capcup, capdot, CapitalDifferentialD, caps, caret, caron, Cayleys, ccaps, Ccaron, ccaron, Ccedil, ccedil, Ccirc, ccirc, Cconint, ccups, ccupssm, Cdot, cdot, cedil, Cedilla, cemptyv, cent, centerdot, CenterDot, cfr, Cfr, CHcy, chcy, check, checkmark, Chi, chi, circ, circeq, circlearrowleft, circlearrowright, circledast, circledcirc, circleddash, CircleDot, circledR, circledS, CircleMinus, CirclePlus, CircleTimes, cir, cirE, cire, cirfnint, cirmid, cirscir, ClockwiseContourIntegral, CloseCurlyDoubleQuote, CloseCurlyQuote, clubs, clubsuit, colon, Colon, Colone, colone, coloneq, comma, commat, comp, compfn, complement, complexes, cong, congdot, Congruent, conint, Conint, ContourIntegral, copf, Copf, coprod, Coproduct, copy, COPY, copysr, CounterClockwiseContourIntegral, crarr, cross, Cross, Cscr, cscr, csub, csube, csup, csupe, ctdot, cudarrl, cudarrr, cuepr, cuesc, cularr, cularrp, cupbrcap, cupcap, CupCap, cup, Cup, cupcup, cupdot, cupor, cups, curarr, curarrm, curlyeqprec, curlyeqsucc, curlyvee, curlywedge, curren, curvearrowleft, curvearrowright, cuvee, cuwed, cwconint, cwint, cylcty, dagger, Dagger, daleth, darr, Darr, dArr, dash, Dashv, dashv, dbkarow, dblac, Dcaron, dcaron, Dcy, dcy, ddagger, ddarr, DD, dd, DDotrahd, ddotseq, deg, Del, Delta, delta, demptyv, dfisht, Dfr, dfr, dHar, dharl, dharr, DiacriticalAcute, DiacriticalDot, DiacriticalDoubleAcute, DiacriticalGrave, DiacriticalTilde, diam, diamond, Diamond, diamondsuit, diams, die, DifferentialD, digamma, disin, div, divide, divideontimes, divonx, DJcy, djcy, dlcorn, dlcrop, dollar, Dopf, dopf, Dot, dot, DotDot, doteq, doteqdot, DotEqual, dotminus, dotplus, dotsquare, doublebarwedge, DoubleContourIntegral, DoubleDot, DoubleDownArrow, DoubleLeftArrow, DoubleLeftRightArrow, DoubleLeftTee, DoubleLongLeftArrow, DoubleLongLeftRightArrow, DoubleLongRightArrow, DoubleRightArrow, DoubleRightTee, DoubleUpArrow, DoubleUpDownArrow, DoubleVerticalBar, DownArrowBar, downarrow, DownArrow, Downarrow, DownArrowUpArrow, DownBreve, downdownarrows, downharpoonleft, downharpoonright, DownLeftRightVector, DownLeftTeeVector, DownLeftVectorBar, DownLeftVector, DownRightTeeVector, DownRightVectorBar, DownRightVector, DownTeeArrow, DownTee, drbkarow, drcorn, drcrop, Dscr, dscr, DScy, dscy, dsol, Dstrok, dstrok, dtdot, dtri, dtrif, duarr, duhar, dwangle, DZcy, dzcy, dzigrarr, Eacute, eacute, easter, Ecaron, ecaron, Ecirc, ecirc, ecir, ecolon, Ecy, ecy, eDDot, Edot, edot, eDot, ee, efDot, Efr, efr, eg, Egrave, egrave, egs, egsdot, el, Element, elinters, ell, els, elsdot, Emacr, emacr, empty, emptyset, EmptySmallSquare, emptyv, EmptyVerySmallSquare, emsp13, emsp14, emsp, ENG, eng, ensp, Eogon, eogon, Eopf, eopf, epar, eparsl, eplus, epsi, Epsilon, epsilon, epsiv, eqcirc, eqcolon, eqsim, eqslantgtr, eqslantless, Equal, equals, EqualTilde, equest, Equilibrium, equiv, equivDD, eqvparsl, erarr, erDot, escr, Escr, esdot, Esim, esim, Eta, eta, ETH, eth, Euml, euml, euro, excl, exist, Exists, expectation, exponentiale, ExponentialE, fallingdotseq, Fcy, fcy, female, ffilig, fflig, ffllig, Ffr, ffr, filig, FilledSmallSquare, FilledVerySmallSquare, fjlig, flat, fllig, fltns, fnof, Fopf, fopf, forall, ForAll, fork, forkv, Fouriertrf, fpartint, frac12, frac13, frac14, frac15, frac16, frac18, frac23, frac25, frac34, frac35, frac38, frac45, frac56, frac58, frac78, frasl, frown, fscr, Fscr, gacute, Gamma, gamma, Gammad, gammad, gap, Gbreve, gbreve, Gcedil, Gcirc, gcirc, Gcy, gcy, Gdot, gdot, ge, gE, gEl, gel, geq, geqq, geqslant, gescc, ges, gesdot, gesdoto, gesdotol, gesl, gesles, Gfr, gfr, gg, Gg, ggg, gimel, GJcy, gjcy, gla, gl, glE, glj, gnap, gnapprox, gne, gnE, gneq, gneqq, gnsim, Gopf, gopf, grave, GreaterEqual, GreaterEqualLess, GreaterFullEqual, GreaterGreater, GreaterLess, GreaterSlantEqual, GreaterTilde, Gscr, gscr, gsim, gsime, gsiml, gtcc, gtcir, gt, GT, Gt, gtdot, gtlPar, gtquest, gtrapprox, gtrarr, gtrdot, gtreqless, gtreqqless, gtrless, gtrsim, gvertneqq, gvnE, Hacek, hairsp, half, hamilt, HARDcy, hardcy, harrcir, harr, hArr, harrw, Hat, hbar, Hcirc, hcirc, hearts, heartsuit, hellip, hercon, hfr, Hfr, HilbertSpace, hksearow, hkswarow, hoarr, homtht, hookleftarrow, hookrightarrow, hopf, Hopf, horbar, HorizontalLine, hscr, Hscr, hslash, Hstrok, hstrok, HumpDownHump, HumpEqual, hybull, hyphen, Iacute, iacute, ic, Icirc, icirc, Icy, icy, Idot, IEcy, iecy, iexcl, iff, ifr, Ifr, Igrave, igrave, ii, iiiint, iiint, iinfin, iiota, IJlig, ijlig, Imacr, imacr, image, ImaginaryI, imagline, imagpart, imath, Im, imof, imped, Implies, incare, in, infin, infintie, inodot, intcal, int, Int, integers, Integral, intercal, Intersection, intlarhk, intprod, InvisibleComma, InvisibleTimes, IOcy, iocy, Iogon, iogon, Iopf, iopf, Iota, iota, iprod, iquest, iscr, Iscr, isin, isindot, isinE, isins, isinsv, isinv, it, Itilde, itilde, Iukcy, iukcy, Iuml, iuml, Jcirc, jcirc, Jcy, jcy, Jfr, jfr, jmath, Jopf, jopf, Jscr, jscr, Jsercy, jsercy, Jukcy, jukcy, Kappa, kappa, kappav, Kcedil, kcedil, Kcy, kcy, Kfr, kfr, kgreen, KHcy, khcy, KJcy, kjcy, Kopf, kopf, Kscr, kscr, lAarr, Lacute, lacute, laemptyv, lagran, Lambda, lambda, lang, Lang, langd, langle, lap, Laplacetrf, laquo, larrb, larrbfs, larr, Larr, lArr, larrfs, larrhk, larrlp, larrpl, larrsim, larrtl, latail, lAtail, lat, late, lates, lbarr, lBarr, lbbrk, lbrace, lbrack, lbrke, lbrksld, lbrkslu, Lcaron, lcaron, Lcedil, lcedil, lceil, lcub, Lcy, lcy, ldca, ldquo, ldquor, ldrdhar, ldrushar, ldsh, le, lE, LeftAngleBracket, LeftArrowBar, leftarrow, LeftArrow, Leftarrow, LeftArrowRightArrow, leftarrowtail, LeftCeiling, LeftDoubleBracket, LeftDownTeeVector, LeftDownVectorBar, LeftDownVector, LeftFloor, leftharpoondown, leftharpoonup, leftleftarrows, leftrightarrow, LeftRightArrow, Leftrightarrow, leftrightarrows, leftrightharpoons, leftrightsquigarrow, LeftRightVector, LeftTeeArrow, LeftTee, LeftTeeVector, leftthreetimes, LeftTriangleBar, LeftTriangle, LeftTriangleEqual, LeftUpDownVector, LeftUpTeeVector, LeftUpVectorBar, LeftUpVector, LeftVectorBar, LeftVector, lEg, leg, leq, leqq, leqslant, lescc, les, lesdot, lesdoto, lesdotor, lesg, lesges, lessapprox, lessdot, lesseqgtr, lesseqqgtr, LessEqualGreater, LessFullEqual, LessGreater, lessgtr, LessLess, lesssim, LessSlantEqual, LessTilde, lfisht, lfloor, Lfr, lfr, lg, lgE, lHar, lhard, lharu, lharul, lhblk, LJcy, ljcy, llarr, ll, Ll, llcorner, Lleftarrow, llhard, lltri, Lmidot, lmidot, lmoustache, lmoust, lnap, lnapprox, lne, lnE, lneq, lneqq, lnsim, loang, loarr, lobrk, longleftarrow, LongLeftArrow, Longleftarrow, longleftrightarrow, LongLeftRightArrow, Longleftrightarrow, longmapsto, longrightarrow, LongRightArrow, Longrightarrow, looparrowleft, looparrowright, lopar, Lopf, lopf, loplus, lotimes, lowast, lowbar, LowerLeftArrow, LowerRightArrow, loz, lozenge, lozf, lpar, lparlt, lrarr, lrcorner, lrhar, lrhard, lrm, lrtri, lsaquo, lscr, Lscr, lsh, Lsh, lsim, lsime, lsimg, lsqb, lsquo, lsquor, Lstrok, lstrok, ltcc, ltcir, lt, LT, Lt, ltdot, lthree, ltimes, ltlarr, ltquest, ltri, ltrie, ltrif, ltrPar, lurdshar, luruhar, lvertneqq, lvnE, macr, male, malt, maltese, Map, map, mapsto, mapstodown, mapstoleft, mapstoup, marker, mcomma, Mcy, mcy, mdash, mDDot, measuredangle, MediumSpace, Mellintrf, Mfr, mfr, mho, micro, midast, midcir, mid, middot, minusb, minus, minusd, minusdu, MinusPlus, mlcp, mldr, mnplus, models, Mopf, mopf, mp, mscr, Mscr, mstpos, Mu, mu, multimap, mumap, nabla, Nacute, nacute, nang, nap, napE, napid, napos, napprox, natural, naturals, natur, nbsp, nbump, nbumpe, ncap, Ncaron, ncaron, Ncedil, ncedil, ncong, ncongdot, ncup, Ncy, ncy, ndash, nearhk, nearr, neArr, nearrow, ne, nedot, NegativeMediumSpace, NegativeThickSpace, NegativeThinSpace, NegativeVeryThinSpace, nequiv, nesear, nesim, NestedGreaterGreater, NestedLessLess, NewLine, nexist, nexists, Nfr, nfr, ngE, nge, ngeq, ngeqq, ngeqslant, nges, nGg, ngsim, nGt, ngt, ngtr, nGtv, nharr, nhArr, nhpar, ni, nis, nisd, niv, NJcy, njcy, nlarr, nlArr, nldr, nlE, nle, nleftarrow, nLeftarrow, nleftrightarrow, nLeftrightarrow, nleq, nleqq, nleqslant, nles, nless, nLl, nlsim, nLt, nlt, nltri, nltrie, nLtv, nmid, NoBreak, NonBreakingSpace, nopf, Nopf, Not, not, NotCongruent, NotCupCap, NotDoubleVerticalBar, NotElement, NotEqual, NotEqualTilde, NotExists, NotGreater, NotGreaterEqual, NotGreaterFullEqual, NotGreaterGreater, NotGreaterLess, NotGreaterSlantEqual, NotGreaterTilde, NotHumpDownHump, NotHumpEqual, notin, notindot, notinE, notinva, notinvb, notinvc, NotLeftTriangleBar, NotLeftTriangle, NotLeftTriangleEqual, NotLess, NotLessEqual, NotLessGreater, NotLessLess, NotLessSlantEqual, NotLessTilde, NotNestedGreaterGreater, NotNestedLessLess, notni, notniva, notnivb, notnivc, NotPrecedes, NotPrecedesEqual, NotPrecedesSlantEqual, NotReverseElement, NotRightTriangleBar, NotRightTriangle, NotRightTriangleEqual, NotSquareSubset, NotSquareSubsetEqual, NotSquareSuperset, NotSquareSupersetEqual, NotSubset, NotSubsetEqual, NotSucceeds, NotSucceedsEqual, NotSucceedsSlantEqual, NotSucceedsTilde, NotSuperset, NotSupersetEqual, NotTilde, NotTildeEqual, NotTildeFullEqual, NotTildeTilde, NotVerticalBar, nparallel, npar, nparsl, npart, npolint, npr, nprcue, nprec, npreceq, npre, nrarrc, nrarr, nrArr, nrarrw, nrightarrow, nRightarrow, nrtri, nrtrie, nsc, nsccue, nsce, Nscr, nscr, nshortmid, nshortparallel, nsim, nsime, nsimeq, nsmid, nspar, nsqsube, nsqsupe, nsub, nsubE, nsube, nsubset, nsubseteq, nsubseteqq, nsucc, nsucceq, nsup, nsupE, nsupe, nsupset, nsupseteq, nsupseteqq, ntgl, Ntilde, ntilde, ntlg, ntriangleleft, ntrianglelefteq, ntriangleright, ntrianglerighteq, Nu, nu, num, numero, numsp, nvap, nvdash, nvDash, nVdash, nVDash, nvge, nvgt, nvHarr, nvinfin, nvlArr, nvle, nvlt, nvltrie, nvrArr, nvrtrie, nvsim, nwarhk, nwarr, nwArr, nwarrow, nwnear, Oacute, oacute, oast, Ocirc, ocirc, ocir, Ocy, ocy, odash, Odblac, odblac, odiv, odot, odsold, OElig, oelig, ofcir, Ofr, ofr, ogon, Ograve, ograve, ogt, ohbar, ohm, oint, olarr, olcir, olcross, oline, olt, Omacr, omacr, Omega, omega, Omicron, omicron, omid, ominus, Oopf, oopf, opar, OpenCurlyDoubleQuote, OpenCurlyQuote, operp, oplus, orarr, Or, or, ord, order, orderof, ordf, ordm, origof, oror, orslope, orv, oS, Oscr, oscr, Oslash, oslash, osol, Otilde, otilde, otimesas, Otimes, otimes, Ouml, ouml, ovbar, OverBar, OverBrace, OverBracket, OverParenthesis, para, parallel, par, parsim, parsl, part, PartialD, Pcy, pcy, percnt, period, permil, perp, pertenk, Pfr, pfr, Phi, phi, phiv, phmmat, phone, Pi, pi, pitchfork, piv, planck, planckh, plankv, plusacir, plusb, pluscir, plus, plusdo, plusdu, pluse, PlusMinus, plusmn, plussim, plustwo, pm, Poincareplane, pointint, popf, Popf, pound, prap, Pr, pr, prcue, precapprox, prec, preccurlyeq, Precedes, PrecedesEqual, PrecedesSlantEqual, PrecedesTilde, preceq, precnapprox, precneqq, precnsim, pre, prE, precsim, prime, Prime, primes, prnap, prnE, prnsim, prod, Product, profalar, profline, profsurf, prop, Proportional, Proportion, propto, prsim, prurel, Pscr, pscr, Psi, psi, puncsp, Qfr, qfr, qint, qopf, Qopf, qprime, Qscr, qscr, quaternions, quatint, quest, questeq, quot, QUOT, rAarr, race, Racute, racute, radic, raemptyv, rang, Rang, rangd, range, rangle, raquo, rarrap, rarrb, rarrbfs, rarrc, rarr, Rarr, rArr, rarrfs, rarrhk, rarrlp, rarrpl, rarrsim, Rarrtl, rarrtl, rarrw, ratail, rAtail, ratio, rationals, rbarr, rBarr, RBarr, rbbrk, rbrace, rbrack, rbrke, rbrksld, rbrkslu, Rcaron, rcaron, Rcedil, rcedil, rceil, rcub, Rcy, rcy, rdca, rdldhar, rdquo, rdquor, rdsh, real, realine, realpart, reals, Re, rect, reg, REG, ReverseElement, ReverseEquilibrium, ReverseUpEquilibrium, rfisht, rfloor, rfr, Rfr, rHar, rhard, rharu, rharul, Rho, rho, rhov, RightAngleBracket, RightArrowBar, rightarrow, RightArrow, Rightarrow, RightArrowLeftArrow, rightarrowtail, RightCeiling, RightDoubleBracket, RightDownTeeVector, RightDownVectorBar, RightDownVector, RightFloor, rightharpoondown, rightharpoonup, rightleftarrows, rightleftharpoons, rightrightarrows, rightsquigarrow, RightTeeArrow, RightTee, RightTeeVector, rightthreetimes, RightTriangleBar, RightTriangle, RightTriangleEqual, RightUpDownVector, RightUpTeeVector, RightUpVectorBar, RightUpVector, RightVectorBar, RightVector, ring, risingdotseq, rlarr, rlhar, rlm, rmoustache, rmoust, rnmid, roang, roarr, robrk, ropar, ropf, Ropf, roplus, rotimes, RoundImplies, rpar, rpargt, rppolint, rrarr, Rrightarrow, rsaquo, rscr, Rscr, rsh, Rsh, rsqb, rsquo, rsquor, rthree, rtimes, rtri, rtrie, rtrif, rtriltri, RuleDelayed, ruluhar, rx, Sacute, sacute, sbquo, scap, Scaron, scaron, Sc, sc, sccue, sce, scE, Scedil, scedil, Scirc, scirc, scnap, scnE, scnsim, scpolint, scsim, Scy, scy, sdotb, sdot, sdote, searhk, searr, seArr, searrow, sect, semi, seswar, setminus, setmn, sext, Sfr, sfr, sfrown, sharp, SHCHcy, shchcy, SHcy, shcy, ShortDownArrow, ShortLeftArrow, shortmid, shortparallel, ShortRightArrow, ShortUpArrow, shy, Sigma, sigma, sigmaf, sigmav, sim, simdot, sime, simeq, simg, simgE, siml, simlE, simne, simplus, simrarr, slarr, SmallCircle, smallsetminus, smashp, smeparsl, smid, smile, smt, smte, smtes, SOFTcy, softcy, solbar, solb, sol, Sopf, sopf, spades, spadesuit, spar, sqcap, sqcaps, sqcup, sqcups, Sqrt, sqsub, sqsube, sqsubset, sqsubseteq, sqsup, sqsupe, sqsupset, sqsupseteq, square, Square, SquareIntersection, SquareSubset, SquareSubsetEqual, SquareSuperset, SquareSupersetEqual, SquareUnion, squarf, squ, squf, srarr, Sscr, sscr, ssetmn, ssmile, sstarf, Star, star, starf, straightepsilon, straightphi, strns, sub, Sub, subdot, subE, sube, subedot, submult, subnE, subne, subplus, subrarr, subset, Subset, subseteq, subseteqq, SubsetEqual, subsetneq, subsetneqq, subsim, subsub, subsup, succapprox, succ, succcurlyeq, Succeeds, SucceedsEqual, SucceedsSlantEqual, SucceedsTilde, succeq, succnapprox, succneqq, succnsim, succsim, SuchThat, sum, Sum, sung, sup1, sup2, sup3, sup, Sup, supdot, supdsub, supE, supe, supedot, Superset, SupersetEqual, suphsol, suphsub, suplarr, supmult, supnE, supne, supplus, supset, Supset, supseteq, supseteqq, supsetneq, supsetneqq, supsim, supsub, supsup, swarhk, swarr, swArr, swarrow, swnwar, szlig, Tab, target, Tau, tau, tbrk, Tcaron, tcaron, Tcedil, tcedil, Tcy, tcy, tdot, telrec, Tfr, tfr, there4, therefore, Therefore, Theta, theta, thetasym, thetav, thickapprox, thicksim, ThickSpace, ThinSpace, thinsp, thkap, thksim, THORN, thorn, tilde, Tilde, TildeEqual, TildeFullEqual, TildeTilde, timesbar, timesb, times, timesd, tint, toea, topbot, topcir, top, Topf, topf, topfork, tosa, tprime, trade, TRADE, triangle, triangledown, triangleleft, trianglelefteq, triangleq, triangleright, trianglerighteq, tridot, trie, triminus, TripleDot, triplus, trisb, tritime, trpezium, Tscr, tscr, TScy, tscy, TSHcy, tshcy, Tstrok, tstrok, twixt, twoheadleftarrow, twoheadrightarrow, Uacute, uacute, uarr, Uarr, uArr, Uarrocir, Ubrcy, ubrcy, Ubreve, ubreve, Ucirc, ucirc, Ucy, ucy, udarr, Udblac, udblac, udhar, ufisht, Ufr, ufr, Ugrave, ugrave, uHar, uharl, uharr, uhblk, ulcorn, ulcorner, ulcrop, ultri, Umacr, umacr, uml, UnderBar, UnderBrace, UnderBracket, UnderParenthesis, Union, UnionPlus, Uogon, uogon, Uopf, uopf, UpArrowBar, uparrow, UpArrow, Uparrow, UpArrowDownArrow, updownarrow, UpDownArrow, Updownarrow, UpEquilibrium, upharpoonleft, upharpoonright, uplus, UpperLeftArrow, UpperRightArrow, upsi, Upsi, upsih, Upsilon, upsilon, UpTeeArrow, UpTee, upuparrows, urcorn, urcorner, urcrop, Uring, uring, urtri, Uscr, uscr, utdot, Utilde, utilde, utri, utrif, uuarr, Uuml, uuml, uwangle, vangrt, varepsilon, varkappa, varnothing, varphi, varpi, varpropto, varr, vArr, varrho, varsigma, varsubsetneq, varsubsetneqq, varsupsetneq, varsupsetneqq, vartheta, vartriangleleft, vartriangleright, vBar, Vbar, vBarv, Vcy, vcy, vdash, vDash, Vdash, VDash, Vdashl, veebar, vee, Vee, veeeq, vellip, verbar, Verbar, vert, Vert, VerticalBar, VerticalLine, VerticalSeparator, VerticalTilde, VeryThinSpace, Vfr, vfr, vltri, vnsub, vnsup, Vopf, vopf, vprop, vrtri, Vscr, vscr, vsubnE, vsubne, vsupnE, vsupne, Vvdash, vzigzag, Wcirc, wcirc, wedbar, wedge, Wedge, wedgeq, weierp, Wfr, wfr, Wopf, wopf, wp, wr, wreath, Wscr, wscr, xcap, xcirc, xcup, xdtri, Xfr, xfr, xharr, xhArr, Xi, xi, xlarr, xlArr, xmap, xnis, xodot, Xopf, xopf, xoplus, xotime, xrarr, xrArr, Xscr, xscr, xsqcup, xuplus, xutri, xvee, xwedge, Yacute, yacute, YAcy, yacy, Ycirc, ycirc, Ycy, ycy, yen, Yfr, yfr, YIcy, yicy, Yopf, yopf, Yscr, yscr, YUcy, yucy, yuml, Yuml, Zacute, zacute, Zcaron, zcaron, Zcy, zcy, Zdot, zdot, zeetrf, ZeroWidthSpace, Zeta, zeta, zfr, Zfr, ZHcy, zhcy, zigrarr, zopf, Zopf, Zscr, zscr, zwj, zwnj, default */
/***/ (function(module) {

module.exports = {"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\"","QUOT":"\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"};

/***/ }),

/***/ "./node_modules/entities/maps/legacy.json":
/*!************************************************!*\
  !*** ./node_modules/entities/maps/legacy.json ***!
  \************************************************/
/*! exports provided: Aacute, aacute, Acirc, acirc, acute, AElig, aelig, Agrave, agrave, amp, AMP, Aring, aring, Atilde, atilde, Auml, auml, brvbar, Ccedil, ccedil, cedil, cent, copy, COPY, curren, deg, divide, Eacute, eacute, Ecirc, ecirc, Egrave, egrave, ETH, eth, Euml, euml, frac12, frac14, frac34, gt, GT, Iacute, iacute, Icirc, icirc, iexcl, Igrave, igrave, iquest, Iuml, iuml, laquo, lt, LT, macr, micro, middot, nbsp, not, Ntilde, ntilde, Oacute, oacute, Ocirc, ocirc, Ograve, ograve, ordf, ordm, Oslash, oslash, Otilde, otilde, Ouml, ouml, para, plusmn, pound, quot, QUOT, raquo, reg, REG, sect, shy, sup1, sup2, sup3, szlig, THORN, thorn, times, Uacute, uacute, Ucirc, ucirc, Ugrave, ugrave, uml, Uuml, uuml, Yacute, yacute, yen, yuml, default */
/***/ (function(module) {

module.exports = {"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","QUOT":"\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"};

/***/ }),

/***/ "./node_modules/entities/maps/xml.json":
/*!*********************************************!*\
  !*** ./node_modules/entities/maps/xml.json ***!
  \*********************************************/
/*! exports provided: amp, apos, gt, lt, quot, default */
/***/ (function(module) {

module.exports = {"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""};

/***/ }),

/***/ "./node_modules/nwjs-webpack-plugin/reloader.js":
/*!******************************************************!*\
  !*** ./node_modules/nwjs-webpack-plugin/reloader.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const net = __webpack_require__(/*! net */ "net");

const randomNumber = Math.random() * 10e9 | 0;
const randomID = `webpack-error-message-${randomNumber}`
const client = net.connect({ port: 36637 }, () => console.log('Live reload connected!'))
var Convert = __webpack_require__(/*! ansi-to-html */ "./node_modules/ansi-to-html/lib/ansi_to_html.js");
var convert = new Convert();


const css = `
#${randomID}{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: rgb(222, 85, 85);
    margin: 0px;
    font-size: 1.3em;
}
`
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)


client.on('data', (data) => {
    data = JSON.parse(data.toString())
    console.log("Server:", data);
    if (data.status === 'DONE') {
        location.reload();
    }
    if (data.status === 'ERROR') {
        data.errors.forEach(err => {
            try {
                eval(err.toEval)
            } catch (error) {
                let el = document.getElementById(randomID);
                const header = [
                    `ERROR in ${err.file} ${err.location ? err.location.line : '1'}:${err.location ? err.location.column : '1'}`,
                    ...error.message.split('\n').slice(0, 2)
                ]
                const body = error.message.split('\n').slice(2)
                
                el && el.remove();
                el = document.createElement('div')
                el.id = randomID
                const headerEl = document.createElement('pre')
                
                headerEl.innerHTML = convert.toHtml(header.join('\n'));
                headerEl.style.fontWeight = 'bold'
                headerEl.style.marginLeft = '0.5em'

                const bodyEl = document.createElement('pre')
                bodyEl.innerHTML = convert.toHtml(body.join('\n'));
                bodyEl.style.marginLeft = '1em'
                bodyEl.style.fontSize = '.8em'

                el.append(headerEl)
                el.append(bodyEl)

                document.body.append(el);
                console.error(error.message)
            }
        });
    }
    nw.Window.get().focus();
});

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2ktdG8taHRtbC9saWIvYW5zaV90b19odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbnRpdGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbGliL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW50aXRpZXMvbGliL2RlY29kZV9jb2RlcG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL253anMtd2VicGFjay1wbHVnaW4vcmVsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV0XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZBLFlBQVksbUJBQU8sQ0FBQyxnQkFBSzs7QUFFekI7QUFDQSwwQ0FBMEMsYUFBYTtBQUN2RCw0QkFBNEIsT0FBTyxLQUFlLEVBQUU7QUFDcEQsY0FBYyxtQkFBTyxDQUFDLHFFQUFjO0FBQ3BDOzs7QUFHQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQ0FBZ0MsU0FBUyxHQUFHLHVDQUF1QyxHQUFHLHlDQUF5QztBQUMvSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDckVELGdDIiwiZmlsZSI6InJlbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9ub2RlX21vZHVsZXMvbndqcy13ZWJwYWNrLXBsdWdpbi9yZWxvYWRlci5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVudGl0aWVzID0gcmVxdWlyZSgnZW50aXRpZXMnKTtcbnZhciBkZWZhdWx0cyA9IHtcbiAgICBmZzogJyNGRkYnLFxuICAgIGJnOiAnIzAwMCcsXG4gICAgbmV3bGluZTogZmFsc2UsXG4gICAgZXNjYXBlWE1MOiBmYWxzZSxcbiAgICBzdHJlYW06IGZhbHNlLFxuICAgIGNvbG9yczogZ2V0RGVmYXVsdENvbG9ycygpXG59O1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0Q29sb3JzKCkge1xuICAgIHZhciBjb2xvcnMgPSB7XG4gICAgICAgIDA6ICcjMDAwJyxcbiAgICAgICAgMTogJyNBMDAnLFxuICAgICAgICAyOiAnIzBBMCcsXG4gICAgICAgIDM6ICcjQTUwJyxcbiAgICAgICAgNDogJyMwMEEnLFxuICAgICAgICA1OiAnI0EwQScsXG4gICAgICAgIDY6ICcjMEFBJyxcbiAgICAgICAgNzogJyNBQUEnLFxuICAgICAgICA4OiAnIzU1NScsXG4gICAgICAgIDk6ICcjRjU1JyxcbiAgICAgICAgMTA6ICcjNUY1JyxcbiAgICAgICAgMTE6ICcjRkY1JyxcbiAgICAgICAgMTI6ICcjNTVGJyxcbiAgICAgICAgMTM6ICcjRjVGJyxcbiAgICAgICAgMTQ6ICcjNUZGJyxcbiAgICAgICAgMTU6ICcjRkZGJ1xuICAgIH07XG5cbiAgICByYW5nZSgwLCA1KS5mb3JFYWNoKGZ1bmN0aW9uIChyZWQpIHtcbiAgICAgICAgcmFuZ2UoMCwgNSkuZm9yRWFjaChmdW5jdGlvbiAoZ3JlZW4pIHtcbiAgICAgICAgICAgIHJhbmdlKDAsIDUpLmZvckVhY2goZnVuY3Rpb24gKGJsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0U3R5bGVDb2xvcihyZWQsIGdyZWVuLCBibHVlLCBjb2xvcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmFuZ2UoMCwgMjMpLmZvckVhY2goZnVuY3Rpb24gKGdyYXkpIHtcbiAgICAgICAgdmFyIGMgPSBncmF5ICsgMjMyO1xuICAgICAgICB2YXIgbCA9IHRvSGV4U3RyaW5nKGdyYXkgKiAxMCArIDgpO1xuXG4gICAgICAgIGNvbG9yc1tjXSA9ICcjJyArIGwgKyBsICsgbDtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb2xvcnM7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHJlZFxuICogQHBhcmFtIHtudW1iZXJ9IGdyZWVuXG4gKiBAcGFyYW0ge251bWJlcn0gYmx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNvbG9yc1xuICovXG5mdW5jdGlvbiBzZXRTdHlsZUNvbG9yKHJlZCwgZ3JlZW4sIGJsdWUsIGNvbG9ycykge1xuICAgIHZhciBjID0gMTYgKyByZWQgKiAzNiArIGdyZWVuICogNiArIGJsdWU7XG4gICAgdmFyIHIgPSByZWQgPiAwID8gcmVkICogNDAgKyA1NSA6IDA7XG4gICAgdmFyIGcgPSBncmVlbiA+IDAgPyBncmVlbiAqIDQwICsgNTUgOiAwO1xuICAgIHZhciBiID0gYmx1ZSA+IDAgPyBibHVlICogNDAgKyA1NSA6IDA7XG5cbiAgICBjb2xvcnNbY10gPSB0b0NvbG9ySGV4U3RyaW5nKFtyLCBnLCBiXSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgZnJvbSBhIG51bWJlciBsaWtlIDE1IHRvIGEgaGV4IHN0cmluZyBsaWtlICdGJ1xuICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdG9IZXhTdHJpbmcobnVtKSB7XG4gICAgdmFyIHN0ciA9IG51bS50b1N0cmluZygxNik7XG5cbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgc3RyID0gJzAnICsgc3RyO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogQ29udmVydHMgZnJvbSBhbiBhcnJheSBvZiBudW1iZXJzIGxpa2UgWzE1LCAxNSwgMTVdIHRvIGEgaGV4IHN0cmluZyBsaWtlICdGRkYnXG4gKiBAcGFyYW0ge1tyZWQsIGdyZWVuLCBibHVlXX0gcmVmXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB0b0NvbG9ySGV4U3RyaW5nKHJlZikge1xuICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCh0b0hleFN0cmluZyhyZWZbal0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyMnICsgcmVzdWx0cy5qb2luKCcnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IHRva2VuXG4gKiBAcGFyYW0geyp9IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlT3V0cHV0KHN0YWNrLCB0b2tlbiwgZGF0YSwgb3B0aW9ucykge1xuICAgIHZhciByZXN1bHQ7XG5cbiAgICBpZiAodG9rZW4gPT09ICd0ZXh0Jykge1xuICAgICAgICByZXN1bHQgPSBwdXNoVGV4dChkYXRhLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHRva2VuID09PSAnZGlzcGxheScpIHtcbiAgICAgICAgcmVzdWx0ID0gaGFuZGxlRGlzcGxheShzdGFjaywgZGF0YSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ3h0ZXJtMjU2Jykge1xuICAgICAgICByZXN1bHQgPSBwdXNoRm9yZWdyb3VuZENvbG9yKHN0YWNrLCBvcHRpb25zLmNvbG9yc1tkYXRhXSk7XG4gICAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ3JnYicpIHtcbiAgICAgICAgcmVzdWx0ID0gaGFuZGxlUmdiKHN0YWNrLCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZVJnYihzdGFjaywgZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLnN1YnN0cmluZygyKS5zbGljZSgwLCAtMSk7XG4gICAgdmFyIG9wZXJhdGlvbiA9ICtkYXRhLnN1YnN0cigwLCAyKTtcblxuICAgIHZhciBjb2xvciA9IGRhdGEuc3Vic3RyaW5nKDUpLnNwbGl0KCc7Jyk7XG4gICAgdmFyIHJnYiA9IGNvbG9yLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICgnMCcgKyBOdW1iZXIodmFsdWUpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTtcbiAgICB9KS5qb2luKCcnKTtcblxuICAgIHJldHVybiBwdXNoU3R5bGUoc3RhY2ssIChvcGVyYXRpb24gPT09IDM4ID8gJ2NvbG9yOiMnIDogJ2JhY2tncm91bmQtY29sb3I6IycpICsgcmdiKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFja1xuICogQHBhcmFtIHtudW1iZXJ9IGNvZGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gaGFuZGxlRGlzcGxheShzdGFjaywgY29kZSwgb3B0aW9ucykge1xuICAgIGNvZGUgPSBwYXJzZUludChjb2RlLCAxMCk7XG4gICAgdmFyIHJlc3VsdDtcblxuICAgIHZhciBjb2RlTWFwID0ge1xuICAgICAgICAnLTEnOiBmdW5jdGlvbiBfKCkge1xuICAgICAgICAgICAgcmV0dXJuICc8YnIvPic7XG4gICAgICAgIH0sXG4gICAgICAgIDA6IGZ1bmN0aW9uIF8oKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhY2subGVuZ3RoICYmIHJlc2V0U3R5bGVzKHN0YWNrKTtcbiAgICAgICAgfSxcbiAgICAgICAgMTogZnVuY3Rpb24gXygpIHtcbiAgICAgICAgICAgIHJldHVybiBwdXNoVGFnKHN0YWNrLCAnYicpO1xuICAgICAgICB9LFxuICAgICAgICAzOiBmdW5jdGlvbiBfKCkge1xuICAgICAgICAgICAgcmV0dXJuIHB1c2hUYWcoc3RhY2ssICdpJyk7XG4gICAgICAgIH0sXG4gICAgICAgIDQ6IGZ1bmN0aW9uIF8oKSB7XG4gICAgICAgICAgICByZXR1cm4gcHVzaFRhZyhzdGFjaywgJ3UnKTtcbiAgICAgICAgfSxcbiAgICAgICAgODogZnVuY3Rpb24gXygpIHtcbiAgICAgICAgICAgIHJldHVybiBwdXNoU3R5bGUoc3RhY2ssICdkaXNwbGF5Om5vbmUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgOTogZnVuY3Rpb24gXygpIHtcbiAgICAgICAgICAgIHJldHVybiBwdXNoVGFnKHN0YWNrLCAnc3RyaWtlJyk7XG4gICAgICAgIH0sXG4gICAgICAgIDIyOiBmdW5jdGlvbiBfKCkge1xuICAgICAgICAgICAgcmV0dXJuIHB1c2hTdHlsZShzdGFjaywgJ2ZvbnQtd2VpZ2h0Om5vcm1hbCcpO1xuICAgICAgICB9LFxuICAgICAgICAyMzogZnVuY3Rpb24gXygpIHtcbiAgICAgICAgICAgIHJldHVybiBjbG9zZVRhZyhzdGFjaywgJ2knKTtcbiAgICAgICAgfSxcbiAgICAgICAgMjQ6IGZ1bmN0aW9uIF8oKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xvc2VUYWcoc3RhY2ssICd1Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIDM5OiBmdW5jdGlvbiBfKCkge1xuICAgICAgICAgICAgcmV0dXJuIHB1c2hGb3JlZ3JvdW5kQ29sb3Ioc3RhY2ssIG9wdGlvbnMuZmcpO1xuICAgICAgICB9LFxuICAgICAgICA0OTogZnVuY3Rpb24gXygpIHtcbiAgICAgICAgICAgIHJldHVybiBwdXNoQmFja2dyb3VuZENvbG9yKHN0YWNrLCBvcHRpb25zLmJnKTtcbiAgICAgICAgfSxcbiAgICAgICAgNTM6IGZ1bmN0aW9uIF8oKSB7XG4gICAgICAgICAgICByZXR1cm4gcHVzaFN0eWxlKHN0YWNrLCAndGV4dC1kZWNvcmF0aW9uOm92ZXJsaW5lJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGNvZGVNYXBbY29kZV0pIHtcbiAgICAgICAgcmVzdWx0ID0gY29kZU1hcFtjb2RlXSgpO1xuICAgIH0gZWxzZSBpZiAoNCA8IGNvZGUgJiYgY29kZSA8IDcpIHtcbiAgICAgICAgcmVzdWx0ID0gcHVzaFRhZyhzdGFjaywgJ2JsaW5rJyk7XG4gICAgfSBlbHNlIGlmICgyOSA8IGNvZGUgJiYgY29kZSA8IDM4KSB7XG4gICAgICAgIHJlc3VsdCA9IHB1c2hGb3JlZ3JvdW5kQ29sb3Ioc3RhY2ssIG9wdGlvbnMuY29sb3JzW2NvZGUgLSAzMF0pO1xuICAgIH0gZWxzZSBpZiAoMzkgPCBjb2RlICYmIGNvZGUgPCA0OCkge1xuICAgICAgICByZXN1bHQgPSBwdXNoQmFja2dyb3VuZENvbG9yKHN0YWNrLCBvcHRpb25zLmNvbG9yc1tjb2RlIC0gNDBdKTtcbiAgICB9IGVsc2UgaWYgKDg5IDwgY29kZSAmJiBjb2RlIDwgOTgpIHtcbiAgICAgICAgcmVzdWx0ID0gcHVzaEZvcmVncm91bmRDb2xvcihzdGFjaywgb3B0aW9ucy5jb2xvcnNbOCArIChjb2RlIC0gOTApXSk7XG4gICAgfSBlbHNlIGlmICg5OSA8IGNvZGUgJiYgY29kZSA8IDEwOCkge1xuICAgICAgICByZXN1bHQgPSBwdXNoQmFja2dyb3VuZENvbG9yKHN0YWNrLCBvcHRpb25zLmNvbG9yc1s4ICsgKGNvZGUgLSAxMDApXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDbGVhciBhbGwgdGhlIHN0eWxlc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVzZXRTdHlsZXMoc3RhY2spIHtcbiAgICB2YXIgc3RhY2tDbG9uZSA9IHN0YWNrLnNsaWNlKDApO1xuXG4gICAgc3RhY2subGVuZ3RoID0gMDtcblxuICAgIHJldHVybiBzdGFja0Nsb25lLnJldmVyc2UoKS5tYXAoZnVuY3Rpb24gKHRhZykge1xuICAgICAgICByZXR1cm4gJzwvJyArIHRhZyArICc+JztcbiAgICB9KS5qb2luKCcnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG51bWJlcnMgcmFuZ2luZyBmcm9tIGxvdyB0byBoaWdoXG4gKiBAcGFyYW0ge251bWJlcn0gbG93XG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaFxuICogQHJldHVybnMge0FycmF5fVxuICogQGV4YW1wbGUgcmFuZ2UoMywgNyk7IC8vIGNyZWF0ZXMgWzMsIDQsIDUsIDYsIDddXG4gKi9cbmZ1bmN0aW9uIHJhbmdlKGxvdywgaGlnaCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKHZhciBqID0gbG93OyBqIDw9IGhpZ2g7IGorKykge1xuICAgICAgICByZXN1bHRzLnB1c2goaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0IGlzIHRydWUgaWYgdmFsdWUgaXMgTk9UIHRoZSBzYW1lIGNhdGVnb3J5XG4gKiBAcGFyYW0ge3N0cmluZ30gY2F0ZWdvcnlcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gbm90Q2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIChjYXRlZ29yeSA9PT0gbnVsbCB8fCBlLmNhdGVnb3J5ICE9PSBjYXRlZ29yeSkgJiYgY2F0ZWdvcnkgIT09ICdhbGwnO1xuICAgIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBjb2RlIGludG8gYW4gYW5zaSB0b2tlbiB0eXBlXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2F0ZWdvcnlGb3JDb2RlKGNvZGUpIHtcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSwgMTApO1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuXG4gICAgaWYgKGNvZGUgPT09IDApIHtcbiAgICAgICAgcmVzdWx0ID0gJ2FsbCc7XG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAxKSB7XG4gICAgICAgIHJlc3VsdCA9ICdib2xkJztcbiAgICB9IGVsc2UgaWYgKDIgPCBjb2RlICYmIGNvZGUgPCA1KSB7XG4gICAgICAgIHJlc3VsdCA9ICd1bmRlcmxpbmUnO1xuICAgIH0gZWxzZSBpZiAoNCA8IGNvZGUgJiYgY29kZSA8IDcpIHtcbiAgICAgICAgcmVzdWx0ID0gJ2JsaW5rJztcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDgpIHtcbiAgICAgICAgcmVzdWx0ID0gJ2hpZGUnO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gOSkge1xuICAgICAgICByZXN1bHQgPSAnc3RyaWtlJztcbiAgICB9IGVsc2UgaWYgKDI5IDwgY29kZSAmJiBjb2RlIDwgMzggfHwgY29kZSA9PT0gMzkgfHwgODkgPCBjb2RlICYmIGNvZGUgPCA5OCkge1xuICAgICAgICByZXN1bHQgPSAnZm9yZWdyb3VuZC1jb2xvcic7XG4gICAgfSBlbHNlIGlmICgzOSA8IGNvZGUgJiYgY29kZSA8IDQ4IHx8IGNvZGUgPT09IDQ5IHx8IDk5IDwgY29kZSAmJiBjb2RlIDwgMTA4KSB7XG4gICAgICAgIHJlc3VsdCA9ICdiYWNrZ3JvdW5kLWNvbG9yJztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcHVzaFRleHQodGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmVzY2FwZVhNTCkge1xuICAgICAgICByZXR1cm4gZW50aXRpZXMuZW5jb2RlWE1MKHRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0eWxlPScnXVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcHVzaFRhZyhzdGFjaywgdGFnLCBzdHlsZSkge1xuICAgIGlmICghc3R5bGUpIHtcbiAgICAgICAgc3R5bGUgPSAnJztcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHRhZyk7XG5cbiAgICByZXR1cm4gWyc8JyArIHRhZywgc3R5bGUgPyAnIHN0eWxlPVwiJyArIHN0eWxlICsgJ1wiJyA6IHZvaWQgMCwgJz4nXS5qb2luKCcnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBwdXNoU3R5bGUoc3RhY2ssIHN0eWxlKSB7XG4gICAgcmV0dXJuIHB1c2hUYWcoc3RhY2ssICdzcGFuJywgc3R5bGUpO1xufVxuXG5mdW5jdGlvbiBwdXNoRm9yZWdyb3VuZENvbG9yKHN0YWNrLCBjb2xvcikge1xuICAgIHJldHVybiBwdXNoVGFnKHN0YWNrLCAnc3BhbicsICdjb2xvcjonICsgY29sb3IpO1xufVxuXG5mdW5jdGlvbiBwdXNoQmFja2dyb3VuZENvbG9yKHN0YWNrLCBjb2xvcikge1xuICAgIHJldHVybiBwdXNoVGFnKHN0YWNrLCAnc3BhbicsICdiYWNrZ3JvdW5kLWNvbG9yOicgKyBjb2xvcik7XG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheX0gc3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2xvc2VUYWcoc3RhY2ssIHN0eWxlKSB7XG4gICAgdmFyIGxhc3Q7XG5cbiAgICBpZiAoc3RhY2suc2xpY2UoLTEpWzBdID09PSBzdHlsZSkge1xuICAgICAgICBsYXN0ID0gc3RhY2sucG9wKCk7XG4gICAgfVxuXG4gICAgaWYgKGxhc3QpIHtcbiAgICAgICAgcmV0dXJuICc8LycgKyBzdHlsZSArICc+JztcbiAgICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB0b2tlbml6ZSh0ZXh0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBhbnNpTWF0Y2ggPSBmYWxzZTtcbiAgICB2YXIgYW5zaUhhbmRsZXIgPSAzO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlWHRlcm0yNTYobSwgZzEpIHtcbiAgICAgICAgY2FsbGJhY2soJ3h0ZXJtMjU2JywgZzEpO1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3bGluZShtKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm5ld2xpbmUpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCdkaXNwbGF5JywgLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soJ3RleHQnLCBtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbnNpTWVzcyhtLCBnMSkge1xuICAgICAgICBhbnNpTWF0Y2ggPSB0cnVlO1xuICAgICAgICBpZiAoZzEudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZzEgPSAnMCc7XG4gICAgICAgIH1cblxuICAgICAgICBnMSA9IGcxLnRyaW1SaWdodCgnOycpLnNwbGl0KCc7Jyk7XG5cbiAgICAgICAgZm9yICh2YXIgbyA9IDAsIGxlbiA9IGcxLmxlbmd0aDsgbyA8IGxlbjsgbysrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygnZGlzcGxheScsIGcxW29dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFsVGV4dChtKSB7XG4gICAgICAgIGNhbGxiYWNrKCd0ZXh0JywgbSk7XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJnYihtKSB7XG4gICAgICAgIGNhbGxiYWNrKCdyZ2InLCBtKTtcblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLyogZXNsaW50IG5vLWNvbnRyb2wtcmVnZXg6MCAqL1xuICAgIHZhciB0b2tlbnMgPSBbe1xuICAgICAgICBwYXR0ZXJuOiAvXlxceDA4Ky8sXG4gICAgICAgIHN1YjogcmVtb3ZlXG4gICAgfSwge1xuICAgICAgICBwYXR0ZXJuOiAvXlxceDFiXFxbWzAxMl0/Sy8sXG4gICAgICAgIHN1YjogcmVtb3ZlXG4gICAgfSwge1xuICAgICAgICBwYXR0ZXJuOiAvXlxceDFiXFxbXFwoQi8sXG4gICAgICAgIHN1YjogcmVtb3ZlXG4gICAgfSwge1xuICAgICAgICBwYXR0ZXJuOiAvXlxceDFiXFxbWzM0XTg7MjtcXGQrO1xcZCs7XFxkK20vLFxuICAgICAgICBzdWI6IHJnYlxuICAgIH0sIHtcbiAgICAgICAgcGF0dGVybjogL15cXHgxYlxcWzM4OzU7KFxcZCspbS8sXG4gICAgICAgIHN1YjogcmVtb3ZlWHRlcm0yNTZcbiAgICB9LCB7XG4gICAgICAgIHBhdHRlcm46IC9eXFxuLyxcbiAgICAgICAgc3ViOiBuZXdsaW5lXG4gICAgfSwge1xuICAgICAgICBwYXR0ZXJuOiAvXlxceDFiXFxbKCg/OlxcZHsxLDN9Oz8pK3wpbS8sXG4gICAgICAgIHN1YjogYW5zaU1lc3NcbiAgICB9LCB7XG4gICAgICAgIC8vIENTSSBuIEpcbiAgICAgICAgLy8gRUQgLSBFcmFzZSBpbiBEaXNwbGF5IENsZWFycyBwYXJ0IG9mIHRoZSBzY3JlZW4uXG4gICAgICAgIC8vIElmIG4gaXMgMCAob3IgbWlzc2luZyksIGNsZWFyIGZyb20gY3Vyc29yIHRvIGVuZCBvZiBzY3JlZW4uXG4gICAgICAgIC8vIElmIG4gaXMgMSwgY2xlYXIgZnJvbSBjdXJzb3IgdG8gYmVnaW5uaW5nIG9mIHRoZSBzY3JlZW4uXG4gICAgICAgIC8vIElmIG4gaXMgMiwgY2xlYXIgZW50aXJlIHNjcmVlbiAoYW5kIG1vdmVzIGN1cnNvciB0byB1cHBlciBsZWZ0IG9uIERPUyBBTlNJLlNZUykuXG4gICAgICAgIC8vIElmIG4gaXMgMywgY2xlYXIgZW50aXJlIHNjcmVlbiBhbmQgZGVsZXRlIGFsbCBsaW5lcyBzYXZlZCBpbiB0aGUgc2Nyb2xsYmFjayBidWZmZXJcbiAgICAgICAgLy8gICAodGhpcyBmZWF0dXJlIHdhcyBhZGRlZCBmb3IgeHRlcm0gYW5kIGlzIHN1cHBvcnRlZCBieSBvdGhlciB0ZXJtaW5hbCBhcHBsaWNhdGlvbnMpLlxuICAgICAgICBwYXR0ZXJuOiAvXlxceDFiXFxbXFxkP0ovLFxuICAgICAgICBzdWI6IHJlbW92ZVxuICAgIH0sIHtcbiAgICAgICAgLy8gQ1NJIG4gOyBtIGZcbiAgICAgICAgLy8gSFZQIC0gSG9yaXpvbnRhbCBWZXJ0aWNhbCBQb3NpdGlvbiBTYW1lIGFzIENVUFxuICAgICAgICBwYXR0ZXJuOiAvXlxceDFiXFxbXFxkezAsM307XFxkezAsM31mLyxcbiAgICAgICAgc3ViOiByZW1vdmVcbiAgICB9LCB7XG4gICAgICAgIC8vIGNhdGNoLWFsbCBmb3IgQ1NJIHNlcXVlbmNlcz9cbiAgICAgICAgcGF0dGVybjogL15cXHgxYlxcWz9bXFxkO117MCwzfS8sXG4gICAgICAgIHN1YjogcmVtb3ZlXG4gICAgfSwge1xuICAgICAgICBwYXR0ZXJuOiAvXihbXlxceDFiXFx4MDhcXG5dKykvLFxuICAgICAgICBzdWI6IHJlYWxUZXh0XG4gICAgfV07XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzKGhhbmRsZXIsIGkpIHtcbiAgICAgICAgaWYgKGkgPiBhbnNpSGFuZGxlciAmJiBhbnNpTWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFuc2lNYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoaGFuZGxlci5wYXR0ZXJuLCBoYW5kbGVyLnN1Yik7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXI7XG4gICAgdmFyIHJlc3VsdHMxID0gW107XG4gICAgdmFyIGxlbmd0aCA9IHRleHQubGVuZ3RoO1xuXG4gICAgb3V0ZXI6IHdoaWxlIChsZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBvID0gMCwgbGVuID0gdG9rZW5zLmxlbmd0aDsgbyA8IGxlbjsgaSA9ICsrbykge1xuICAgICAgICAgICAgaGFuZGxlciA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHByb2Nlc3MoaGFuZGxlciwgaSk7XG5cbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCAhPT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgbWF0Y2hlZCBhIHRva2VuIGFuZCByZW1vdmVkIGl0IGZyb20gdGhlIHRleHQuIFdlIG5lZWQgdG9cbiAgICAgICAgICAgICAgICAvLyBzdGFydCBtYXRjaGluZyAqYWxsKiB0b2tlbnMgYWdhaW5zdCB0aGUgbmV3IHRleHQuXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGV4dC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzMS5wdXNoKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGVuZ3RoID0gdGV4dC5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHMxO1xufVxuXG4vKipcbiAqIElmIHN0cmVhbWluZywgdGhlbiB0aGUgc3RhY2sgaXMgXCJzdGlja3lcIlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHN0aWNreVN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9rZW5cbiAqIEBwYXJhbSB7Kn0gZGF0YVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB1cGRhdGVTdGlja3lTdGFjayhzdGlja3lTdGFjaywgdG9rZW4sIGRhdGEpIHtcbiAgICBpZiAodG9rZW4gIT09ICd0ZXh0Jykge1xuICAgICAgICBzdGlja3lTdGFjayA9IHN0aWNreVN0YWNrLmZpbHRlcihub3RDYXRlZ29yeShjYXRlZ29yeUZvckNvZGUoZGF0YSkpKTtcbiAgICAgICAgc3RpY2t5U3RhY2sucHVzaCh7IHRva2VuOiB0b2tlbiwgZGF0YTogZGF0YSwgY2F0ZWdvcnk6IGNhdGVnb3J5Rm9yQ29kZShkYXRhKSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RpY2t5U3RhY2s7XG59XG5cbmZ1bmN0aW9uIEZpbHRlcihvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZiAob3B0aW9ucy5jb2xvcnMpIHtcbiAgICAgICAgb3B0aW9ucy5jb2xvcnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5jb2xvcnMsIG9wdGlvbnMuY29sb3JzKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5zdGFjayA9IFtdO1xuICAgIHRoaXMuc3RpY2t5U3RhY2sgPSBbXTtcbn1cblxuRmlsdGVyLnByb3RvdHlwZSA9IHtcbiAgICB0b0h0bWw6IGZ1bmN0aW9uIHRvSHRtbChpbnB1dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlucHV0ID0gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IFtpbnB1dF0gOiBpbnB1dDtcbiAgICAgICAgdmFyIHN0YWNrID0gdGhpcy5zdGFjaztcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdHM7XG4gICAgICAgIHZhciBidWYgPSBbXTtcblxuICAgICAgICB0aGlzLnN0aWNreVN0YWNrLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBnZW5lcmF0ZU91dHB1dChzdGFjaywgZWxlbWVudC50b2tlbiwgZWxlbWVudC5kYXRhLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgaWYgKG91dHB1dCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKG91dHB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRva2VuaXplKGlucHV0LmpvaW4oJycpLCBvcHRpb25zLCBmdW5jdGlvbiAodG9rZW4sIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBnZW5lcmF0ZU91dHB1dChzdGFjaywgdG9rZW4sIGRhdGEsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBpZiAob3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2gob3V0cHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3RpY2t5U3RhY2sgPSB1cGRhdGVTdGlja3lTdGFjayhfdGhpcy5zdGlja3lTdGFjaywgdG9rZW4sIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICBidWYucHVzaChyZXNldFN0eWxlcyhzdGFjaykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbHRlcjsiLCJ2YXIgZW5jb2RlID0gcmVxdWlyZShcIi4vbGliL2VuY29kZS5qc1wiKSxcbiAgICBkZWNvZGUgPSByZXF1aXJlKFwiLi9saWIvZGVjb2RlLmpzXCIpO1xuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKSB7XG4gICAgcmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmRlY29kZVN0cmljdCA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKSB7XG4gICAgcmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTFN0cmljdCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKSB7XG4gICAgcmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGVuY29kZS5YTUwgOiBlbmNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZVhNTCA9IGVuY29kZS5YTUw7XG5cbmV4cG9ydHMuZW5jb2RlSFRNTDQgPSBleHBvcnRzLmVuY29kZUhUTUw1ID0gZXhwb3J0cy5lbmNvZGVIVE1MID0gZW5jb2RlLkhUTUw7XG5cbmV4cG9ydHMuZGVjb2RlWE1MID0gZXhwb3J0cy5kZWNvZGVYTUxTdHJpY3QgPSBkZWNvZGUuWE1MO1xuXG5leHBvcnRzLmRlY29kZUhUTUw0ID0gZXhwb3J0cy5kZWNvZGVIVE1MNSA9IGV4cG9ydHMuZGVjb2RlSFRNTCA9IGRlY29kZS5IVE1MO1xuXG5leHBvcnRzLmRlY29kZUhUTUw0U3RyaWN0ID0gZXhwb3J0cy5kZWNvZGVIVE1MNVN0cmljdCA9IGV4cG9ydHMuZGVjb2RlSFRNTFN0cmljdCA9IGRlY29kZS5IVE1MU3RyaWN0O1xuXG5leHBvcnRzLmVzY2FwZSA9IGVuY29kZS5lc2NhcGU7XG4iLCJ2YXIgZW50aXR5TWFwID0gcmVxdWlyZShcIi4uL21hcHMvZW50aXRpZXMuanNvblwiKSxcbiAgICBsZWdhY3lNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9sZWdhY3kuanNvblwiKSxcbiAgICB4bWxNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy94bWwuanNvblwiKSxcbiAgICBkZWNvZGVDb2RlUG9pbnQgPSByZXF1aXJlKFwiLi9kZWNvZGVfY29kZXBvaW50LmpzXCIpO1xuXG52YXIgZGVjb2RlWE1MU3RyaWN0ID0gZ2V0U3RyaWN0RGVjb2Rlcih4bWxNYXApLFxuICAgIGRlY29kZUhUTUxTdHJpY3QgPSBnZXRTdHJpY3REZWNvZGVyKGVudGl0eU1hcCk7XG5cbmZ1bmN0aW9uIGdldFN0cmljdERlY29kZXIobWFwKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhtYXApLmpvaW4oXCJ8XCIpLFxuICAgICAgICByZXBsYWNlID0gZ2V0UmVwbGFjZXIobWFwKTtcblxuICAgIGtleXMgKz0gXCJ8I1t4WF1bXFxcXGRhLWZBLUZdK3wjXFxcXGQrXCI7XG5cbiAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKFwiJig/OlwiICsga2V5cyArIFwiKTtcIiwgXCJnXCIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cikge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZSk7XG4gICAgfTtcbn1cblxudmFyIGRlY29kZUhUTUwgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlZ2FjeSA9IE9iamVjdC5rZXlzKGxlZ2FjeU1hcCkuc29ydChzb3J0ZXIpO1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhlbnRpdHlNYXApLnNvcnQoc29ydGVyKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxlZ2FjeVtqXSA9PT0ga2V5c1tpXSkge1xuICAgICAgICAgICAga2V5c1tpXSArPSBcIjs/XCI7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXlzW2ldICs9IFwiO1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cChcIiYoPzpcIiArIGtleXMuam9pbihcInxcIikgKyBcInwjW3hYXVtcXFxcZGEtZkEtRl0rOz98I1xcXFxkKzs/KVwiLCBcImdcIiksXG4gICAgICAgIHJlcGxhY2UgPSBnZXRSZXBsYWNlcihlbnRpdHlNYXApO1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIoc3RyKSB7XG4gICAgICAgIGlmIChzdHIuc3Vic3RyKC0xKSAhPT0gXCI7XCIpIHN0ciArPSBcIjtcIjtcbiAgICAgICAgcmV0dXJuIHJlcGxhY2Uoc3RyKTtcbiAgICB9XG5cbiAgICAvL1RPRE8gY29uc2lkZXIgY3JlYXRpbmcgYSBtZXJnZWQgbWFwXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cikge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZXIpO1xuICAgIH07XG59KSgpO1xuXG5mdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgIHJldHVybiBhIDwgYiA/IDEgOiAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVwbGFjZXIobWFwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2Uoc3RyKSB7XG4gICAgICAgIGlmIChzdHIuY2hhckF0KDEpID09PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHN0ci5jaGFyQXQoMikgPT09IFwiWFwiIHx8IHN0ci5jaGFyQXQoMikgPT09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZUNvZGVQb2ludChwYXJzZUludChzdHIuc3Vic3RyKDMpLCAxNikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZUNvZGVQb2ludChwYXJzZUludChzdHIuc3Vic3RyKDIpLCAxMCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBbc3RyLnNsaWNlKDEsIC0xKV07XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgWE1MOiBkZWNvZGVYTUxTdHJpY3QsXG4gICAgSFRNTDogZGVjb2RlSFRNTCxcbiAgICBIVE1MU3RyaWN0OiBkZWNvZGVIVE1MU3RyaWN0XG59O1xuIiwidmFyIGRlY29kZU1hcCA9IHJlcXVpcmUoXCIuLi9tYXBzL2RlY29kZS5qc29uXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZUNvZGVQb2ludDtcblxuLy8gbW9kaWZpZWQgdmVyc2lvbiBvZiBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9oZS9ibG9iL21hc3Rlci9zcmMvaGUuanMjTDk0LUwxMTlcbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludChjb2RlUG9pbnQpIHtcbiAgICBpZiAoKGNvZGVQb2ludCA+PSAweGQ4MDAgJiYgY29kZVBvaW50IDw9IDB4ZGZmZikgfHwgY29kZVBvaW50ID4gMHgxMGZmZmYpIHtcbiAgICAgICAgcmV0dXJuIFwiXFx1RkZGRFwiO1xuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgaW4gZGVjb2RlTWFwKSB7XG4gICAgICAgIGNvZGVQb2ludCA9IGRlY29kZU1hcFtjb2RlUG9pbnRdO1xuICAgIH1cblxuICAgIHZhciBvdXRwdXQgPSBcIlwiO1xuXG4gICAgaWYgKGNvZGVQb2ludCA+IDB4ZmZmZikge1xuICAgICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMDtcbiAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4+IDEwKSAmIDB4M2ZmKSB8IDB4ZDgwMCk7XG4gICAgICAgIGNvZGVQb2ludCA9IDB4ZGMwMCB8IChjb2RlUG9pbnQgJiAweDNmZik7XG4gICAgfVxuXG4gICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuIiwidmFyIGludmVyc2VYTUwgPSBnZXRJbnZlcnNlT2JqKHJlcXVpcmUoXCIuLi9tYXBzL3htbC5qc29uXCIpKSxcbiAgICB4bWxSZXBsYWNlciA9IGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlWE1MKTtcblxuZXhwb3J0cy5YTUwgPSBnZXRJbnZlcnNlKGludmVyc2VYTUwsIHhtbFJlcGxhY2VyKTtcblxudmFyIGludmVyc2VIVE1MID0gZ2V0SW52ZXJzZU9iaihyZXF1aXJlKFwiLi4vbWFwcy9lbnRpdGllcy5qc29uXCIpKSxcbiAgICBodG1sUmVwbGFjZXIgPSBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZUhUTUwpO1xuXG5leHBvcnRzLkhUTUwgPSBnZXRJbnZlcnNlKGludmVyc2VIVE1MLCBodG1sUmVwbGFjZXIpO1xuXG5mdW5jdGlvbiBnZXRJbnZlcnNlT2JqKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopXG4gICAgICAgIC5zb3J0KClcbiAgICAgICAgLnJlZHVjZShmdW5jdGlvbihpbnZlcnNlLCBuYW1lKSB7XG4gICAgICAgICAgICBpbnZlcnNlW29ialtuYW1lXV0gPSBcIiZcIiArIG5hbWUgKyBcIjtcIjtcbiAgICAgICAgICAgIHJldHVybiBpbnZlcnNlO1xuICAgICAgICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlKSB7XG4gICAgdmFyIHNpbmdsZSA9IFtdLFxuICAgICAgICBtdWx0aXBsZSA9IFtdO1xuXG4gICAgT2JqZWN0LmtleXMoaW52ZXJzZSkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICAgIGlmIChrLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgc2luZ2xlLnB1c2goXCJcXFxcXCIgKyBrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG11bHRpcGxlLnB1c2goayk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vVE9ETyBhZGQgcmFuZ2VzXG4gICAgbXVsdGlwbGUudW5zaGlmdChcIltcIiArIHNpbmdsZS5qb2luKFwiXCIpICsgXCJdXCIpO1xuXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAobXVsdGlwbGUuam9pbihcInxcIiksIFwiZ1wiKTtcbn1cblxudmFyIHJlX25vbkFTQ0lJID0gL1teXFwwLVxceDdGXS9nLFxuICAgIHJlX2FzdHJhbFN5bWJvbHMgPSAvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nO1xuXG5mdW5jdGlvbiBzaW5nbGVDaGFyUmVwbGFjZXIoYykge1xuICAgIHJldHVybiAoXG4gICAgICAgIFwiJiN4XCIgK1xuICAgICAgICBjXG4gICAgICAgICAgICAuY2hhckNvZGVBdCgwKVxuICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICBcIjtcIlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGFzdHJhbFJlcGxhY2VyKGMpIHtcbiAgICAvLyBodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuICAgIHZhciBoaWdoID0gYy5jaGFyQ29kZUF0KDApO1xuICAgIHZhciBsb3cgPSBjLmNoYXJDb2RlQXQoMSk7XG4gICAgdmFyIGNvZGVQb2ludCA9IChoaWdoIC0gMHhkODAwKSAqIDB4NDAwICsgbG93IC0gMHhkYzAwICsgMHgxMDAwMDtcbiAgICByZXR1cm4gXCImI3hcIiArIGNvZGVQb2ludC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiO1wiO1xufVxuXG5mdW5jdGlvbiBnZXRJbnZlcnNlKGludmVyc2UsIHJlKSB7XG4gICAgZnVuY3Rpb24gZnVuYyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlW25hbWVdO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgICAgICAucmVwbGFjZShyZSwgZnVuYylcbiAgICAgICAgICAgIC5yZXBsYWNlKHJlX2FzdHJhbFN5bWJvbHMsIGFzdHJhbFJlcGxhY2VyKVxuICAgICAgICAgICAgLnJlcGxhY2UocmVfbm9uQVNDSUksIHNpbmdsZUNoYXJSZXBsYWNlcik7XG4gICAgfTtcbn1cblxudmFyIHJlX3htbENoYXJzID0gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2VYTUwpO1xuXG5mdW5jdGlvbiBlc2NhcGVYTUwoZGF0YSkge1xuICAgIHJldHVybiBkYXRhXG4gICAgICAgIC5yZXBsYWNlKHJlX3htbENoYXJzLCBzaW5nbGVDaGFyUmVwbGFjZXIpXG4gICAgICAgIC5yZXBsYWNlKHJlX2FzdHJhbFN5bWJvbHMsIGFzdHJhbFJlcGxhY2VyKVxuICAgICAgICAucmVwbGFjZShyZV9ub25BU0NJSSwgc2luZ2xlQ2hhclJlcGxhY2VyKTtcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGVYTUw7XG4iLCJjb25zdCBuZXQgPSByZXF1aXJlKCduZXQnKTtcblxuY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDEwZTkgfCAwO1xuY29uc3QgcmFuZG9tSUQgPSBgd2VicGFjay1lcnJvci1tZXNzYWdlLSR7cmFuZG9tTnVtYmVyfWBcbmNvbnN0IGNsaWVudCA9IG5ldC5jb25uZWN0KHsgcG9ydDogTndKU1BsdWdpbl9QT1JUIH0sICgpID0+IGNvbnNvbGUubG9nKCdMaXZlIHJlbG9hZCBjb25uZWN0ZWQhJykpXG52YXIgQ29udmVydCA9IHJlcXVpcmUoJ2Fuc2ktdG8taHRtbCcpO1xudmFyIGNvbnZlcnQgPSBuZXcgQ29udmVydCgpO1xuXG5cbmNvbnN0IGNzcyA9IGBcbiMke3JhbmRvbUlEfXtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwcHg7XG4gICAgbGVmdDogMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG4gICAgY29sb3I6IHJnYigyMjIsIDg1LCA4NSk7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgZm9udC1zaXplOiAxLjNlbTtcbn1cbmBcbmNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpXG5cblxuY2xpZW50Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhLnRvU3RyaW5nKCkpXG4gICAgY29uc29sZS5sb2coXCJTZXJ2ZXI6XCIsIGRhdGEpO1xuICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ0RPTkUnKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cbiAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdFUlJPUicpIHtcbiAgICAgICAgZGF0YS5lcnJvcnMuZm9yRWFjaChlcnIgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBldmFsKGVyci50b0V2YWwpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJhbmRvbUlEKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBbXG4gICAgICAgICAgICAgICAgICAgIGBFUlJPUiBpbiAke2Vyci5maWxlfSAke2Vyci5sb2NhdGlvbiA/IGVyci5sb2NhdGlvbi5saW5lIDogJzEnfToke2Vyci5sb2NhdGlvbiA/IGVyci5sb2NhdGlvbi5jb2x1bW4gOiAnMSd9YCxcbiAgICAgICAgICAgICAgICAgICAgLi4uZXJyb3IubWVzc2FnZS5zcGxpdCgnXFxuJykuc2xpY2UoMCwgMilcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IGVycm9yLm1lc3NhZ2Uuc3BsaXQoJ1xcbicpLnNsaWNlKDIpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZWwgJiYgZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIGVsLmlkID0gcmFuZG9tSURcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaGVhZGVyRWwuaW5uZXJIVE1MID0gY29udmVydC50b0h0bWwoaGVhZGVyLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJFbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnXG4gICAgICAgICAgICAgICAgaGVhZGVyRWwuc3R5bGUubWFyZ2luTGVmdCA9ICcwLjVlbSdcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpXG4gICAgICAgICAgICAgICAgYm9keUVsLmlubmVySFRNTCA9IGNvbnZlcnQudG9IdG1sKGJvZHkuam9pbignXFxuJykpO1xuICAgICAgICAgICAgICAgIGJvZHlFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJzFlbSdcbiAgICAgICAgICAgICAgICBib2R5RWwuc3R5bGUuZm9udFNpemUgPSAnLjhlbSdcblxuICAgICAgICAgICAgICAgIGVsLmFwcGVuZChoZWFkZXJFbClcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmQoYm9keUVsKVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZWwpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG53LldpbmRvdy5nZXQoKS5mb2N1cygpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV0XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=