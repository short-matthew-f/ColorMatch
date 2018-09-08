// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"constants.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BOARD_SIZE = exports.BOARD_SIZE = 11;

var CELL_TYPES = exports.CELL_TYPES = ['red', 'green', 'lightblue', 'yellow', 'white', 'lavender', 'orange', 'pink'];
},{}],"Cell.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(value) {
    _classCallCheck(this, Cell);

    this.value = value;
  }

  _createClass(Cell, [{
    key: 'getEl',
    value: function getEl() {
      var el = document.createElement('div');
      el.classList.add('cell');
      el.style.backgroundColor = this.value;
      return el;
    }
  }], [{
    key: 'random',
    value: function random() {
      return new Cell(_constants.CELL_TYPES[Math.floor(_constants.CELL_TYPES.length * Math.random())]);
    }
  }]);

  return Cell;
}();

exports.default = Cell;
},{"./constants":"constants.js"}],"Grid.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid() {
    _classCallCheck(this, Grid);

    this.rows = this._buildRows(_constants.BOARD_SIZE);
    this.el = this._buildEl();
  }

  _createClass(Grid, [{
    key: '_buildEl',
    value: function _buildEl() {
      var el = document.createElement('div');
    }
  }, {
    key: '_buildRows',
    value: function _buildRows(size) {
      var rows = [];

      for (var i = 0; i < size; i++) {
        var row = [];

        for (var j = 0; j < size; j++) {
          row.push(_Cell2.default.random());
        }

        rows.push(row);
      }

      return rows;
    }
  }, {
    key: '_getCell',
    value: function _getCell(pos) {
      return this.rows[pos.row][pos.col];
    }
  }, {
    key: '_setCell',
    value: function _setCell(pos, cell) {
      this.rows[pos.row][pos.col] = cell;
    }
  }, {
    key: 'swapCells',
    value: function swapCells(posOne, posTwo) {
      var cellOne = this._getCell(posOne);
      this._setCell(posOne, this._getCell(posTwo));
      this._setCell(posTwo, cellOne);
    }
  }, {
    key: 'getEl',
    value: function getEl() {
      var gridEl = document.createElement('div');
      gridEl.classList.add('grid');

      this.rows.forEach(function (row) {
        var rowEl = document.createElement('div');
        rowEl.classList.add('row');

        row.forEach(function (cell) {
          rowEl.appendChild(cell.getEl());
        });

        gridEl.appendChild(rowEl);
      });

      return gridEl;
    }
  }]);

  return Grid;
}();

exports.default = Grid;
},{"./constants":"constants.js","./Cell":"Cell.js"}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var once = exports.once = function once(func) {
  var hasHappened = false;

  return function () {
    if (hasHappened) {
      return;
    }

    hasHappened = true;
    return func.apply(undefined, arguments);
  };
};
},{}],"Game.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(gameEl) {
    _classCallCheck(this, Game);

    this.gameEl = gameEl;
    this.initialCell = null;
    this.grid = new _Grid2.default();

    this.isAnimating = false;

    this._render();
    this._setListeners();

    this.swapAfterTransitionend = this.swapAfterTransitionend.bind(this);
  }

  _createClass(Game, [{
    key: 'swapAfterTransitionend',
    value: function swapAfterTransitionend(initialPos, targetPos, evt) {
      console.log("TRANSITIONENDSWAP TRIGGERING");
    }
  }, {
    key: '_swapEls',
    value: function _swapEls(cellOne, cellTwo) {
      var cellOneRect = cellOne.getBoundingClientRect();
      var cellTwoRect = cellTwo.getBoundingClientRect();

      cellTwo.style.top = cellOneRect.top - cellTwoRect.top;
      cellTwo.style.left = cellOneRect.left - cellTwoRect.left;
      cellOne.style.top = cellTwoRect.top - cellOneRect.top;
      cellOne.style.left = cellTwoRect.left - cellOneRect.left;
    }
  }, {
    key: '_swapCells',
    value: function _swapCells(cellOne, cellTwo) {
      var _this = this;

      var posOne = this.getPosition(cellOne);
      var posTwo = this.getPosition(cellTwo);

      cellOne.addEventListener('transitionend', (0, _utils.once)(function () {
        _this.isAnimating = false;
        _this.grid.swapCells(posOne, posTwo);
        _this._render();
      }));
    }
  }, {
    key: '_setListeners',
    value: function _setListeners() {
      var _this2 = this;

      this.gameEl.addEventListener('mousedown', function (evt) {
        if (_this2.isAnimating || !evt.target.matches('.cell')) {
          return;
        }

        if (_this2.initialCell && _this2.initialCell == evt.target) {
          _this2.initialCell.classList.remove('selected');
          _this2.initialCell = null;
          return;
        }

        if (_this2.initialCell) {
          var initialCell = _this2.initialCell;
          var targetCell = evt.target;

          _this2.isAnimating = true;

          _this2.initialCell.classList.remove('selected');
          _this2.initialCell = null;

          _this2._swapEls(initialCell, targetCell);
          _this2._swapCells(initialCell, targetCell);
        } else {
          _this2.initialCell = evt.target;
          _this2.initialCell.classList.add('selected');
        }
      });
    }
  }, {
    key: 'getPosition',
    value: function getPosition(cell) {
      if (!cell.matches('.cell')) {
        return;
      }

      var col = [].concat(_toConsumableArray(cell.parentNode.children)).indexOf(cell);
      var row = [].concat(_toConsumableArray(this.gridEl.children)).indexOf(cell.parentNode);

      return { row: row, col: col };
    }
  }, {
    key: '_render',
    value: function _render() {
      while (this.gameEl.firstChild) {
        this.gameEl.firstChild.remove();
      }

      this.gridEl = this.grid.getEl();
      this.gameEl.appendChild(this.gridEl);
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./Grid":"Grid.js","./utils":"utils.js"}],"app.js":[function(require,module,exports) {
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _Game2.default(document.getElementById('game'));
},{"./Game":"Game.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53350' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.21bccfbf.map