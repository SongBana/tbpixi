// require("./lib/pixi-plugins/pixi-spine/pixi-spine");

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['exports', './lib/scroller/animate', './lib/scroller/Scroller'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports, require('./lib/scroller/animate'), require('./lib/scroller/Scroller'));
    }
}(this, function (exports, animate, Scroller) {
    exports.animate = animate;
    exports.Scroller = Scroller;
}));
