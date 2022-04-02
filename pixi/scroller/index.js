(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['exports', './lib/animate', './lib/Scroller'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports, require('./lib/animate'), require('./lib/Scroller'));
    }
}(this, function (exports, animate, Scroller) {
    exports.animate = animate;
    exports.Scroller = Scroller;
}));
